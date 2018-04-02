import * as assert from "assert";
import { jsettlers as pb } from "../../src/generated/data";
import { AcceptOffer } from "../../src/actions/acceptOffer";
import { Player } from "../../src/player";

const serializeThenDeserialize = function(developmentCard) {
    const dc = developmentCard;
    const buffer = pb.DevelopmentCard.encode(dc.data).finish();
    const revived = pb.DevelopmentCard.decode(buffer);
    const copy = DevelopmentCard.fromData(revived);
    return copy;
}

describe("AcceptOffer", () => {
    it("serializes", () => {
        const player = new Player({ id: 1 });
        const acceptOffer = new AcceptOffer({ player: player });

        const buffer = pb.GameAction.encode(acceptOffer.data).finish();
        const revived = pb.GameAction.decode(buffer);
        const copy = AcceptOffer.fromData(revived);
            
        assert.ok(copy instanceof AcceptOffer);
        assert.equal(1, copy.playerId);
    });
});