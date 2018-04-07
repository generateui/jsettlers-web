import { jsettlers as pb } from "../src/generated/data"
import * as assert from "assert";
import {Edge} from "../src/edge";
import {Coord3D, Coord} from "../src/coord";
import { Standard4pDesign, Board } from "../src/board";
import { Sea } from "../src/hex";
import { Robber } from "../src/robber";

describe("Board", () => {
    it("serializes", () => {
        const board = new Standard4pDesign();
        board.generateBoardForPlay();

        const buffer = pb.Board.encode(board.data).finish();
        const revived = pb.Board.decode(buffer);
        const copy = Board.fromData(revived);

        assert.ok(board.robber instanceof Robber);
        assert.strictEqual(0, board.robber.coord.x);
        assert.strictEqual(0, board.robber.coord.y);
        assert.strictEqual(0, board.robber.coord.z);
        const hexArray = Array.from(board.hexes.map.values());
        assert.strictEqual(18, hexArray.filter(h => h instanceof Sea).length);
        assert.strictEqual(19, hexArray.filter(h => !(h instanceof Sea)).length);
        assert.strictEqual(9, hexArray.filter(h => h.port !== null).length);
        assert.strictEqual(1, hexArray.filter(h => h.chit.number === 2).length);
        assert.strictEqual(2, hexArray.filter(h => h.chit.number === 3).length);
        assert.strictEqual(2, hexArray.filter(h => h.chit.number === 4).length);
        assert.strictEqual(2, hexArray.filter(h => h.chit.number === 5).length);
        assert.strictEqual(2, hexArray.filter(h => h.chit.number === 6).length);
        assert.strictEqual(2, hexArray.filter(h => h.chit.number === 8).length);
        assert.strictEqual(2, hexArray.filter(h => h.chit.number === 9).length);
        assert.strictEqual(2, hexArray.filter(h => h.chit.number === 10).length);
        assert.strictEqual(2, hexArray.filter(h => h.chit.number === 11).length);
        assert.strictEqual(1, hexArray.filter(h => h.chit.number === 12).length);
        assert.ok(board.hexes.map.get(Coord3D.center) !== null)
        assert.strictEqual(copy.robber.coord, Coord3D.center);
    });
});