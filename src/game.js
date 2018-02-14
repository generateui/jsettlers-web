import {Observable} from "./generic/observable.js";
import {ObservableMap} from "./generic/observableMap.js";
import {Robber} from "./robber.js";
import {Coord3D} from "./coord.js";
import {Bank} from "./bank.js";

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
        this.actions = [];
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
}