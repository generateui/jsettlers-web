import { jsettlers as pb } from "../../src/generated/data";
import { GameOptions } from "../gameOption";
import { GameAction } from "./gameAction";

export class StartGame extends GameAction {
    constructor(config) {
        super(config);
    }
    perform(game) {
        game.start(new GameOptions());
    }
    get data() {
        return pb.GameAction.create({
            playerId: this.player.id,
            startGame: { }
        });
    }
    static fromData(data, game) {
        const player = game.getPlayerById(data.playerId);
        return new StartGame({
            player: player
        });
    }
}