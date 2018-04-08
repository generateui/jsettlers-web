import * as assert from "assert";
import { jsettlers as pb } from "../../src/generated/data";
import { Player } from "../../src/player";
import { EndTurn } from "../../src/actions/endTurn";
import { TradeBank } from "../../src/actions/tradeBank";
import { ResourceList } from "../../src/resource";
import { Road } from "../../src/road";
import { Game } from "../../src/game";

describe("TradeBank", () => {
    it("serializes", () => {
        const player = new Player({ id: 24 });
        const onlyTimber = new ResourceList(pb.ResourceType.Timber);
        const game = new Game();
        game.players.push(player);
        const tradeBank = new TradeBank({
            player: player,
            offered: onlyTimber,
            wanted: Road.cost
        });

        const buffer = pb.GameAction.encode(tradeBank.data).finish();
        const revived = pb.GameAction.decode(buffer);
        const copy = TradeBank.fromData(revived, game);
            
        assert.ok(copy instanceof TradeBank);
        assert.equal(24, copy.player.id);
        assert.ok(onlyTimber.equals(copy.offered));
        assert.ok(Road.cost.equals(copy.wanted));
    });
});