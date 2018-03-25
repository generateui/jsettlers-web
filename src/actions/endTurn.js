var proto = require("../../src/generated/data_pb");
import { GameAction } from "./gameAction";

export class EndTurn extends GameAction {
    constructor(config) {
        super();

        config = config || {};
        this.player = config.player;
    }
    perform(game) {
        game.phase.endTurn(this);
        if (this.player.roadBuildingTokens > 0) {
            this.player.roadBuildingTokens = 0;
        }
    }
    static createData(player) {
        const action = new proto.GameAction();
        action.setPlayerId(player.id);
        const endTurn = new proto.EndTurn();
        action.setEndTurn(endTurn);
        return action;
    }
    static fromData() {
        return new EndTurn();
    }
}