import { jsettlers as pb } from "../src/generated/data";
import { BuildTown } from "./actions/buildTown";
import { BuildRoad } from "./actions/buildRoad";
import { RollDice } from "./actions/rollDice";
import { PlayDevelopmentCard } from "./actions/playDevelopmentCard";
import { Town } from "./town";
import { PlaySoldierOrRollDice, PlayTurnActions, BuildTownThenBuildRoad, 
    LooseResourcesMoveRobberRobPlayer, 
    EndOfGame,
    ExpectTradeResponses,
    Expectation} from "./expectation";
import { Road } from "./road";
import { ResourceList } from "./resource";

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
    static fromData(data, game) {
        if (data.initialPlacement) {
            return InitialPlacement.fromData(data.initialPlacement, game);
        } else if (data.playTurns) {
            return PlayTurns.fromData(data.playTurns, game);
        } else if (data.finished) {
            return new Finished();
        }
    }
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
    playDevelopmentCard(game, playDevelopmentCard) {}
    playSoldier(game, soldier) {} 
    robPlayer(game, robPlayer) {}

    offerTrade(game, offerTrade) {}
    acceptOffer(game, acceptOffer) {}
    rejectOffer(game, rejectOffer) {}
    counterOffer(game, counterOffer) {}
    claimVictory(game, claimVictory) {}
    canPlaceTownOnBoard(game, player) {}
    /** since the possibilities to build roads & towns depends on the game phase, 
     * the game phase is responsible to returning a list of possibilties. It's
     * fine to delegate it to another object though. */
    townPossibilities(game, player) {
        return [];
    } // Set<Node>
    roadPossibilities(game, player) {
        return [];
    } // Set<Edge>
    canPayPiece(player, resourceList) {
        return false;
    }
}
export class InitialPlacement extends GamePhase {
    constructor() {
        super();

        this.name = "InitialPlacement";
        this.expectation = null;
    }
    static fromData(data, game) {
        var initialplacement = new InitialPlacement();
        initialplacement.expectation = Expectation.fromData(data.expectation, game);
        return initialplacement;
    }
    get data() {
        const data = pb.GamePhase.create({
            initialPlacement: { }
        });
        if (this.expectation !== null) {
            data.initialPlacement.expectation = this.expectation.data;
        }
        return data;
    }
    start(game) {
        this.expectation = new BuildTownThenBuildRoad(game);
        game.playerOnTurn = this.expectation.action.player;
        game.expectation = this.expectation;
    }
    buildTown(game, buildTown) {
        if (this.expectation.giveResources) {
            const town = buildTown.player.towns.get(buildTown.node);
            const coords = town.node.coords;
            const hexes = coords.map(coord => game.board.hexes.get(coord));
            // Warning: this goes wrong when cities are introduced in initialplacement as 
            // cities produce two resources
            const productions = hexes.map(hex => town.produce(hex));
            const production = new ResourceList(productions.mapMany());
            buildTown.player.resources.moveFrom(game.bank.resources, production);
        }
    }
    buildRoad(game, buildRoad) {
        if (this.expectation.action !== null) {
            game.playerOnTurn = this.expectation.action.player;
        }
        if (this.expectation !== null && this.expectation.met) {
            game.goToNextPhase();
        }
    }
    canPlaceTownOnBoard(game, player) {
        return true;
    }
    townPossibilities(game, player) { // Node[]
        const hexes = game.board.hexes.map;
        const nodePieces = game.board.nodePieces.map;
        const nodes = new Set(); // <Node>
        const notOkNodes = new Set(); // <Node>
        for (let coord of hexes.keys()) {
            nodesLoop: for (let node of coord.nodes) {
                // no need to check nodes twice
                if (nodes.has(node) || notOkNodes.has(node)) {
                    continue nodesLoop;
                }
                const hex1 = hexes.get(node.coord1);
                const hex2 = hexes.get(node.coord2);
                const hex3 = hexes.get(node.coord3);
                const canBuildLandPiece = (hex1 !== undefined && hex1.canBuildLandPieces) || 
                    (hex2 !== undefined && hex2.canBuildLandPieces) || 
                    (hex3 !== undefined && hex3.canBuildLandPieces);
                const notYetTaken = !nodePieces.has(node) &&
                    !nodePieces.has(node.nodes[0]) &&
                    !nodePieces.has(node.nodes[1]) &&
                    !nodePieces.has(node.nodes[2]);
                if (canBuildLandPiece && notYetTaken) {
                    nodes.add(node);
                } else {
                    notOkNodes.add(node);
                }
            }
        }
        return Array.from(nodes);
    }
    roadPossibilities(game, player) { // Edge[]
        const buildTown = this.expectation.lastBuildTown;
        if (buildTown === null) {
            return [];
        }
        const edges = [];
        for (let edge of buildTown.node.edges) {
            const hex1 = game.board.hexes.get(edge.coord1);
            const hex2 = game.board.hexes.get(edge.coord2);
            if ((hex1 !== undefined && hex1.canBuildLandPieces) ||
                (hex2 !== undefined && hex2.canBuildLandPieces)) {
                edges.push(edge);
            }
        }
        return edges;
    }
    canPayPiece(player, resourceList) {
        return true;
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
    static fromData(data, game) {
        const playTurns = new PlayTurns();
        playTurns.turns = data.turns.map(td => Turn.fromData(td, game));
        if (data.turn) {
            playTurns.turn = Turn.fromData(data.turn, game);
        }
        if (data.turnPhase) {
            playTurns.turnPhase = TurnPhase.fromData(data.turnPhase);
        }
        return playTurns;
    }
    get data() {
        const data = pb.GamePhase.create({
            playTurns: {
                turns: this.turns.map(t => t.data),
            }
        });
        if (this.turnPhase !== null) {
            data.turnPhase = this.turnPhase.data;
        }
        if (this.turn !== null) {
            data.turn = this.turn.data;
        }
        return data;
    }
    start(game) {
        const player = game.players[0];
        const turn = new Turn({ player: player, number: 1 });
        this.turns.push(turn);
        this.turn = turn;
        game.playerOnTurn = player;
        this.turnPhase = this.beforeRollDicePhase;
        game.expectation = new PlaySoldierOrRollDice(game);
    }
    buildTown(game, buildTown) {
        game.bank.resources.moveFrom(buildTown.player.resources, Town.cost);
    }
    buildRoad(game, buildTown) {
        if (buildTown.player.roadBuildingTokens > 0) {
            buildTown.player.roadBuildingTokens -= 1;
            if (game.expectation.met) {
                game.expectation = this.playTurnActions;
            }
        } else {
            game.bank.resources.moveFrom(buildTown.player.resources, Road.cost);
        }
    }
    playDevelopmentCard(game, playDevelopmentCard) {
        const dc = playDevelopmentCard.developmentCard;
        if (dc.maxOnePerTurn) {
            this.turn.hasPlayedDevelopmentCard = true;
        }
    }
    playSoldier(game, soldier) {
    }
    rollDice(game, rollDice) {
        if (rollDice.dice.total === 7) {
            game.expectation = new LooseResourcesMoveRobberRobPlayer(game);
            this.turnPhase = this.rollDicePhase;
        } else {
            this._moveToTradeAndBuildPhase(game);
        }
    }
    robPlayer(game, robPlayer) {
        // no dice rolled: -> RollDicePhase
        if (this.turnPhase === this.beforeRollDicePhase) {
            this.turnPhase = this.rollDicePhase;
            // MoveRobberThenRobPlayer expectation, so switch back to PSORD
            game.expectation = new PlaySoldierOrRollDice(game);
            return;
        }
        // dice rolled: -> TradeAndBuild
        if (this.turnPhase === this.rollDicePhase) {
            this._moveToTradeAndBuildPhase(game);
            return;
        }
        // soldier played in playturns phase, so only move back
        if (game.expectation.met) {
            game.expectation = this.playTurnActions;
        }
    }
    _moveToTradeAndBuildPhase(game) {
        this.turnPhase = this.tradeAndBuildPhase;
        this.playTurnActions = new PlayTurnActions(game);
        game.expectation = this.playTurnActions;
    }
    endTurn(game, endTurn) {
        let index = game.players.indexOf(game.playerOnTurn);
        index +=1;
        if (index === game.players.length) {
            index = 0;
        }
        const player = game.players[index];
        const turn = new Turn({
            player: player,
            number: game.playTurns.turn.number + 1
        });
        this.turn = turn;
        game.playerOnTurn = player;
        this.turns.push(turn);
        this.turnPhase = this.beforeRollDicePhase;
        game.expectation = new PlaySoldierOrRollDice(game);
    }
    offerTrade(game, offerTrade) {
        game.expectation = new ExpectTradeResponses(game, offerTrade);
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
    canPlaceTownOnBoard(game, player) {
        
    }
    townPossibilities(game, player) {
        return game.board.townPossibilities(player);
    }
    roadPossibilities(game, player) {
        return game.board.roadPossibilities(player);
    }
    canPayPiece(player, resourceList) {
        return player.resources.hasAtLeast(resourceList);
    }
}
export class Finished extends GamePhase {
    constructor() {
        super();

        this.name = "Finished";
    }
    get data() {
        return pb.GamePhase.create({
            finished: {}
        });
    }
}
export class TurnPhase {
    static fromData(data) {
        if (data.beforeRollDicePhase) {
            return new BeforeRollDicePhase();
        } else if (data.rollDicePhase) {
            return new RollDicePhase();
        } else  if(data.tradeAndBuildPhase) {
            return new TradeAndBuildPhase();
        }
        throw new Error("unsupported turnphase in TurnPhase");
    }
}
export class BeforeRollDicePhase extends TurnPhase {
    constructor() {
        super();
        this.name = "BeforeRollDicePhase";
    }
    get data() {
        return pb.TurnPhase.create({
            beforeRollDicePhase: {}
        });
    }
}
export class RollDicePhase extends TurnPhase {
    constructor() {
        super();
        this.name = "RollDicePhase";
    }
    get data() {
        return pb.TurnPhase.create({
            rollDicePhase: {}
        });
    }
}
export class TradeAndBuildPhase extends TurnPhase {
    constructor() {
        super();
        this.name = "TradeAndBuildPhase";
    }
    get data() {
        return pb.TurnPhase.create({
            tradeAndBuildPhase: {}
        });
    }
}

export class Turn {
    constructor(config) {
        config = config || {}
        this.player = config.player;
        this.number = config.number; // 1-based index
        this.hasPlayedDevelopmentCard = config.hasPlayedDevelopmentCard || false;
    }
    static fromData(data, game) {
        const player = game.getPlayerById(data.playerId);
        return new Turn({
            player: player,
            number: data.number,
            hasPlayedDevelopmentCard: data.hasPlayedDevelopmentCard
        });
    }
    get data() {
        return pb.Turn.create({
            playerId: this.player.id,
            number: this.number,
            hasPlayedDevelopmentCard: this.hasPlayedDevelopmentCard
        });
    }
}
