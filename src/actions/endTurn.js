import { jsettlers as pb } from "../../src/generated/data";
import { GameAction } from "./gameAction";

export class EndTurn extends GameAction {
    constructor(config) {
        super();

        config = config || {};
        this.playerId = config.playerId;
        this.player = config.player;
    }
    perform(game) {
        game.phase.endTurn(game, this);
        if (this.player.roadBuildingTokens > 0) {
            this.player.roadBuildingTokens = 0;
        }
    }
    get data() {
        return pb.GameAction.create({
            playerId: this.player.id,
            endTurn: { }
        });
    }
    static fromData(data) {
        return new EndTurn({
            playerId: data.playerId
        });
    }
}