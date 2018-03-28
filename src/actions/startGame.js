var proto = require("../../src/generated/data_pb");
import { GameOptions } from "../gameOption";
import { GameAction } from "./gameAction";

export class StartGame extends GameAction {
    constructor(config) {
        super();

        config = config || {};
        this.player = config.player;
    }
    perform(game) {
        game.start(new GameOptions());
    }
    static createData(player) {
        const action = new proto.GameAction();
        action.setPlayerId(player.id);
        const startGame = new proto.StartGame();
        action.setStartGame(startGame);
        return action;
    }
    static fromData() {
        return new StartGame();
    }
}