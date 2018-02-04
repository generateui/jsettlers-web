import {Observable} from "./generic/observable.js";

export class Robber extends Observable {
    constructor(coord) {
        super();
        this.coord = coord || Coord3D.center;

        this.makeObservable(["coord"]);
    }
}