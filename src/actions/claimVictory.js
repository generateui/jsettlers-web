var proto = require("../../src/generated/data_pb");
import { GameAction } from "./gameAction";
import { EndOfGame } from "../expectation";

export class ClaimVictory extends GameAction {
    constructor(config) {
        super();

        config = config || {};
        this.player = config.player;
    }
    perform(game) {
        game.goToNextPhase();
        // game.phase.claimVictory(game, this);
        game.winner = this.player;
        game.expectation = new EndOfGame(game);
    }
    static createData(player) {
        const action = new proto.GameAction();
        action.setPlayerId(player.id);
        const claimVictory = new proto.ClaimVictory();
        action.setClaimVictory(claimVictory);
        return action;
    }
    static fromData() {
        return new ClaimVictory();
    }
}