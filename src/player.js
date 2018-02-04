import {Observable} from "./generic/observable.js";

export class Player extends Observable {
    constructor(config) {
        super();

        config = config || {};

        this.color = config.color || 0x000000;
        this.user = config.user || new User();
        this.maxHandResources = 7;
        this.developmentCards = []; // TODO: ObseravbleArray

        this.makeObservable(["user"]);
    }
}
export class User {
    constructor(config) {
        config = config || {};

        this.name = config.name || "";
        this.color = config.color || null;
        this.id = config.id || 0;
    }
}