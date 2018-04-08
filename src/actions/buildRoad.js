import { jsettlers as pb } from "../../src/generated/data";
import {GameAction} from "./gameAction.js";
import {Edge} from "../edge.js";
import {Road} from "../road.js";

export class BuildRoad extends GameAction {
    constructor(config) {
        super(config);
        
        config = config || {};
        this.edge = config.edge;
    }
    perform(game) {
        const road = new Road(this.player, this.edge);
        road.addToPlayer(this.player);
        road.addToBoard(game.board);
        game.calculateLongestRoad();
        game.phase.buildRoad(game, this);
    }
    static fromData(data, game) {
        const player = game.getPlayerById(data.playerId);
        const edge = Edge.fromData(data.buildRoad.edge)
        return new BuildRoad({
            edge: edge,
            player: player
        });
    }
    get data() {
        return pb.GameAction.create({
            playerId: this.player.id,
            buildRoad: {
                edge: this.edge.data
            }
        });
    }
    static parse(buildRoadExpression, resolver) {
        const expression = buildRoadExpression;
        const player = resolver.parsePlayer(expression.player());
        const edge = resolver.parseEdge(expression.edge());
        return new BuildRoad({ player: player, edge: edge });
    }
    static parse(buildRoadExpression, resolver) {
        const expression = buildRoadExpression;
        const player = resolver.parsePlayer(expression.player());
        const edge = resolver.parseEdge(expression.edge());
        return new BuildRoad({ player: player, edge: edge });
    }
}