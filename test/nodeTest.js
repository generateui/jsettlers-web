require('babel-register')();
var proto = require("../data_pb.js")
var assert = require('assert');
require("../src/generic/shims");
import {Node} from "../src/node";
import {Coord3D} from "../src/coord";

describe("Node", () => {
    describe("constructor", () => {
        it("creates equal reference instances with the same coords", () => {
            const center = Coord3D.center;
            const other1 = center.neighbors[0];
            const other2 = center.neighbors[1];

            const node1 = new Node(center, other1, other2);
            const node2 = new Node(center, other2, other1);
            const node3 = new Node(other1, center, other2);
            const node4 = new Node(other1, other2, center);
            const node5 = new Node(other2, center, other1);
            const node6 = new Node(other2, other1, center);

            assert.ok(node1 === node2);
            assert.ok(node1 === node3);
            assert.ok(node1 === node4);
            assert.ok(node1 === node5);
            assert.ok(node1 === node6);

            assert.ok(node2 === node1);
            assert.ok(node2 === node3);
            assert.ok(node2 === node4);
            assert.ok(node2 === node5);
            assert.ok(node2 === node6);

            assert.ok(node3 === node1);
            assert.ok(node3 === node2);
            assert.ok(node3 === node4);
            assert.ok(node3 === node5);
            assert.ok(node3 === node6);

            assert.ok(node4 === node1);
            assert.ok(node4 === node2);
            assert.ok(node4 === node3);
            assert.ok(node4 === node5);
            assert.ok(node4 === node6);

            assert.ok(node5 === node1);
            assert.ok(node5 === node2);
            assert.ok(node5 === node3);
            assert.ok(node5 === node4);
            assert.ok(node5 === node6);

            assert.ok(node6 === node1);
            assert.ok(node6 === node2);
            assert.ok(node6 === node3);
            assert.ok(node6 === node4);
            assert.ok(node6 === node5);

        });
    });
    describe("coord1, coord2 and coord3", () => {
        it("are unique", () => {
            const center = Coord3D.center;
            const other1 = center.neighbors[0];
            const other2 = center.neighbors[1];
            const node = new Node(center, other1, other2);
            
            assert.ok(node.coord1 !== node.coord2);
            assert.ok(node.coord1 !== node.coord3);
            assert.ok(node.coord2 !== node.coord1);
            assert.ok(node.coord2 !== node.coord3);
            assert.ok(node.coord3 !== node.coord1);
            assert.ok(node.coord3 !== node.coord2);
        });
    });
    describe("edges", () => {
        it("are unique", () => {
            const node = Coord3D.center.nodes[0];
            
            assert.ok(node.edges[0] !== node.edges[1]);
            assert.ok(node.edges[0] !== node.edges[2]);
            assert.ok(node.edges[1] !== node.edges[0]);
            assert.ok(node.edges[1] !== node.edges[2]);
            assert.ok(node.edges[2] !== node.edges[0]);
            assert.ok(node.edges[2] !== node.edges[1]);
        });
        it("3", () => {
            const node = Coord3D.center.nodes[0];

            assert.ok(node.edges.length === 3);
        });
    });
    describe("nodes", () => {
        it("are unique", () => {
            const node = Coord3D.center.nodes[1];
            
            assert.ok(node.nodes[0] !== node.nodes[1]);
            assert.ok(node.nodes[0] !== node.nodes[2]);
            assert.ok(node.nodes[1] !== node.nodes[0]);
            assert.ok(node.nodes[1] !== node.nodes[2]);
            assert.ok(node.nodes[2] !== node.nodes[0]);
            assert.ok(node.nodes[2] !== node.nodes[1]);
        });
        it("3", () => {
            const node = Coord3D.center.nodes[2];

            assert.ok(node.nodes.length === 3);
        });
    });
    describe("otherEdges", () => {
        it("are correct", () => {
            const node = Coord3D.center.nodes[3];
            const edge = node.edges[0];
            const otherEdges = node.otherEdges(edge);

            assert.ok(otherEdges[0] !== edge);
            assert.ok(otherEdges[1] !== edge);
            assert.ok(otherEdges[0] === node.edges[0] || node.edges[1]);
            assert.ok(otherEdges[1] === node.edges[0] || node.edges[1]);
            assert.ok(otherEdges[0] !== otherEdges[1]);
        });
    });
});