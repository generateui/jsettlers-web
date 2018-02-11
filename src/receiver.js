import BuildTown from "./actions/buildTown.js";
import Node from "./node.js";

export class Receiver {
    constructor() {
        this.game = null;
    }
    receive(action) {
        action.setReferences(this.game);
        action.perform(this.game);
        this.game.actions.push(action);
    }
}