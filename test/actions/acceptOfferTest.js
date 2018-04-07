import * as assert from "assert";
import { jsettlers as pb } from "../../src/generated/data";
import { AcceptOffer } from "../../src/actions/acceptOffer";
import { Player } from "../../src/player";
import { OfferTrade } from "../../src/actions/offerTrade";
import { Game } from "../../src/game";

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
        const offer = new OfferTrade({ player: player, id: 23 })
        const game = new Game();
        game.actions.push(offer);
        game.players.push(player);
        const acceptOffer = new AcceptOffer({
            player: player,
            tradeOffer: offer
        });

        const buffer = pb.GameAction.encode(acceptOffer.data).finish();
        const revived = pb.GameAction.decode(buffer);
        const copy = AcceptOffer.fromData(revived, game);
            
        assert.ok(copy instanceof AcceptOffer);
        assert.equal(1, copy.player.id);
        assert.ok(copy.tradeOffer instanceof OfferTrade);
    });
});