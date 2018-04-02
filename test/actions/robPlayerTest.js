import * as assert from "assert";
import { jsettlers as pb } from "../../src/generated/data";
import { Player } from "../../src/player";
import { RobPlayer } from "../../src/actions/robPlayer";
import { ResourceList } from "../../src/resource";

describe("RobPlayer", () => {
    it("serializes with resource", () => {
        const player = new Player({ id: 909 });
        const opponent = new Player({ id: 910 });
        const resources = new ResourceList(pb.ResourceType.Wheat);
        const robPlayer = new RobPlayer({
            player: player,
            opponent: opponent,
            resources: resources
        });

        const buffer = pb.GameAction.encode(robPlayer.data).finish();
        const revived = pb.GameAction.decode(buffer);
        const copy = RobPlayer.fromData(revived);
            
        assert.ok(copy instanceof RobPlayer);
        assert.equal(909, copy.playerId);
        assert.strictEqual(910, copy.opponentId);
        assert.ok(resources.equals(copy.resources));
    });
    it("serializes without resource and without opponent", () => {
        const player = new Player({ id: 909 });
        const robPlayer = new RobPlayer({ 
            player: player
        });

        const buffer = pb.GameAction.encode(robPlayer.data).finish();
        const revived = pb.GameAction.decode(buffer);
        const copy = RobPlayer.fromData(revived);
            
        assert.ok(copy instanceof RobPlayer);
        assert.equal(909, copy.playerId);
        assert.equal(null, copy.opponentId);
    });
});