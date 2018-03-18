import { Observable } from "./generic/observable";

export class LargestArmy extends Observable {
    constructor() {
        super();

        this.name = "LargestArmy";
        this.victoryPoints = 2;
        this.player = null;

        super.makeObservable(["player"]);
    }
}