import * as assert from "assert";
import { jsettlers as pb } from "../../src/generated/data";
import { Player } from "../../src/player";
import { CounterOffer } from "../../src/actions/counterOffer";
import { Town } from "../../src/town";
import { City } from "../../src/city";

describe("CounterOffer", () => {
    it("serializes", () => {
        const player = new Player({ id: 22 });
        const counterOffer = new CounterOffer({ 
            player: player,
            tradeOfferId: 1337,
            offered: Town.cost,
            wanted: City.cost,
        });

        const buffer = pb.GameAction.encode(counterOffer.data).finish();
        const revived = pb.GameAction.decode(buffer);
        const copy = CounterOffer.fromData(revived);
            
        assert.ok(copy instanceof CounterOffer);
        assert.strictEqual(22, copy.playerId);
        assert.ok(Town.cost.equals(copy.offered));
        assert.ok(City.cost.equals(copy.wanted));
        assert.strictEqual(1337, copy.tradeOfferId);
    });
});