import * as assert from "assert";
import { jsettlers as pb } from "../../src/generated/data";
import { Player } from "../../src/player";
import { RejectOffer } from "../../src/actions/rejectOffer";

describe("RejectOffer", () => {
    it("serializes", () => {
        const player = new Player({ id: 101 });
        const rejectOffer = new RejectOffer({ 
            player: player,
            reason: pb.RejectOffer.Reason.WantMore,
            tradeOfferId: 456
        });

        const buffer = pb.GameAction.encode(rejectOffer.data).finish();
        const revived = pb.GameAction.decode(buffer);
        const copy = RejectOffer.fromData(revived);
            
        assert.ok(copy instanceof RejectOffer);
        assert.strictEqual(101, copy.playerId);
        assert.strictEqual(pb.RejectOffer.Reason.WantMore, copy.reason);
        assert.strictEqual(456, copy.tradeOfferId);
    });
});