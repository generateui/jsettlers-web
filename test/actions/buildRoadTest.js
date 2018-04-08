import * as assert from "assert";
import { jsettlers as pb } from "../../src/generated/data";
import { Player } from "../../src/player";
import { Coord3D } from "../../src/coord";
import { BuildRoad } from "../../src/actions/buildRoad";
import { Edge } from "../../src/edge";
import { Game } from "../../src/game";

describe("BuildRoad", () => {
    it("serializes", () => {
        const player = new Player({ id: 2 });
        const game = new Game();
        game.players.push(player);
        const edge = new Edge(
            new Coord3D(1, -1, 0),
            new Coord3D(0, 3, -3),
        );
        const buildRoad = new BuildRoad({ player: player, edge: edge });

        const buffer = pb.GameAction.encode(buildRoad.data).finish();
        const revived = pb.GameAction.decode(buffer);
        const copy = BuildRoad.fromData(revived, game);
            
        assert.ok(copy instanceof BuildRoad);
        assert.equal(2, copy.player.id);
        assert.equal(edge, copy.edge);
    });
});