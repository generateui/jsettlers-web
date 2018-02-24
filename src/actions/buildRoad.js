var proto = require("../../data_pb");
import {GameAction} from "./gameAction.js";
import {Edge} from "../edge.js";
import {Road} from "../road.js";

export class BuildRoad extends GameAction {
    constructor(edge) {
        super();
        this.edge = edge;
    }
    perform(game) {
        const road = new Road(this.player, this.edge);
        if (this.player.roadBuildingTokens > 0) {
            this.player.roadBuildingTokens -= 1;
        } else {
            // TODO: pay for with resources
        }
        road.addToPlayer(this.player);
        road.addToBoard(game.board);
    }
    static fromData(data) {
        const edge = Edge.fromData(data.getEdge())
        return new BuildRoad(edge);
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