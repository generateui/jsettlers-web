import {Observable} from "./generic/observable.js";
import {ObservableMap} from "./generic/observableMap.js";
import {Robber} from "./robber.js";
import {Coord3D} from "./coord.js";
import {Bank} from "./bank.js";
import { ObservableArray } from "./generic/observableArray.js";
import { LongestRoad } from "./longestRoad.js";

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

        this.robber = new Robber(Coord3D.center);
        this.players = [];
        this.player = null; // the player at the front-end
        this.playerOnTurn = null; // the player whose turn it is
        this.board = null;
        this.developmentCards = []; // TODO: observable array
        this.bank = new Bank();
        this.actions = new ObservableArray();
        this.longestRoad = new LongestRoad();
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
        let winningPlayers = new Set();
        let length = 5;
        const isTaken = this.longestRoad.player !== null;
        for (let [player, edges] of routeByPlayer.entries()) {
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
        let winningPlayer = null;
        if (winningPlayers.size === 1) {
            winningPlayer = winningPlayers.values().next().value;
        }
        if (winningPlayers.size > 2) {
            const currentWinner = this.longestRoad.player;
            const stillWins = currentWinner !== null && winningPlayers.has(currentWinner);
            if (stillWins) {
                winningPlayer = this.longestRoad.player;
            } else if (winningPlayers.has(this.playerOnTurn)) {
                winningPlayer = this.playerOnTurn;
            } else {
                // this happens when:
                // 1. previous winner lost his route (e.g. newly built town breaks route)
                // 2. multiple opponents have equal road length
                // The player who's turn it is first wins it, as he is able to claim LR first.
                const index = this.players.indexOf(this.playerOnTurn);
                const playerCount = this.players.length;
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

        // a player had it, lost it, and no new winner is present
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