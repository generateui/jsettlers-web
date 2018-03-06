import { BuildTown } from "./actions/buildTown";
import { BuildRoad } from "./actions/buildRoad";
import { RollDice } from "./actions/rollDice";
import { PlayDevelopmentCard } from "./actions/playDevelopmentCard";
import { Town } from "./town";
import { PlaySoldierOrRollDice, PlayTurnActions, BuildTownThenBuildRoad } from "./expectation";

/** State of the game where certain actions are expected and performed
 * 
 * Some actions have ambiguous logic considering the different gamephases.
 * An example is BuildTown, where the player gets the resources of the hexes
 * of the node the town is built on, when theplayers builds a town for the
 * second time in the game. To cater to this gamephase-specific behavior, 
 * these actions delegate their logic to the gamephase.
 *
 * GamePhase has start(game) and end(game) methods to set start state end 
 * cleanup the state if needed after completion. 
 */
export class GamePhase {
    // initialize this game phase and set it to the start state
    start(game) {}
    // cleanup any state and resources of this game phase
    end(game) {}
    /** Below methods should be implemented when GamePhase-specific logic must be
     * performed for the action */
    buildRoad(game, buildRoad) {}
    buildTown(game, buildTown) {}
    rollDice(game, rollDice) {}
    endTurn(game, endTurn) {}
    playSoldier(game, soldier) {} 
    robPlayer(game, robPlayer) {}

    offerTrade(game, offerTrade) {}
    acceptOffer(game, acceptOffer) {}
    rejectOffer(game, rejectOffer) {}
    counterOffer(game, counterOffer) {}
}
export class InitialPlacement extends GamePhase {
    constructor() {
        super();

        this.name = "InitialPlacement";
        this.queue = [];
        this.expectation = null;
    }
    start(game) {
        this.expectation = new BuildTownThenBuildRoad(game);
        game.expectation = this.expectation;
    }
    buildTown(game, buildTown) {
        if (this.expectation.giveResources) {
            const town = buildTown.player.nodePieces.get(buildTown.coord);
            const coords = town.node.coords;
            const hexes = coords.map(coord => game.board.hexes.get(coord));
            // Warning: this goes wrong when cities are introduced in initialplacement as 
            // cities produce two resources
            const productions = hexes.map(hex => town.produce(hex));
            const production = productions.mapMany();
            buildTown.player.resources.add(production);
        }
    }
    buildRoad(game, buildRoad) {
        if (this.expectation.met) {
            game.goToNextPhase();
        }
    }
}
/** Phase in the game where players play turns.
 * 
 * This phase has an internal phase called the TurnPhase. The turnphase has
 * 3 different states: BeforeRollDice, RollDice and TradeAndBuild. State changes
 * of the turnphase are done by the delegated action of RollDice, PlaySoldier and EndTurn.
 * 
 */
export class PlayTurns extends GamePhase {
    constructor() {
        super();

        this.turns = []; // all played turns
        this.turn = null; // current turn

        this.playTurnActions = null;
        this.beforeRollDicePhase = new BeforeRollDicePhase();
        this.rollDicePhase = new RollDicePhase();
        this.tradeAndBuildPhase = new TradeAndBuildPhase();
        this.turnPhase = null;
        this.turnPhases = [
            this.beforeRollDicePhase,
            this.rollDicePhase,
            this.tradeAndBuildPhase,
        ];
        this.name = "PlayTurns";
    }
    start(game) {
        const player = game.players[0];
        const turn = new Turn(player, 1);
        this.turns.push(turn);
        game.playerOnTurn = player;
        this.turnPhase = this.beforeRollDicePhase;
        game.expectation = new PlaySoldierOrRollDice(game);
    }
    buildTown(game, buildTown) {
        game.bank.resources.moveFrom(buildTown.player.resources, Town.cost);
    }
    buildRoad(game, buildTown) {
        if (this.player.roadBuildingTokens > 0) {
            this.player.roadBuildingTokens -= 1;
            if (game.expectation.met) {
                game.expectation = this.playTurnActions;
            }
        } else {
            game.bank.resources.moveFrom(buildTown.player.resources, Road.cost);
        }
    }
    playSoldier(game, soldier) {
        if (this.turnPhase === this.beforeRollDicePhase) {
            this.turnPhase = this.rollDicePhase;
        }
    }
    rollDice(game, rollDice) {
        if (rollDice.die1 + rollDice.die2 !== 7) {
            this._moveToPlayTurnsPhase(game);
        }
    }
    robPlayer(game, robPlayer) {
        if (this.turnPhase === this.rollDicePhase) {
            this._moveToPlayTurnsPhase(game);
            return;
        }
        // soldier played in playturns phase, so only move back
        if (game.expectation.met) {
            game.expectation = this.playTurnActions;
        }
    }
    _moveToPlayTurnsPhase(game) {
        this.turnPhase = this.tradeAndBuildPhase;
        this.playTurnActions = new PlayTurnActions(game.playerOnTurn, game.player);
        game.expectation = this.playTurnActions;
    }
    endTurn(game, endTurn) {
        let index = game.players.indexOf(game.playerOnTurn);
        index +=1;
        if (index === game.players.length) {
            index = 0;
        }
        const player = game.players[index];
        const turn = new Turn(player, game.turn.number + 1);
        game.turn = turn;
        game.playerOnTurn = player;
        this.turns.push(turn);
        this.turnPhase = this.beforeRollDicePhase;
        game.expectation = new PlaySoldierOrRollDice(game);
    }
    offerTrade(game, offerTrade) {
        game.expectation = new ExpectTradeResponses(game);
    }
    acceptOffer(game, acceptOffer) {
        this._tradeResponse(game, acceptOffer);
    }
    rejectOffer(game, rejectOffer) {
        this._tradeResponse(game, rejectOffer);
    }
    counterOffer(game, counterOffer) {
        this._tradeResponse(game, counterOffer);
    }
    _tradeResponse(game, tradeResponse) { // <AcceptOffer | RejectOffer | CounterOffer>
        if (game.expectation.met) {
            game.expectation = this.playTurnActions;
        }
    }
}
export class Finished extends GamePhase {
    constructor() {
        super();
    }
}
export class TurnPhase {

}
export class BeforeRollDicePhase extends TurnPhase {
    constructor() {
        super();
        this.name = "BeforeRollDicePhase";
    }
}
export class RollDicePhase extends TurnPhase {
    constructor() {
        super();
        this.name = "RollDicePhase";
    }
}
export class TradeAndBuildPhase extends TurnPhase {
    constructor() {
        super();
        this.name = "TradeAndBuildPhase";
    }
}

export class Turn {
    constructor(player, number) {
        this.player = player;
        this.nunmber = number; // 1-based index
    }
}
