import * as assert from "assert";
import { jsettlers as pb } from "../../src/generated/data";
import { Player } from "../../src/player";
import { CounterOffer } from "../../src/actions/counterOffer";
import { Town } from "../../src/town";
import { City } from "../../src/city";
import { Game } from "../../src/game";
import { OfferTrade } from "../../src/actions/offerTrade";

describe("CounterOffer", () => {
    it("serializes", () => {
        const player = new Player({ id: 22 });
        const offer = new OfferTrade({ player: player, id: 1337 })
        const game = new Game();
        game.players.push(player);
        game.actions.push(offer);
        const counterOffer = new CounterOffer({
            player: player,
            tradeOffer: offer,
            offered: Town.cost,
            wanted: City.cost,
        });

        const buffer = pb.GameAction.encode(counterOffer.data).finish();
        const revived = pb.GameAction.decode(buffer);
        const copy = CounterOffer.fromData(revived, game);
            
        assert.ok(copy instanceof CounterOffer);
        assert.strictEqual(22, copy.player.id);
        assert.ok(Town.cost.equals(copy.offered));
        assert.ok(City.cost.equals(copy.wanted));
        assert.strictEqual(1337, copy.tradeOffer.id);
    });
});