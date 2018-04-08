import { jsettlers as pb } from "../src/generated/data";
import { Observable } from "./generic/observable.js";
import { Coord, Coord3D } from "./coord";

export class Robber extends Observable {
    constructor(coord) {
        super();
        this.coord = coord || Coord3D.center;

        this.makeObservable(["coord"]);
    }
    static fromData(data) {
        return new Robber(Coord.fromData(data.coord));
    }
    get data() {
        return new pb.Robber.create({
            coord: this.coord.data
        });
    }
}