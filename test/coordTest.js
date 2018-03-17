require('babel-register')();
var proto = require("../data_pb.js")
var assert = require('assert');
require("../src/generic/shims");
import {Coord3D} from "../src/coord";

describe("Coord3D", () => {
    describe("constructor", () => {
        it("creates equal reference instances with the same triordinates of center", () => {
            const center = Coord3D.center;
            const other = new Coord3D(0, 0, 0);
            assert.ok(center === other);
            assert.ok(center.hash === other.hash);
        });
        it("creates equal reference instances with the same triordinates", () => {
            const first = new Coord3D(-2, 0, 2);
            const second = new Coord3D(-2, 0, 2);
            assert.ok(first === second);
            assert.ok(first.hash === second.hash);
        });
    });
    describe("edges", () => {
        it("6", () => {
            const center = Coord3D.center;
            assert.ok(center.edges.length === 6);
        });
        it("are unique", () => {
            const center = Coord3D.center;
            const edges = new Set(center.edges);
            assert.ok(edges.size === 6);
        });
    });
    describe("nodes", () => {
        it("6", () => {
            const center = Coord3D.center;
            assert.ok(center.nodes.length === 6);
        });
        it("are unique", () => {
            const center = Coord3D.center;
            const nodes = new Set(center.nodes);
            assert.ok(nodes.size === 6);
        });
    });
    describe("neighbors", () => {
        it("two of each 'axis-shift'", () => {
            const center = Coord3D.center;

            assert.ok(center.neighbors.filter(c => c.x === center.x + 0).length === 2);
            assert.ok(center.neighbors.filter(c => c.x === center.x + 1).length === 2);
            assert.ok(center.neighbors.filter(c => c.x === center.x - 1).length === 2);

            assert.ok(center.neighbors.filter(c => c.y === center.y + 0).length === 2);
            assert.ok(center.neighbors.filter(c => c.y === center.y + 1).length === 2);
            assert.ok(center.neighbors.filter(c => c.y === center.y - 1).length === 2);

            assert.ok(center.neighbors.filter(c => c.z === center.z + 0).length === 2);
            assert.ok(center.neighbors.filter(c => c.z === center.z + 1).length === 2);
            assert.ok(center.neighbors.filter(c => c.z === center.z - 1).length === 2);
        });
        it("center coord with neighbor coords totals 24 nodes", () => {
            const center = Coord3D.center;
            const nodes = new Set();
            for (let node of center.nodes) {
                nodes.add(node);
            }
            for (let coord of center.neighbors) {
                for (let node of coord.nodes) {
                    nodes.add(node);
                }
            }

            assert.ok(nodes.size === 24);
        });
        it("center coord with neighbor coords totals 30 edges", () => {
            const center = Coord3D.center;
            const edges = new Set();
            for (let edge of center.edges) {
                edges.add(edge);
            }
            for (let coord of center.neighbors) {
                for (let edge of coord.edges) {
                    edges.add(edge);
                }
            }

            assert.ok(edges.size === 30);
        });
    });
});
