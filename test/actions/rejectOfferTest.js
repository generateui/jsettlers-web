import * as assert from "assert";
import { jsettlers as pb } from "../../src/generated/data";
import { Player } from "../../src/player";
import { RejectOffer } from "../../src/actions/rejectOffer";
import { OfferTrade } from "../../src/actions/offerTrade";
import { Game } from "../../src/game";

describe("RejectOffer", () => {
    it("serializes", () => {
        const player = new Player({ id: 101 });
        const offer = new OfferTrade({ player: player, id: 23 })
        const game = new Game();
        game.players.push(player);
        game.actions.push(offer);
        const rejectOffer = new RejectOffer({ 
            player: player,
            reason: pb.RejectOffer.Reason.WantMore,
            tradeOffer: offer
        });

        const buffer = pb.GameAction.encode(rejectOffer.data).finish();
        const revived = pb.GameAction.decode(buffer);
        const copy = RejectOffer.fromData(revived, game);
            
        assert.ok(copy instanceof RejectOffer);
        assert.strictEqual(101, copy.player.id);
        assert.strictEqual(pb.RejectOffer.Reason.WantMore, copy.reason);
        assert.strictEqual(23, copy.tradeOffer.id);
    });
});