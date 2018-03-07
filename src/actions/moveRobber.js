var proto = require("../../data_pb");
import { GameAction } from "./gameAction";
import { Coord } from "../coord";

export class MoveRobber extends GameAction {
    constructor() {
        super();

        this.coord = null;
    }
    perform(game) {
        game.board.robber.coord = this.coord;
    }
    static createData(player, coord) {
        const moveRobber = new proto.MoveRobber();
        moveRobber.setCoord(coord.data);
        const action = new proto.GameAction();
        action.setPlayerId(player.id);
        action.setMoveRobber(moveRobber);
        return action;
    }
    static fromData(data) {
        const moveRobber = new MoveRobber();
        moveRobber.coord = Coord.fromData(data.getCoord());
        return moveRobber;
    }
}