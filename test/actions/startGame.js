import * as assert from "assert";
import { jsettlers as pb } from "../../src/generated/data";
import { Player } from "../../src/player";
import { StartGame } from "../../src/actions/startGame";
import { Game } from "../../src/game";

describe("StartGame", () => {
    it("serializes", () => {
        const player = new Player({ id: 23 });
        const startGame = new StartGame({ player: player });
        const game = new Game();
        game.players.push(player);

        const buffer = pb.GameAction.encode(startGame.data).finish();
        const revived = pb.GameAction.decode(buffer);
        const copy = StartGame.fromData(revived, game);
            
        assert.ok(copy instanceof StartGame);
        assert.equal(23, copy.player.id);
    });
});