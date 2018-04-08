import * as assert from "assert";
import { jsettlers as pb } from "../../src/generated/data";
import { Player } from "../../src/player";
import { LooseResources } from "../../src/actions/looseResources";
import { DevelopmentCard } from "../../src/developmentCard";
import { Game } from "../../src/game";

describe("LooseResources", () => {
    it("serializes", () => {
        const player = new Player({ id: 99 });
        const game = new Game();
        game.players.push(player);
        const looseResources = new LooseResources({
            player: player,
            resources: DevelopmentCard.cost
        });

        const buffer = pb.GameAction.encode(looseResources.data).finish();
        const revived = pb.GameAction.decode(buffer);
        const copy = LooseResources.fromData(revived, game);
            
        assert.ok(copy instanceof LooseResources);
        assert.equal(99, copy.player.id);
        assert.ok(DevelopmentCard.cost.equals(copy.resources));
    });
});