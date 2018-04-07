import * as assert from "assert";
import { jsettlers as pb } from "../../src/generated/data";
import { BuildTown } from "../../src/actions/buildTown";
import { Player } from "../../src/player";
import { Coord3D } from "../../src/coord";
import { Node } from "../../src/node";
import { BuildCity } from "../../src/actions/buildCity";
import { BuyDevelopmentCard } from "../../src/actions/buyDevelopmentCard";
import { Soldier } from "../../src/developmentCard";
import { Game } from "../../src/game";

describe("BuyDevelopmentCard", () => {
    it("serializes with development card", () => {
        const player = new Player({ id: 26 });
        const game = new Game();
        game.players.push(player);
        const soldier = new Soldier({ player: player });
        const buyDev = new BuyDevelopmentCard({
            player: player,
            developmentCard: soldier
        });

        const messageError = pb.GameAction.verify(buyDev.data);
        const buffer = pb.GameAction.encode(buyDev.data).finish();
        const revived = pb.GameAction.decode(buffer);
        const copy = BuyDevelopmentCard.fromData(revived, game);

        assert.ok(messageError === null);
        assert.ok(copy instanceof BuyDevelopmentCard);
        assert.equal(26, copy.player.id);
        assert.ok(copy.developmentCard instanceof Soldier);
        assert.equal(26, copy.developmentCard.player.id);
    });
    it("serializes without development card", () => {
        const player = new Player({ id: 26 });
        const game = new Game();
        game.players.push(player);
        const buyDev = new BuyDevelopmentCard({ player: player });

        const buffer = pb.GameAction.encode(buyDev.data).finish();
        const revived = pb.GameAction.decode(buffer);
        const copy = BuyDevelopmentCard.fromData(revived, game);

        assert.ok(copy instanceof BuyDevelopmentCard);
        assert.equal(26, copy.player.id);
        assert.equal(null, copy.developmentCard);
    });
});