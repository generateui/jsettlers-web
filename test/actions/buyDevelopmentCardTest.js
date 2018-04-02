import * as assert from "assert";
import { jsettlers as pb } from "../../src/generated/data";
import { BuildTown } from "../../src/actions/buildTown";
import { Player } from "../../src/player";
import { Coord3D } from "../../src/coord";
import { Node } from "../../src/node";
import { BuildCity } from "../../src/actions/buildCity";
import { BuyDevelopmentCard } from "../../src/actions/buyDevelopmentCard";
import { Soldier } from "../../src/developmentCard";

describe("BuyDevelopmentCard", () => {
    it("serializes with development card", () => {
        const player = new Player({ id: 26 });
        const soldier = new Soldier({ player: player });
        const buyDev = new BuyDevelopmentCard({
            player: player,
            developmentCard: soldier
        });

        const messageError = pb.GameAction.verify(buyDev.data);
        const buffer = pb.GameAction.encode(buyDev.data).finish();
        const revived = pb.GameAction.decode(buffer);
        const copy = BuyDevelopmentCard.fromData(revived);

        assert.ok(messageError === null);
        assert.ok(copy instanceof BuyDevelopmentCard);
        assert.equal(26, copy.playerId);
        assert.ok(copy.developmentCard instanceof Soldier);
        assert.equal(26, copy.developmentCard.playerId);
    });
    it("serializes without development card", () => {
        const player = new Player({ id: 26 });
        const buyDev = new BuyDevelopmentCard({ player: player });

        const buffer = pb.GameAction.encode(buyDev.data).finish();
        const revived = pb.GameAction.decode(buffer);
        const copy = BuyDevelopmentCard.fromData(revived);

        assert.ok(copy instanceof BuyDevelopmentCard);
        assert.equal(26, copy.playerId);
        assert.equal(null, copy.developmentCard);
    });
});