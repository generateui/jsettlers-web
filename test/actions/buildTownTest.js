import * as assert from "assert";
import { jsettlers as pb } from "../../src/generated/data";
import { BuildTown } from "../../src/actions/buildTown";
import { Player } from "../../src/player";
import { Coord3D } from "../../src/coord";
import { Node } from "../../src/node";

describe("BuildTown", () => {
    it("serializes", () => {
        const player = new Player({ id: 2 });
        const node = new Node(
            new Coord3D(1, -1, 0),
            new Coord3D(-2, 0, 2),
            new Coord3D(-4, 4, 0)
        );
        const buildTown = new BuildTown({ player: player, node: node });

        const buffer = pb.GameAction.encode(buildTown.data).finish();
        const revived = pb.GameAction.decode(buffer);
        const copy = BuildTown.fromData(revived);
            
        assert.ok(copy instanceof BuildTown);
        assert.equal(2, copy.playerId);
        assert.equal(node, copy.node);
    });
});