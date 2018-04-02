import { Observable } from "./generic/observable.js";
import { ObservableMap } from "./generic/observableMap.js";
import { Robber } from "./robber.js";
import { Coord3D } from "./coord.js";
import { Bank} from "./bank.js";
import { ObservableArray } from "./generic/observableArray.js";
import { LongestRoad } from "./longestRoad.js";
import { InitialPlacement, PlayTurns, Finished, GamePhase } from "./gamePhase.js";
import { ExpectAnything } from "./expectation";
import { LargestArmy } from "./largestArmy.js";
import { Dice } from "./actions/rollDice.js";
import { Stock } from "./stock.js";

export class GameSettings {
    constructor(config) {
        this.boardDescriptor = config.boardDescriptor;
        this.players = config.players;
        this.bots = config.bots;
    }
}
export class Game extends Observable {
    constructor() {
        super();

        this.players = [];
        this.player = null; // the player at the front-end/client
        this.playerOnTurn = null; // the player whose turn it is
        // player who won the game. It's possible the winning player has equal
        // or even less victorypoints then the winner, so we need to explicitly
        // register the winner.
        this.winner = null;
        this.board = null;
        this.developmentCards = []; // TODO: observable array
        this.bank = new Bank();
        this.actions = new ObservableArray();
        this.longestRoad = new LongestRoad();
        this.largestArmy = new LargestArmy();
        this.expectation = new ExpectAnything();
        this.dice = new Dice(6, 6); // keep last rolled dice for convenience
        this.victoryPointsToWin = 10;

        this.initialPlacement = new InitialPlacement();
        this.playTurns = new PlayTurns();
        this.finished = new Finished();
        this.phases = [
            this.initialPlacement,
            this.playTurns,
            this.finished,
        ];
        this.phase = new GamePhase();

        this.makeObservable(["expectation"]);
    }
    start(gameOptions) {
        this.gameOptions = gameOptions;
        this.gameOptions.set(this);
        this.goToNextPhase();
    }
    goToNextPhase() {
        let index = this.phases.indexOf(this.phase);
        const newIndex = index += 1;
        const newPhase = this.phases[newIndex];
        this.phase.end(this);
        this.phase = newPhase;
        this.phase.start(this);
    }
    getPlayerById(id) {
        for (var player of this.players) {
            if (player.id === id) {
                return player;
            }
        }
        return null;
    }
    getOpponents(player) {
        const opponents = [];
        for (var opponent of this.players) {
            if (opponent.id !== player.id) {
                opponents.push(opponent);
            }
        }
        return opponents;
    }
    getActionById(id) {
        // if this gets slow, move to Map()
        return this.actions.array.find(a => a.id === id);
    }
    calculateLongestRoad() {
        let routeByPlayer = this.longestRoad.calculate(this); // returns <Player, Edges[]>

        // determine all the current winners
        let winningPlayers = new Set();
        let length = 5;
        const isTaken = this.longestRoad.player !== null;
        for (let [player, edges] of routeByPlayer.entries()) {
            player.routeLength = edges.length;
            if (edges.length > length) {
                winningPlayers = new Set();
                winningPlayers.add(player);
                length = edges.length;
                continue;
            }
            if (edges.length === length) {
                winningPlayers.add(player);
            }
        }
        // from the current winners, determine the actual winner
        let winningPlayer = null;
        if (winningPlayers.size === 1) {
            winningPlayer = winningPlayers.values().next().value;
        }
        if (winningPlayers.size > 2) {
            const currentWinner = this.longestRoad.player;
            const stillWins = currentWinner !== null && winningPlayers.has(currentWinner);
            if (stillWins) {
                // other players must have *more* roads to beat the current winner,
                // which is not the case here. So have the current winner keep LR.
                winningPlayer = this.longestRoad.player;
            } else if (winningPlayers.has(this.playerOnTurn)) {
                // The first player on turn can claim LR. If this happens to be the 
                // player currently on turn, award him LR.
                winningPlayer = this.playerOnTurn;
            } else {
                // this happens when:
                // 1. previous winner lost his route (e.g. newly built town breaks route)
                // 2. multiple opponents have equal road length
                // The player who's turn it is first wins it, as he is able to claim LR first.
                const index = this.players.indexOf(this.playerOnTurn);
                const playerCount = this.players.length;
                // This loops over the players in order of turns
                for (let i = 0; i < playerCount; i++) {
                    let j = index + i;
                    j = j >= playerCount ? j - playerCount : j;
                    const player = this.players[j];
                    if (winningPlayers.has(player)) {
                        winningPlayer = player;
                        break;
                    }
                }
            }

        }

        let winningEdges = winningPlayer === null ? null : routeByPlayer.get(winningPlayer);

        // a player can lose length but still win
        const lengthChanged = winningPlayer !== null && 
            this.longestRoad.player !== null &&
            winningPlayer === this.longestRoad.player &&
            winningEdges.length !== this.longestRoad.edges.length;

        // a player had it and no new winner is present: he lost it
        const lost = winningPlayers.size === 0 && this.longestRoad.player !== null;

        // a player took it from another or claimed it first time
        const newOwner = winningPlayer !== null &&
            winningPlayer !== this.longestRoad.player;

        if (lengthChanged) {
            this.longestRoad.edges = winningEdges;
        }
        if (lost) {
            this.longestRoad.player.victoryPoints.remove(this.longestRoad);
            this.longestRoad.player = null;
            this.longestRoad.edges = null;
        }
        if (newOwner) {
            if (this.longestRoad.player !== null) {
                this.longestRoad.player.victoryPoints.remove(this.longestRoad);
            }
            this.longestRoad.player = winningPlayer;
            this.longestRoad.edges = winningEdges;
            winningPlayer.victoryPoints.push(this.longestRoad);
        }
    }
}