import { jsettlers as pb } from "../src/generated/data"
import * as assert from "assert";
import {Edge} from "../src/edge";
import {Coord3D} from "../src/coord";

describe("Edge", () => {
    describe("constructor", () => {
        it("creates equal reference instances with the same coords", () => {
            const center = Coord3D.center;
            const other = center.neighbors[0];
            
            const edge1 = new Edge(center, other);
            const edge2 = new Edge(other, center);

            assert.ok(edge1 === edge2);
            assert.ok(edge2 === edge1);
        });
    });
    describe("coord1 & coord2", () => {
        it("are not equal", () => {
            const edge = Coord3D.center.edges[0];

            assert.ok(edge.coord1 !== edge.coord2);
            assert.ok(edge.coord2 !== edge.coord1);
        });
    });
    describe("node1 & node2", () => {
        it("are not equal", () => {
            const edge = Coord3D.center.edges[0];

            assert.ok(edge.node1 !== edge.node2);
            assert.ok(edge.node2 !== edge.node1);
        });
    });
    // TODO: test partIndex/rotation

    // TODO?: do we want edge to have edges? Apparently, it is not needed yet.
    // describe("edges", () => {
    //     it("are unique", () => {
    //         const edge = Coord3D.center.edges[0];

    //         assert.ok(edge.edges[0] !== edge.edges[1]);
    //         assert.ok(edge.edges[0] !== edge.edges[2]);
    //         assert.ok(edge.edges[1] !== edge.edges[0]);
    //         assert.ok(edge.edges[1] !== edge.edges[2]);
    //         assert.ok(edge.edges[2] !== edge.edges[0]);
    //         assert.ok(edge.edges[2] !== edge.edges[1]);
    //     });
    // });
});