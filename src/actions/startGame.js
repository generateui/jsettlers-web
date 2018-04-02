import { jsettlers as pb } from "../../src/generated/data";
import { GameOptions } from "../gameOption";
import { GameAction } from "./gameAction";

export class StartGame extends GameAction {
    constructor(config) {
        super();

        config = config || {};
        this.playerId = config.playerId;
        this.player = config.player;
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
    static fromData(data) {
        return new StartGame({
            playerId: data.playerId
        });
    }
}