import { jsettlers as pb } from "../../src/generated/data";
import { GameAction } from "./gameAction";

export class EndTurn extends GameAction {
    constructor(config) {
        super(config);
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
    static fromData(data, game) {
        const player = game.getPlayerById(data.playerId);
        return new EndTurn({
            player: player
        });
    }
}