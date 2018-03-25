var proto = require("../../src/generated/data_pb");
import {GameAction} from "./gameAction.js";
import {Edge} from "../edge.js";
import {Road} from "../road.js";

export class BuildRoad extends GameAction {
    constructor(config) {
        super();
        
        config = config || {};
        this.edge = config.edge;
        this.player = config.player;
    }
    perform(game) {
        const road = new Road(this.player, this.edge);
        road.addToPlayer(this.player);
        road.addToBoard(game.board);
        game.calculateLongestRoad();
        game.phase.buildRoad(game, this);
    }
    static fromData(data) {
        const edge = Edge.fromData(data.getEdge())
        return new BuildRoad({edge: edge});
    }
    static createData(player, edge) {
        const action = new proto.GameAction();
        action.setPlayerId(player.id);
        const buildRoad = new proto.BuildRoad();
        buildRoad.setEdge(edge.data);
        action.setBuildRoad(buildRoad);
        return action;
    }
}