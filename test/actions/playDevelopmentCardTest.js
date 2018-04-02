import * as assert from "assert";
import { jsettlers as pb } from "../../src/generated/data";
import { Player } from "../../src/player";
import { PlayDevelopmentCard } from "../../src/actions/playDevelopmentCard";
import { Monopoly } from "../../src/developmentCard";

describe("PlayDevelopmentCard", () => {
    it("serializes", () => {
        const player = new Player({ id: 11 });
        const monopoly = new Monopoly({
            player: player,
            resourceType: pb.ResourceType.Sheep
        });

        const playDev = new PlayDevelopmentCard({ 
            player: player,
            developmentCard: monopoly
        });

        const buffer = pb.GameAction.encode(playDev.data).finish();
        const revived = pb.GameAction.decode(buffer);
        const copy = PlayDevelopmentCard.fromData(revived);
            
        assert.ok(copy instanceof PlayDevelopmentCard);
        assert.strictEqual(11, copy.playerId);
        assert.strictEqual(pb.ResourceType.Sheep, copy.developmentCard.resourceType);
        assert.ok(copy.developmentCard instanceof Monopoly);
        assert.strictEqual(11, copy.developmentCard.playerId);
    });
});