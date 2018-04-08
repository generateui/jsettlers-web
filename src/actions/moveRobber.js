import { jsettlers as pb } from "../../src/generated/data";
import { GameAction } from "./gameAction";
import { Coord } from "../coord";

export class MoveRobber extends GameAction {
    constructor(config) {
        super(config);

        config = config || {};
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
    static fromData(data, game) {
        const player = game.getPlayerById(data.playerId);
        return new MoveRobber({
            player: player,
            coord: Coord.fromData(data.moveRobber.coord)
        });
    }
}