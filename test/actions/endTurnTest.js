import * as assert from "assert";
import { jsettlers as pb } from "../../src/generated/data";
import { Player } from "../../src/player";
import { EndTurn } from "../../src/actions/endTurn";
import { Game } from "../../src/game";

describe("EndTurn", () => {
    it("serializes", () => {
        const player = new Player({ id: 23 });
        const endTurn = new EndTurn({ player: player });
        const game = new Game();
        game.players.push(player);

        const buffer = pb.GameAction.encode(endTurn.data).finish();
        const revived = pb.GameAction.decode(buffer);
        const copy = EndTurn.fromData(revived, game);
            
        assert.ok(copy instanceof EndTurn);
        assert.equal(23, copy.player.id);
    });
});