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
        this.playerOnTurn = null;
        this.board = null;
        this.developmentCards = []; // TODO: observable array
        this.bank = new Bank();
    }
}