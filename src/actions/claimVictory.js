import { jsettlers as pb } from "../../src/generated/data";
import { GameAction } from "./gameAction";
import { EndOfGame } from "../expectation";

export class ClaimVictory extends GameAction {
    constructor(config) {
        super();

        config = config || {};
        this.playerId = config.playerId;
        this.player = config.player;
    }
    perform(game) {
        game.goToNextPhase();
        // game.phase.claimVictory(game, this);
        game.winner = this.player;
        game.expectation = new EndOfGame(game);
    }
    get data() {
        return pb.ClaimVictory.create({
            playerId: this.player.id,
            claimVictory: { }
        });
    }
    static fromData(data) {
        return new ClaimVictory({
            playerId: data.playerId
        });
    }
}