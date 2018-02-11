import {Town} from "../town.js";
import {Action} from "./action.js";
import {Node} from "../node.js";

export class BuildTown extends Action {
    constructor() {
        super();
        this.node = null;
    }
    setReferences(game) {
        this.player = game.getPlayerById(this.playerId);
    }
    perform(game) {
        const town = new Town(this.player, this.node);
        game.board.towns.set(this.node, town);
    }
    static fromData(data) {
        const buildTown = new BuildTown();
        Action.setIds(buildTown, data.getActionids());
        buildTown.node = Node.fromData(data.getNode());
        return buildTown;
    }
}