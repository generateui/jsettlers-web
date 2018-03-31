var proto = require("../../src/generated/data_pb");
import {GameAction} from "./gameAction.js";
import {ResourceList, Resource} from "../resource.js";
import { MoveRobber } from "./moveRobber";
import { RobPlayer } from "./robPlayer";
import { LooseResources } from "./looseResources";
import { LooseResourcesMoveRobberRobPlayer } from "../expectation";

export class Production {
    constructor(playerId, resources) {
        this.playerId = null;
        this.player = null;
        this.productionByPlayer = null; // Map<Player, ResourceList>
    }
}
export class Dice {
    constructor(die1, die2) {
        this.die1 = die1;
        this.die2 = die2;
    }
    get total() {
        return this.die1 + this.die2;
    }
    static fromData(data) {
        return new Dice(data.getDie1(), data.getDie2());
    }
    static createData(die1, die2) {
        const dice = new proto.RollDice.Dice();
        dice.setDie1(die1);
        dice.setDie2(die2);
        return dice;
    }
    get data() {
        const dice = new proto.RollDice.Dice();
        dice.setDie1(this.die1);
        dice.setDie2(this.die2);
        return dice;
    }
}
export class RollDice extends GameAction {
    constructor(config) {
        super();

        config = config || {};
        this.player = config.player;
        this.dice = null;
        this.productions = config.productions;
        this.productionByPlayer = config.productionByPlayer || new Map(); // <Player, ResourceList>
    }
    static createData(player) {
        const action = new proto.GameAction();
        action.setPlayerId(player.id);
        const rollDice =  new proto.RollDice();
        action.setRollDice(rollDice);
        return action;
    }
    static createDataDebug(player, number) {
        const action = new proto.GameAction();
        action.setPlayerId(player.id);
        const rollDice = new proto.RollDice();
        let die1 = null;
        let die2 = null;
        if (number < 8) {
            die1 = 1;
            die2 = number - 1;
        } else {
            die1 = 6;
            die2 = number - 6;
        }
        rollDice.setDice(Dice.createData(die1, die2));
        action.setRollDice(rollDice);
        return action;
    }
    static fromData(data) {
        const rollDice = new RollDice();
        if (data.hasDice()) {
            rollDice.dice = Dice.fromData(data.getDice());
        }
        const productions = [];
        for (var production of data.getProductionsList()) {
            const playerId = production.getPlayerId();
            const resources = production.getProduceList();
            productions.push(new Production(playerId, resources));
        }
        rollDice.productions = productions;
        return rollDice;
    }
    setReferences(game) {
        for (var production of this.productions) {
            const player = game.getPlayerById(production.playerId);
            const resources = new ResourceList(production.resources);
            this.productionByPlayer.set(player, resources);
        }
    }
    perform(game) {
        for (var [player, production] of this.productionByPlayer.entries()) {
            player.resources.moveFrom(game.bank.resources, production);
        }
        game.dice = this.dice;
        game.phase.rollDice(game, this);
    }
    performServer(host) {
        const game = host.game;
        if (this.dice === null) {
            const die1 = host.random.intFromOne(6);
            const die2 = host.random.intFromOne(6);
            this.dice = new Dice(die1, die2);
        }
        if (this.dice.total !== 7) {
            // distribute resources. Fair distribution is complicated, as shortages
            // of bank resources should be divided evenly.
            // For instance, consider:
            // - a timber hex with 2 cities of player A and 1 city of player B.
            // - the 3 cities produce 6 resources
            // - the bank has 3 timber
            // This means 3 shortage must be divided evenly. This algorithm:
            // - loops per ResourceType
            // - then per player in order of turns, starting with the player who's turn it is
            // - distributes 1 resource per loop
            // Per example, if player A is on turn, the loop goes as follows:
            // iteration 1: A -> timber, B -> timber
            // iteration 2: A -> timber, B -> nothing
            // loop ends, no more resources. Result: A -> 2x timber, B: 1x timber
            // Per example, if player *B* is on turn, the loop goes as follows:
            // iteration 1: B -> timber, A -> timber
            // iteration 2: B -> timber, A -> nothing
            // loop ends, no more resources. Result: B -> 2x timber, A: 1x timber

            // create a copy, so when we subtract we dont immediately do it from bank
            const bankResources = new ResourceList(game.bank.resources);
            const affectedHexes = Array.from(game.board.hexes.values())
                .filter(h => h.chit.number !== null &&
                    h.chit.number === this.dice.total &&
                    h.coord !== game.board.robber.coord);

            // first, get total theoretical production and get total theoretical production by player
            const resourceCountByResourceType = new Map(); // <ResourceType, []>
            const resourceCountByPlayer = new Map(); // <PlayerId, Map<ResourceType, []>> 
            const resourceTypes = new Set(); // unique producing resourcetypes
            const players = new Set();
            for (let hex of affectedHexes) {
                for (let node of hex.coord.nodes) {
                    if (game.board.producersByNode.has(node)) {
                        const producer = game.board.producersByNode.get(node);
                        const resourceType = hex.resourceType;
                        resourceTypes.add(resourceType);
                        const player = producer.player;
                        if (!resourceCountByResourceType.has(resourceType)) {
                            resourceCountByResourceType.set(resourceType, []);
                        }
                        const production = producer.produce(hex);
                        resourceCountByResourceType.get(resourceType).pushAll(production);
                        if (!resourceCountByPlayer.has(player)) {
                            resourceCountByPlayer.set(player, new Map());
                        }
                        if (!resourceCountByPlayer.get(player).has(resourceType)) {
                            resourceCountByPlayer.get(player).set(resourceType, []);
                        }
                        let productionCount = resourceCountByPlayer.get(player).get(resourceType);
                        resourceCountByPlayer.get(player).get(resourceType).pushAll(production);
                        players.add(player);
                    }
                }
            }

            const playerIndex = game.players.indexOf(this.player); // index of player who's turn it is
            const playerCount = game.players.length;
            for (var player of players) {
                this.productionByPlayer.set(player, new ResourceList());
            }

            for (var resourceType of resourceTypes) {
                const resources = new ResourceList(resourceCountByResourceType.get(resourceType));
                if (game.bank.resources.hasAtLeast(resources)) {
                    // distribute all
                    playersLoop: for (let player of players) {
                        // player has no production of resourceType
                        if (!resourceCountByPlayer.has(player)) {
                            continue playersLoop;
                        }
                        // player has no production of resourceType
                        if (!resourceCountByPlayer.get(player).has(resourceType)) {
                            continue playersLoop;
                        }
                        const production = resourceCountByPlayer.get(player).get(resourceType);
                        this.productionByPlayer.get(player).add(production);
                        // no need to do bank administration here
                    }
                } else {
                    while (bankResources.hasOf(resourceType)) {
                        playerIndexLoop: for (let i = playerIndex; i < playerCount; i++) {
                            // start at the player who rolls (he has the advantage, since it is his turn),
                            // then move to the next player on turn et cetera
                            const j = i > (playerCount - 1) ? i - playerCount - 1 : i;
                            const player = game.players[j];
                            // player has no production
                            if (!players.has(player)) {
                                continue playerIndexLoop;
                            }
                            // player has no production of resourceType
                            if (!resourceCountByPlayer.has(player)) {
                                continue playerIndexLoop;
                            }
                            // player has no production of resourceType
                            if (!resourceCountByPlayer.get(player).has(resourceType)) {
                                continue playerIndexLoop;
                            }
                             // player has no production left
                            if (!resourceCountByPlayer.get(player).get(resourceType).length === 0) {
                                continue playerIndexLoop;
                            }
                            resourceCountByPlayer.get(player).get(resourceType).pop();
                            this.productionByPlayer.get(player).add(resourceType);
                            bankResources.remove(resourceType);
                        }
                    }
                }
            }
        }
    }
}