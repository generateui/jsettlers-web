import { BuildTown } from "./actions/buildTown";
import { BuildRoad } from "./actions/buildRoad";

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
    // perform gamephase-specific logic for the BuildRoad action
    buildRoad(game, buildRoad) {}
    // perform gamephase-specific logic for the BuildTown action
    buildTown(game, buildTown) {}
    // perform gamephase-specific logic for the RollDice action
    rollDice(game, rollDice) {}
    endTurn(game, endTurn)
}
export class InitialPlacement extends GamePhase {
    constructor() {
        super();

        this.name = "InitialPlacement";
        this.queue = [];
    }
    start(game) {
        const playerAmount = game.players.length;
        for (let i = 0; i < playerAmount; i++) {
            const player = game.players[i];
            const buildTown = new BuildTown();
            buildTown.player = player;
            const buildRoad = new BuildRoad();
            buildRoad.player = player;
            game.queue.consecutive([buildTown, buildRoad]);
        }
        for (let i = playerAmount; i > -1; i--) {
            const player = game.players[i];
            const buildTown = new BuildTown();
            buildTown.player = player;
            const buildRoad = new BuildRoad();
            buildRoad.player = player;
            game.queue.consecutive([buildTown, buildRoad]);
        }
    }
    buildTown(game, buildTown) {
        if (game.queue.totalActions >= game.players.length) {
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
        // this action is not yet dequeued, so compare to 1
        if (game.queue.totalActions === 1) {
            game.goToNextPhase();
        }
    }
    end(game) {
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

        this.beforeRollDicePhase = new BeforeDiceRollPhase();
        this.rollDicePhase = new DiceRollPhase();
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
    }
    playSoldier(game, soldier) {
        this.turnPhase = this.rollDicePhase;
    }
    rollDice(game, rollDice) {
        this.turnPhase = this.tradeAndBuildPhase;
    }
    endTurn(game, endTurn) {
        const player = endTurn.player;
        const index = game.players.indexOf(game.playerOnTurn);
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
    }
    end(game) {
        this.turn = null;
        this.turnPhase = null;
    }
}
export class Ended extends GamePhase {
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

/**
 * Playing
 * Waiting for player to connect
 * 
 */
class GameState {

}