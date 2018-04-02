import * as assert from "assert";
import { jsettlers as pb } from "../../src/generated/data";
import { Player } from "../../src/player";
import { ResourceList } from "../../src/resource";
import { Road } from "../../src/road";
import { TradePlayer } from "../../src/actions/tradePlayer";
import { City } from "../../src/city";
import { OfferTrade } from "../../src/actions/offerTrade";
import { AcceptOffer } from "../../src/actions/acceptOffer";

describe("TradePlayer", () => {
    it("serializes", () => {
        const player = new Player({ id: 24 });
        const timberOre = new ResourceList([
            pb.ResourceType.Timber,
            pb.ResourceType.Ore
        ]);
        const tradeOffer = new OfferTrade();
        tradeOffer.id = 789;
        const tradeResponse = new AcceptOffer();
        tradeResponse.id = 890;
        const tradeBank = new TradePlayer({
            player: player,
            tradeOffer: tradeOffer,
            tradeResponse: tradeResponse,
        });

        const buffer = pb.GameAction.encode(tradeBank.data).finish();
        const revived = pb.GameAction.decode(buffer);
        const copy = TradePlayer.fromData(revived);
            
        assert.ok(copy instanceof TradePlayer);
        assert.equal(24, copy.playerId);
        assert.ok(789, copy.tradeOfferId);
        assert.ok(890, copy.tradeResponseId);
    });
});