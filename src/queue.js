require("../src/generic/shims");

/** Keeps actions expected to be played by players.
 * 
 * The goals of this Queue are:
 *      1. Allow UI to communicate to the user what is expected of him
 *          Example: show message "you should roll the dice"
 *      2. Allow UI to disable certain UI elements when they are not relevant
 *          Example: disable BuildTown button when player must roll the dice
 *      3. Server-side validation of action requests performed by a user
 *          Example: miscreant tries to offer trades while dice not rolled
 *      4. Ensure state-changes are kept in a easy-to-understand way
 *      5. Transfer gamestate to users 
 *
 * Actions are kept in queuedActions: an array of items which can be either
 * a QueuedAction or an Unordered. 
 * 
 * For example:
 *             C             G                ?: optional
 * A? 🡒 B 🡒 [ D ] 🡒 F 🡒 [ H? ] 🡒 I         A: action
 *             E                             []: unordered
 * Above diagram shows that action A is optional, so it is valid to play either A or B. 
 * Action F can only be played when C, D and E are played. By the order of C, D and E
 * does not matter; it is OK to have them played i.e. E🡒D🡒C. Action I can be played if 
 * action G is played; action H is still optional. 
 * 
 *  *RobPlayer is always performed, but players can choose to rob nothing
 *  Current and future use cases:
 *  - Play soldier
 *      MoveRobber THEN RobPlayer
 *      consecutive([MoveRobber, RobPlayer])
 *  - Initial placement
 *      BuildTown THEN buildRoad THEN buildTown etc
 *      consecutive([BuildTown1, BuildRoad1, BuildTown2, ...])
 *  - PickGold
 *      PickGold (p1) AND pickGold (p2)
 *      unordered([PickGold, PickGold])
 *  - Roll 7
 *      (LooseCards (p1) AND LooseCards (p2)) THEN MoveRobber THEN RobPlayer
 *      unordered([LooseCards, LooseCards]).consecutive([MoveRobber, RobPlayer])
 *  - Play RoadBuilding (if mandatory NOW)
 *      BuildRoad THEN BuildRoad
 *      consecutive([BuildRoad, BuildRoad])
 *  - NextTurn
 *      PlaySoldier? AND RollDice
 *      consecutive(PlaySoldier, optional: true)
 *      consecutive(RollDice)
 *  - Volcano
 *      RollDice AND RollDice (for volcano)
 *      consecutive(RollDice)
 *  - OfferTrade
 *      TradeResponse (-> timeout? force by server)
 *      unordered([TradeResponse1, TradeResponse2, ...])
 */
export class Queue {
    constructor() {
        this.queuedActions = []; // <QueuedAction | Unordered>
    }
    get totalActions() {
        let count = 0;
        for (let queuedAction of this.queuedActions) {
            count += queuedAction.total;
        }
        return count;
    }
    get depth() {
        return this.queuedActions.length;
    }
    consecutive(actions, optional) {
        optional = optional || false;
        if (Array.isArray(actions)) {
            for (let action of actions) {
                const queued = new QueuedAction(action, optional);
                this.queuedActions.push(queued);
            }
        } else {
            const action = actions;
            const queued = new QueuedAction(action, optional);
            this.queuedActions.push(queued);
        }
    }
    unordered(actions, optional) {
        optional = optional || false;
        if (Array.isArray(actions)) {
            let queuedActions = actions.map(a => new QueuedAction(a, optional));
            let unordered = new Unordered(queuedActions);
            this.queuedActions.push(unordered);
        } else {
            const action = actions;
            const queued = new QueuedAction(action, optional);
            this.queuedActions.push(queued);
        }
    }
    canBePlayed(action) {
        if (this.queuedActions.length === 0) {
            return true;
        }
        for (let queuedAction of this.queuedActions) {
            if (queuedAction.canBePlayed(action)) {
                return true;
            }
        }
        return false;
    }
    dequeue(action) {
        if (this.queuedActions.length === 0) {
            throw new Error("action does not exist");
        }
        let toRemove = null;
        const optionals = [];
        for (let queuedAction of this.queuedActions) {
            if (queuedAction instanceof QueuedAction) {
                if (queuedAction.matches(action)) {
                    toRemove = queuedAction;
                    break;
                }
            }
            if (queuedAction instanceof Unordered) {
                if (queuedAction.matches(action)) {
                    queuedAction.dequeue(action);
                    if (queuedAction.queuedActions.length === 0) {
                        toRemove = queuedAction;
                    }
                    break;
                }
            }
            if (!queuedAction.optional) {
                throw new Error("Tried dequeuing an action, but no match found");
            }
            optionals.push(queuedAction);
        }
        if (toRemove !== null) {
            this.queuedActions.remove(toRemove);
            for (let optional of optionals) {
                this.queuedActions.remove(optional);
            }
        // } else {
            // throw new Error("Tried dequeuing an action, but no match found")
        }
    }
    includes(action) {
        for (let queuedAction of this.queuedActions) {
            if (queuedAction instanceof QueuedAction) {
                if (queuedAction.action === action) {
                    return true;
                }
            }
            if (queuedAction instanceof Unordered) {
                for (let nested of queuedAction.queuedActions) {
                    if (nested.action === action) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
/** Wraps an action to store optionality */
export class QueuedAction {
    constructor(action, optional) {
        this.action = action;
        this.optional = optional;
    }
    get total() { return 1; }
    canBePlayed(action) {
        if (this.optional) {
            return true;
        }
        return this.action.constructor.name === action.constructor.name &&
            this.action.player === action.player;
    }
    matches(action) {
        return this.action.constructor.name === action.constructor.name &&
            this.action.player === action.player;
    }
}
export class Unordered {
    constructor(queuedActions) {
        this.queuedActions = queuedActions;
    }
    get total() {
        return this.queuedActions.length;
    }
    get optional() {
        return this.queuedActions.every(qa => qa.optional);
    }
    canBePlayed(action) {
        if (this.optional) {
            return true;
        }
        for (let queuedAction of this.queuedActions) {
            if (action.constructor.name === queuedAction.action.constructor.name && 
                action.player === queuedAction.action.player) {
                return true;
            }
        }
        return false;
    }
    matches(action) {
        for (let queuedAction of this.queuedActions) {
            if (action.constructor.name === queuedAction.action.constructor.name && 
                action.player === queuedAction.action.player) {
                return true;
            }
        }
        return false;
    }
    dequeue(action) {
        let toRemove = null;
        for (let queuedAction of this.queuedActions) {
            if (action.constructor.name === queuedAction.action.constructor.name && 
                action.player === queuedAction.action.player) {
                toRemove = queuedAction;
                break;
            }
        }
        if (toRemove !== null) {
            this.queuedActions.remove(toRemove);
        }
    }
}