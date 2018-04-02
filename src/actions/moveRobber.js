import { jsettlers as pb } from "../../src/generated/data";
import { GameAction } from "./gameAction";
import { Coord } from "../coord";

export class MoveRobber extends GameAction {
    constructor(config) {
        super();

        config = config || {};
        this.playerId = config.playerId;
        this.player = config.player;
        this.coord = config.coord;
    }
    perform(game) {
        game.board.robber.coord = this.coord;
    }
    get data() {
        return pb.GameAction.create({
            playerId: this.player.id,
            moveRobber: {
                coord: this.coord.data
            }
        });
    }
    static fromData(data) {
        return new MoveRobber({
            playerId: data.playerId,
            coord: Coord.fromData(data.moveRobber.coord)
        });
    }
}