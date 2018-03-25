var proto = require("../../src/generated/data_pb");
import {City} from "../city.js";
import {Town} from "../town.js";
import {GameAction} from "./gameAction.js";
import {Node} from "../node.js";

export class BuildCity extends GameAction {
    constructor(config) {
        super();

        config = config || {};
        this.player = config.player;
        this.node = config.node;
    }
    perform(game) {
        const town = game.board.towns.get(this.node);
        town.removeFromPlayer(this.player);
        town.removeFromBoard(game.board);
        const city = new City(this.player, this.node);
        city.addToPlayer(this.player);
        city.addToBoard(game.board);
    }
    static fromData(data) {
        const node = Node.fromData(data.getNode());
        return new BuildCity({ node: node });
    }
    static createData(player, node) {
        const action = new proto.GameAction();
        action.setPlayerId(player.id);
        var buildCity = new proto.BuildCity();
        buildCity.setNode(node.data);
        action.setBuildCity(buildCity);
        return action;
    }
}