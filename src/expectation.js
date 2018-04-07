import { jsettlers as pb } from "../src/generated/data"
import { MoveRobber } from "./actions/moveRobber";
import { RobPlayer } from "./actions/robPlayer";
import { BuildRoad } from "./actions/buildRoad";
import { BuildTown } from "./actions/buildTown";
import { BuildCity } from "./actions/buildCity";
import { LooseResources } from "./actions/looseResources";
import { PlayDevelopmentCard } from "./actions/playDevelopmentCard";
import { BuyDevelopmentCard } from "./actions/buyDevelopmentCard";
import { RollDice } from "./actions/rollDice";
import { TradeBank } from "./actions/tradeBank";
import { OfferTrade } from "./actions/offerTrade";
import { TradePlayer } from "./actions/tradePlayer";
import { CounterOffer } from "./actions/counterOffer";
import { EndTurn } from "./actions/endTurn";
import { Soldier } from "./developmentCard";
import { Observable } from "./generic/observable";
import { ClaimVictory } from "./actions/claimVictory";
import { AcceptOffer } from "./actions/acceptOffer";

/** An action or set of actions expected to be played by a player */
export class Expectation {
    static fromData(data, game) {
        if (data.expectTradeResponses) {
            return ExpectTradeResponses.fromData(data.expectTradeResponses, game);
        } else if(data.playTurnActions) {
            return new PlayTurnActions(game);
        } else if(data.moveRobberThenRobPlayer) {
            return MoveRobberThenRobPlayer.fromData(data.moveRobberThenRobPlayer, game);
        } else if(data.playSoldierOrRollDice) {
            return PlaySoldierOrRollDice.fromData(data.playSoldierOrRollDice, game);
        } else if(data.looseResourcesMoveRobberRobPlayer) {
            return LooseResourcesMoveRobberRobPlayer.fromData(data.looseResourcesMoveRobberRobPlayer, game);
        } else if(data.buildTownThenBuildRoad) {
            return BuildTownThenBuildRoad.fromData(data.buildTownThenBuildRoad, game);
        } else if (data.buildTwoRoads) {
            return BuildTwoRoads.fromData(data.buildTwoRoads, game);
        } else if (data.endOfGame) {
            return new EndOfGame(game);
        }
    }
    /** returns true when the state of the expectation is complete */
    get met() {
        return true;
    }
    /** notifiy this expectation that an action is performed and 
     * thus can further its state */
    meet(action) { }
    /** returns true when given action is expected */
    matches(action) {
        return false;
    }
    /** Expected action to be performed by the client player. This is for the UI
     * or bots to sign they need to popup an action UI or perform an action */
    get youAction() {
        return null;
    }
    /** returns a message for the player using the client explaining what to do */
    get youMessage() {
        return "you should do things";
    }
    /** returns a message for the player using the client explaining opponent(s) what they should do */
    get opponentsMessage() {
        return "waiting for $opponent to do something";
    }
    static getNames(players) { // <Set>
        let names = Array.from(players).map(p => p.user.name);
        let namesArray = Array.from(names);
        return namesArray.join(", ");
    }
}
/** for debugging purposes */
export class ExpectAnything extends Expectation {
    constructor() {
        super();
    }
    /** returns true when the state of the expectation is complete */
    get met() {
        return false;
    }
    /** notifiy this expectation that an action is performed and 
     * thus can further its state */
    meet(action) { }
    /** returns true when given action is expected */
    matches(action) {
        return true;
    }
    /** returns a message for the player using the client explaining what to do;
     * returns null if the client player does not need anything to do */
    get youMessage() {
       return "do things";
    }
    /** returns a message for the player using the client explaining opponent(s) what they should do;
     * returns null if no opponents need to do anything */
    get opponentsMessage() {
        return "waiting for $opponent to do something";
    }
}
export class ExpectTradeResponses extends Expectation {
    constructor(game, offer) {
        super();
        
        this.responded = new Set(); // <Player>
        const opponents = game.getOpponents(game.playerOnTurn);
        this.expected = new Set(opponents); // <Player>
        this.playerOnTurn = game.playerOnTurn;
        this.player = game.player;
        this.offer = offer;
    }
    static fromData(data, game) {
        const expectTradeResponses = new ExpectTradeResponses(game);
        for (let playerId of data.respondedPlayerIds) {
            const player = game.getPlayerById(playerId);
            expectTradeResponses.responded.add(player);
        }
        return expectTradeResponses;
    }
    get data() {
        return pb.Expectation.create({
            expectTradeResponses: {
                respondedPlayerIds: Array.from(this.responded).map(p => p.id)
            }
        });
    }
    get met() {
        return this.responded.size === this.expected.size;
    }
    get youAction() {
        // caller of this should check for .isTradeResponse, so returning Rejectoffer 
        // or CounterOffer here works too
        return new AcceptOffer();
    }
    matches(action) {
        return action.isTradeResponse;
    }
    meet(action) {
        this.responded.add(action.player);
    }
    get youMessage() {
        // if the client player is the offerin the trade no response is expected
        const expected = this.expected.has(this.player);
        const notResponded = !this.responded.has(this.player);
        if (expected && notResponded) {
            return `answer ${this.playerOnTurn.user.name}'s trade offer`;
        }
        return null;
    }
    get opponentsMessage() {
        const notAllResponded = this.responded.size != this.expected.size;
        const opponentsMustRespond = !(this.expected.size === 1 && this.expected.has(this.player));
        if (notAllResponded && opponentsMustRespond) {
            let notRespondedPlayers = this.expected.difference(this.responded);
            notRespondedPlayers.delete(this.player);
            let names = Expectation.getNames(notRespondedPlayers);
            return `waiting for ${names} to respond to the trade offer`;
        }
        return null;
    }
}
export class PlayTurnActions extends Expectation {
    constructor(game) {
        super();

        this.playerOnTurn = game.playerOnTurn;
        this.player = game.player;
        this.expectedActionTypeNames = new Set([
            BuildRoad.prototype.constructor.name,
            BuildTown.prototype.constructor.name,
            BuildCity.prototype.constructor.name,
            PlayDevelopmentCard.prototype.constructor.name,
            BuyDevelopmentCard.prototype.constructor.name,
            OfferTrade.prototype.constructor.name,
            TradeBank.prototype.constructor.name,
            TradePlayer.prototype.constructor.name,
            EndTurn.prototype.constructor.name,
            ClaimVictory.prototype.constructor.name,
        ]);
    }
    get youAction() {
        return null;
    }
    matches(action) {
        const matchesType = this.expectedActionTypeNames.has(action.constructor.name);
        if (matchesType && action.player === this.playerOnTurn) {
            return true;
        }
        return false;
    }
    get youMessage() {
        if (this.playerOnTurn === this.player) {
            return "build, trade or end turn";
        }
        return null;
    }
    get opponentsMessage() {
        if (this.playerOnTurn !== this.player) {
            const opponent = this.playerOnTurn.user.name;
            return `waiting for ${opponent} to build, trade or end turn`;
        }
        return null;
    }
}
export class MoveRobberThenRobPlayer extends Expectation {
    constructor(game) {
        super();

        this.playerOnTurn = game.playerOnTurn;
        this.player = game.player;
        this.hasMovedRobber = false;
        this.hasRobbedPlayer = false;
    }
    static fromData(data, game) {
        const mrtrp = new MoveRobberThenRobPlayer(game);
        mrtrp.hasMovedRobber = data.hasMovedRobber;
        mrtrp.hasRobbedPlayer = data.hasRobbedPlayer;
        return mrtrp;
    }
    get data() {
        return pb.Expectation.create({
            moveRobberThenRobPlayer: {
                hasMovedRobber: this.hasMovedRobber,
                hasRobbedPlayer: this.hasRobbedPlayer
            }
        });
    }
    get dataUnWrapped() {
        return pb.MoveRobberThenRobPlayer.create({
            hasMovedRobber: this.hasMovedRobber,
            hasRobbedPlayer: this.hasRobbedPlayer
        });
    }
    get met() {
        return this.hasMovedRobber && this.hasRobbedPlayer;
    }
    get youAction() {
        if (this.playerOnTurn !== this.player) {
            return null;
        }
        if (!this.hasMovedRobber) {
            return new MoveRobber();
        }
        if (!this.hasRobbedPlayer) {
            return new RobPlayer();
        }
        return null;
    }
    matches(action) {
        if (action instanceof MoveRobber) {
            return !this.hasMovedRobber && action.player === this.playerOnTurn;
        }
        if (action instanceof RobPlayer) {
            return this.hasMovedRobber &&
                !this.hasRobbedPlayer &&
                action.player === this.playerOnTurn;
        }
        return false;
    }
    meet(action) {
        if (action instanceof RobPlayer) {
            this.hasRobbedPlayer = true;
        }
        if (action instanceof MoveRobber) {
            this.hasMovedRobber = true;
        }
    }
    get youMessage() {
        if (this.player !== this.playerOnTurn) {
            return null;
        }
        if (!this.hasMovedRobber) {
            return "move the robber"
        }
        return "steal a resource from an opponent"
    }
    get opponentsMessage() {
        if (this.player === this.playerOnTurn) {
            return null;
        }
        if (!this.hasMovedRobber) {
            return `waiting for ${this.playerOnTurn.user.name} to move the robber`;
        }
        return `waiting for ${this.playerOnTurn.user.name} to steal a resource`;
    }
}
export class PlaySoldierOrRollDice extends Expectation {
    constructor(game) {
        super();

        this.player = game.player;
        this.playerOnTurn = game.playerOnTurn;
        this.canPlaySoldier = this.playerOnTurn.developmentCards.find(dc => dc instanceof Soldier) !== undefined;
        this.maybeCanPlaySoldier = this.playerOnTurn.developmentCards.length > 0;
        this.hasPlayedSoldier = false;
        this.hasRolledDice = false;
    }
    static fromData(data, game) {
        const psord = new PlaySoldierOrRollDice(game);
        psord.hasPlayedSoldier = data.hasPlayedSoldier;
        return psord;
    }
    get data() {
        return pb.Expectation.create({
            playSoldierOrRollDice: {
                hasPlayedSoldier: this.hasPlayedSoldier
            }
        });
    }
    get met() {
        return this.hasRolledDice;
    }
    get youAction() {
        return null; // TODO: for bots? For UI not needed, user can click rolldice button
    }
    matches(action) {
        if (this.hasRolledDice) {
            return false;
        }
        const expectedPlayer = action.player === this.playerOnTurn;
        if (!expectedPlayer) {
            return false;
        }
        // TODO: this goes wrong on an opponent client instance, as he should not have
        // knowledge about the DevelopmentCard (should be DummyDevCard instance)
        const isSoldier = action instanceof PlayDevelopmentCard && 
            action.developmentCard instanceof Soldier;
        const isRollDice = action instanceof RollDice;
        if (isSoldier || isRollDice) {
            return true;
        }
        return false;
    }
    meet(action) {
        if (action instanceof RollDice && action.player === this.playerOnTurn) {
            this.hasRolledDice = true;
        } else if (action instanceof PlayDevelopmentCard && 
            action.player === this.playerOnTurn &&
            action.developmentCard instanceof Soldier) {
            this.hasPlayedSoldier = true;
        }
    }
    get youMessage() {
        if (this.player !== this.playerOnTurn) {
            return null;
        }
        if (this.canPlaySoldier && this.hasRobbedPlayer) {
            return "play a soldier or roll the dice"
        } else {
            return "roll the dice";
        }
    }
    get opponentsMessage() {
        if (this.player === this.playerOnTurn) {
            return null;
        }
        const opponent = this.player.user.name;
        if (this.maybeCanPlaySoldier) {
            return `waiting for ${opponent} to maybe play a soldier or roll the dice`;
        }
        return `waiting for ${opponent} to roll the dice`;
    }
}
export class LooseResourcesMoveRobberRobPlayer extends Expectation {
    constructor(game) {
        super();

        this.playerOnTurn = game.playerOnTurn;
        this.player = game.player;
        this.unlucky = new Set(game.players.filter(p => p.resources.length > 7)); // <Player>
        this.lostResources = new Set(); // <Player>
        this.moveRobberThenRobPlayer = new MoveRobberThenRobPlayer(game);
    }
    static fromData(data, game) {
        const lrmrrp = new LooseResourcesMoveRobberRobPlayer(game);
        for (let playerId of data.lostResourcesPlayerIds) {
            const player = game.getPlayerById(playerId);
            lrmrrp.lostResources.add(player);
        }
        lrmrrp.moveRobberThenRobPlayer = MoveRobberThenRobPlayer
            .fromData(data.moveRobberThenRobPlayer, game);
        return lrmrrp;
    }
    get data() {
        return pb.Expectation.create({
            looseResourcesMoveRobberRobPlayer: {
                lostResourcesPlayerIds: Array.from(this.lostResources).map(p => p.id),
                moveRobberThenRobPlayer: this.moveRobberThenRobPlayer.dataUnWrapped
            }
        });
    }
    get _allPlayersLostResources() {
        return this.lostResources.size === this.unlucky.size;
    }
    get met() {
        return this._allPlayersLostResources && this.moveRobberThenRobPlayer.met;
    }
    get youAction() {
        if (!this._allPlayersLostResources) {
            const isUnlucky = this.unlucky.has(this.player);
            const notLostCards = !this.lostResources.has(this.player);
            if (isUnlucky && notLostCards) {
                return new LooseResources();
            }
            return null;
        }
        return this.moveRobberThenRobPlayer.youAction;
    }
    matches(action) {
        if (this._allPlayersLostResources) {
            return this.moveRobberThenRobPlayer.matches(action);
        }
        if (action instanceof LooseResources) {
            const toBePlayedYet = this.unlucky.has(action.player);
            const notYetPlayed = !this.lostResources.has(action.player);
            if (toBePlayedYet && notYetPlayed) {
                return true;
            }
        }
        return false;
    }
    meet(action) {
        if (action instanceof RobPlayer || action instanceof MoveRobber) {
            this.moveRobberThenRobPlayer.meet(action);
            return;
        }
        this.lostResources.add(action.player);
    }
    get youMessage() {
        if (!this._allPlayersLostResources) {
            const isUnlucky = this.unlucky.has(this.player);
            const notLostCards = !this.lostResources.has(this.player);
            if (isUnlucky && notLostCards) {
                const amount = this.player.resources.halfCount;
                return `discard ${amount} resources`;
            }
            return null;
        }
        return this.moveRobberThenRobPlayer.youMessage;
    }
    get opponentsMessage() {
        const opponentsMustLooseResources = !(this.lostResources === 1 && this.lostResources.has(this.player));
        if (!this._allPlayersLostResources && opponentsMustLooseResources) {
            let notRespondedPlayers = this.unlucky.difference(this.lostResources);
            notRespondedPlayers.delete(this.player);
            let names = Expectation.getNames(notRespondedPlayers);
            return `waiting for ${names} to discard resources`;
        }
        return this.moveRobberThenRobPlayer.opponentsMessage;
    }
}
export class BuildTownThenBuildRoad extends Expectation {
    constructor(game) {
        super();
        
        this.actions = [];
        const playerAmount = game.players.length;
        for (let i = 0; i < playerAmount; i++) {
            const player = game.players[i];
            const buildTown = new BuildTown();
            buildTown.player = player;
            const buildRoad = new BuildRoad();
            buildRoad.player = player;
            this.actions.push(buildTown);
            this.actions.push(buildRoad);
        }
        for (let i = playerAmount - 1; i > -1; i--) {
            const player = game.players[i];
            const buildTown = new BuildTown();
            buildTown.player = player;
            const buildRoad = new BuildRoad();
            buildRoad.player = player;
            this.actions.push(buildTown);
            this.actions.push(buildRoad);
        }
        this.index = 0;
        this.maxIndex = (game.players.length * 4) - 1;
        this.action = this.actions[this.index]; // current expected action
        this.lastBuildTown = null;
    }
    static fromData(data, game) {
        const bttbr = new BuildTownThenBuildRoad(game);
        bttbr.index = data.actionIndex;
        bttbr.action = bttbr.actions[bttbr.index];
        for (let i = game.actions.length - 1; i > -1; i--) {
            const gameAction = game.actions[i];
            if (gameAction instanceof BuildTown) {
                bttbr.lastBuildTown = gameAction;
                break;
            }
        }
        return bttbr;
    }
    get data() {
        return pb.Expectation.create({
            buildTownThenBuildRoad: {
                actionIndex: this.index
            }
        });
    }
    get met() {
        return this.action === null;
    }
    get youAction() {
        if (this.action !== null && this.action.player === this.player) {
            return this.action;
        }
        return null;
    }
    /** True when building a town should give resources */
    get giveResources() {
        // example: 4 players (15 + 1 = 16) / 2 = 8
        // meet is called first, so index is then 8
        return this.index >= (this.maxIndex + 1) / 2;
    }
    get playerOnTurn() {
        return this.action.player;
    }
    matches(action) {
        if (this.action === null) {
            return false;
        }
        return action.constructor.name === this.action.constructor.name && 
            action.player === this.action.player;
    }
    meet(action) {
        this.index += 1;
        if (this.index > this.maxIndex) {
            this.action = null;
        } else {
            this.action = this.actions[this.index];
        }
        if (action instanceof BuildTown) {
            this.lastBuildTown = action;
        }
    }
    get youMessage() {
        if (this.action === null) {
            return null;
        }
        if (this.action.player !== this.player) {
            return null;
        }
        if (this.action instanceof BuildRoad) {
            return "build a road";
        }
        return "build a town";
    }
    get opponentsMessage() {
        if (this.action === null) {
            return null;
        }
        if (this.action.player === this.player) {
            return null;
        }
        if (this.action instanceof BuildRoad) {
            return `waiting for ${this.playerOnTurn.user.name} to build a road`;
        }
        return `waiting for ${this.playerOnTurn.user.name} to build a town`;
    }
}
export class BuildTwoRoads extends Expectation {
    constructor(game) {
        super(game);

        this.playerOnTurn = game.playerOnTurn;
        this.player = game.player;
        this.roadsBuilt = 0;
    }
    static fromData(data, game) {
        const btr = new BuildTwoRoads(game);
        btr.roadsBuilt = data.roadsBuilt;
        return btr;
    }
    get data() {
        return pb.Expectation.create({
            buildTwoRoads: {
                roadsBuilt: this.roadsBuilt
            }
        });
    }
    get met() {
        return this.roadsBuilt === 2 || this.playerOnTurn.stock.roads === 0;
    }
    get youAction() {
        if (this.met) {
            return null;
        }
        return new BuildRoad();
    }
    matches(action) {
        return action instanceof BuildRoad && this.roadsBuilt < 2;
    }
    meet(action) {
        if (action instanceof BuildRoad) {
            const oldYouAction = this.youAction;
            this.roadsBuilt += 1;
        }
    }
    get youMessage() {
        if (this.playerOnTurn !== this.player) {
            return null;
        }
        if (this.roadsBuilt === 0) {
            return "build two roads";
        }
        return "build a road";
    }
    get opponentsMessage() {
        if (this.playerOnTurn === this.player) {
            return null;
        }
        if (this.roadsBuilt === 0) {
            return `waiting for ${this.playerOnTurn.user.name} to build two roads`;
        }
        return `waiting for ${this.playerOnTurn.user.name} to build a road`;
    }
}
export class EndOfGame extends Expectation {
    constructor(game) {
        super();

        this.game = game;
    }
    /** returns true when the state of the expectation is complete */
    get met() {
        return false;
    }
    /** notifiy this expectation that an action is performed and 
     * thus can further its state */
    meet(action) { }
    /** returns true when given action is expected */
    matches(action) {
        return false;
    }
    /** returns a message for the player using the client explaining what to do;
     * returns null if the client player does not need anything to do */
    get youMessage() {
        if (game.player === game.winner) {
            return "🏆 Congratulations! You won the game 😃🙌";
        }
        return null;
    }
    /** returns a message for the player using the client explaining opponent(s) what they should do;
     * returns null if no opponents need to do anything */
    get opponentsMessage() {
        if (game.player === game.winner) {
            return null;
        }
        return `${game.winner.user.name} won the game`;
    }
}