import { jsettlers as pb } from "../src/generated/data";
import {Edge} from "./edge.js";
import {Coord} from "./coord.js";

/** Combination of 3 hexagon locations (Coords) */
export class Node {
    constructor(coord1, coord2, coord3) { /* Coord */
        var hash = Node._getHash(coord1, coord2, coord3);
        if (this.constructor._cache.has(hash)) {
            // return cached instance and exit constructor
            return this.constructor._cache.get(hash);
        }
        this._coord1 = coord1;
        this._coord2 = coord2;
        this._coord3 = coord3;
        this.constructor._cache.set(hash, this);
        this._hash = hash;
    }
    get coord1() { return this._coord1; }
    get coord2() { return this._coord2; }
    get coord3() { return this._coord3; }
    get coords() {
        if (this._coords === undefined) {
            this._coords = [
                this.coord1, this.coord2, this.coord3
            ];
        }
        return this._coords;
    }
    /** String */
    get hash() { return this._hash; }
    /** <Edge>[3] */
    get edges() {
        if (this._edges === undefined) {
            this._edges = [
                new Edge(this._coord1, this._coord2),
                new Edge(this._coord1, this._coord3),
                new Edge(this._coord2, this._coord3),
            ]
        }
        return this._edges;
    }
    get nodes() {
        if (this._nodes === undefined) {
            this._nodes = [
                this.edges[0].node1 !== this ? this.edges[0].node1 : this.edges[0].node2,
                this.edges[1].node1 !== this ? this.edges[1].node1 : this.edges[1].node2,
                this.edges[2].node1 !== this ? this.edges[2].node1 : this.edges[2].node2,
            ];
        }
        return this._nodes;
    }
    /** given an edge of this node, return the other edges */
    otherEdges(edge) {
        // TODO: throw if edge is not in edges?
        const index = this.edges.indexOf(edge);
        const edge1 = index === 0 ? this.edges[1] : this.edges[0];
        const edge2 = index === 0 ? this.edges[2] : index === 1 ? this.edges[2] : this.edges[1];
        return [edge1, edge2];
    }
    // By adding the hashcode numbers the order of coord1, 
    // coord2 and coord3 is not important
    // We divide by 3 to prevent overflow
    // TODO: unit test for collisions up to maps ~20x20 tiles
    /** String */
    static _getHash(c1, c2, c3) {
        return ((c1.hash.hashCode() / 3) >> 0) + 
            ((c2.hash.hashCode() / 3) >> 0) + 
            ((c3.hash.hashCode() / 3) >> 0);
    }
    get data() {
        return pb.Node.create({
            coord1: this.coord1.data,
            coord2: this.coord2.data,
            coord3: this.coord3.data,
        });
    }
    static parse(nodeExpression) {
        const coord1 = Coord.parse(nodeExpression.coord()[0]);
        const coord2 = Coord.parse(nodeExpression.coord()[1]);
        const coord3 = Coord.parse(nodeExpression.coord()[2]);
        return new Node(coord1, coord2, coord3);
    }
    static fromData(data) {
        const coord1 = Coord.fromData(data.coord1);
        const coord2 = Coord.fromData(data.coord2);
        const coord3 = Coord.fromData(data.coord3);
        return new Node(coord1, coord2, coord3);
    }
    toString() {
        return `${this.coord1.toString()} ● ${this.coord2.toString()} ● ${this.coord3.toString()}`;
    }
}
Node._cache = new Map();