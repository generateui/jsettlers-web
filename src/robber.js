class Robber extends Observable {
    constructor(coord) {
        super();
        this.coord = coord;

        this.makeObservable(["coord"]);
    }
}