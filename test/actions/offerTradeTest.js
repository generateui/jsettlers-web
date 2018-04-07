import * as assert from "assert";
import { jsettlers as pb } from "../../src/generated/data";
import { Player } from "../../src/player";
import { OfferTrade } from "../../src/actions/offerTrade";
import { Road } from "../../src/road";
import { City } from "../../src/city";
import { Game } from "../../src/game";

describe("OfferTrade", () => {
    it("serializes", () => {
        const player = new Player({ id: 7 });
        const game = new Game();
        game.players.push(player);
        const offerTrade = new OfferTrade({
            player: player,
            offered: Road.cost,
            wanted: City.cost
        });

        const buffer = pb.GameAction.encode(offerTrade.data).finish();
        const revived = pb.GameAction.decode(buffer);
        const copy = OfferTrade.fromData(revived, game);
            
        assert.ok(copy instanceof OfferTrade);
        assert.equal(7, copy.player.id);
        assert.ok(Road.cost.equals(copy.offered));
        assert.ok(City.cost.equals(copy.wanted));
    });
});