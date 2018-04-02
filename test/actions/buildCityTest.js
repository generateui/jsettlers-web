import * as assert from "assert";
import { jsettlers as pb } from "../../src/generated/data";
import { BuildTown } from "../../src/actions/buildTown";
import { Player } from "../../src/player";
import { Coord3D } from "../../src/coord";
import { Node } from "../../src/node";
import { BuildCity } from "../../src/actions/buildCity";

describe("BuildCity", () => {
    it("serializes", () => {
        const player = new Player({ id: 1 });
        const node = new Node(
            new Coord3D(1, -1, 0),
            new Coord3D(-2, 0, 2),
            new Coord3D(-3, 3, 0)
        );
        const buildCity = new BuildCity({ player: player, node: node });

        const buffer = pb.GameAction.encode(buildCity.data).finish();
        const revived = pb.GameAction.decode(buffer);
        const copy = BuildCity.fromData(revived);
            
        assert.ok(copy instanceof BuildCity);
        assert.equal(1, copy.playerId);
        assert.equal(node, copy.node);
    });
});