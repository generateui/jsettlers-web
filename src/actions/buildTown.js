var proto = require("../../data_pb");
import {Town} from "../town.js";
import {GameAction} from "./gameAction.js";
import {Node} from "../node.js";

export class BuildTown extends GameAction {
    constructor(node) {
        super();
        this.node = node;
    }
    perform(game) {
        const town = new Town(this.player, this.node);
        game.board.towns.set(this.node, town);
    }
    static fromData(data) {
        const node = Node.fromData(data.getNode());
        return new BuildTown(node);
    }
    static createData(player, node) {
        const action = new proto.GameAction();
        action.setPlayerId(player.id);
        var bt = new proto.BuildTown();
        bt.setNode(node.data);
        action.setBuildTown(bt);
        return action;
    }
}