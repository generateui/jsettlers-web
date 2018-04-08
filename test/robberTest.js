import { jsettlers as pb } from "../src/generated/data"
import * as assert from "assert";
import { Coord, Coord3D, Coord2D, Coord1D} from "../src/coord";
import { Robber } from "../src/robber";

describe("Robber", () => {
    describe("serializes", () => {
        const robber = new Robber(new Coord3D(-2, 4, 2));

        const buffer = pb.Robber.encode(robber.data).finish();
        const revived = pb.Robber.decode(buffer);
        const copy = Robber.fromData(revived);

        assert.ok(copy instanceof Robber);
        assert.strictEqual(-2, copy.coord.x);
        assert.strictEqual(4, copy.coord.y);
        assert.strictEqual(2, copy.coord.z);
    });
    describe("constructor", () => {
        const robber = new Robber();

        assert.strictEqual(robber.coord, Coord3D.center);
    });
});