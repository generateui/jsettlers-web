import * as assert from "assert";
import { jsettlers as pb } from "../../src/generated/data";
import { Player } from "../../src/player";
import { ClaimVictory } from "../../src/actions/claimVictory";
import { Game } from "../../src/game";

describe("ClaimVictory", () => {
    it("serializes", () => {
        const player = new Player({ id: 77 });
        const game = new Game();
        game.players.push(player);
        const claimVictory = new ClaimVictory({ player: player });

        const buffer = pb.GameAction.encode(claimVictory.data).finish();
        const revived = pb.GameAction.decode(buffer);
        const copy = ClaimVictory.fromData(revived, game);

        assert.ok(copy instanceof ClaimVictory);
        assert.equal(77, copy.player.id);
    });
});