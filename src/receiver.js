import BuildTown from "./actions/buildTown.js";
import Node from "./node.js";

export class Receiver {
    constructor() {
        this.game = null;
    }
    receive(action) {
        action.perform(this.game);
    }
}