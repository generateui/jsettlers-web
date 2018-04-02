import * as assert from "assert";
import { jsettlers as pb } from "../../src/generated/data";
import { Player } from "../../src/player";
import { Coord3D } from "../../src/coord";
import { BuildRoad } from "../../src/actions/buildRoad";
import { Edge } from "../../src/edge";

describe("BuildRoad", () => {
    it("serializes", () => {
        const player = new Player({ id: 2 });
        const edge = new Edge(
            new Coord3D(1, -1, 0),
            new Coord3D(0, 3, -3),
        );
        const buildRoad = new BuildRoad({ player: player, edge: edge });

        const buffer = pb.GameAction.encode(buildRoad.data).finish();
        const revived = pb.GameAction.decode(buffer);
        const copy = BuildRoad.fromData(revived);
            
        assert.ok(copy instanceof BuildRoad);
        assert.equal(2, copy.playerId);
        assert.equal(edge, copy.edge);
    });
});