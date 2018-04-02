import * as assert from "assert";
import { jsettlers as pb } from "../../src/generated/data";
import { Player } from "../../src/player";
import { MoveRobber } from "../../src/actions/moveRobber";
import { Coord3D } from "../../src/coord";

describe("MoveRobber", () => {
    it("serializes", () => {
        const player = new Player({ id: 32 });
        const coord = new Coord3D(-5, 0, 5);
        const moveRobber = new MoveRobber({
            player: player,
            coord: coord 
        });

        const buffer = pb.GameAction.encode(moveRobber.data).finish();
        const revived = pb.GameAction.decode(buffer);
        const copy = MoveRobber.fromData(revived);
            
        assert.ok(copy instanceof MoveRobber);
        assert.equal(32, copy.playerId);
        assert.strictEqual(coord, copy.coord);
    });
});