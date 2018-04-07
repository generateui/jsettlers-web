import * as assert from "assert";
import { jsettlers as pb } from "../../src/generated/data";
import { Player } from "../../src/player";
import { ResourceList } from "../../src/resource";
import { Road } from "../../src/road";
import { TradePlayer } from "../../src/actions/tradePlayer";
import { City } from "../../src/city";
import { OfferTrade } from "../../src/actions/offerTrade";
import { AcceptOffer } from "../../src/actions/acceptOffer";
import { Game } from "../../src/game";

describe("TradePlayer", () => {
    it("serializes", () => {
        const player = new Player({ id: 24 });
        const timberOre = new ResourceList([
            pb.ResourceType.Timber,
            pb.ResourceType.Ore
        ]);
        const offer = new OfferTrade({ id: 789 });
        const tradeResponse = new AcceptOffer({ id: 890 });
        const tradeBank = new TradePlayer({
            player: player,
            tradeOffer: offer,
            tradeResponse: tradeResponse,
        });
        const game = new Game();
        game.players.push(player);
        game.actions.push(tradeResponse);
        game.actions.push(offer);

        const buffer = pb.GameAction.encode(tradeBank.data).finish();
        const revived = pb.GameAction.decode(buffer);
        const copy = TradePlayer.fromData(revived, game);
            
        assert.ok(copy instanceof TradePlayer);
        assert.equal(24, copy.player.id);
        assert.ok(789, copy.tradeOffer.id);
        assert.ok(890, copy.tradeResponse.id);
    });
});