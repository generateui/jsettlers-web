var proto = require("../data_pb");
import {Node} from "./node.js";
import {Edge} from "./edge.js";

// relative location of a hex on a hexagonal grid
class Coord {
    // get neighbors;
    // get nodes();
    // get edges();
}

class Coord1D extends Coord {
    constructor(id) { // integer id of a hex
        super();
        this.id = id;
        this.map1Dto3D = new Map([
            [ new Coord1D(0x77), new Coord3D(0,0,0)] // Todo: where to keep mapping?
        ]);
    }
    static fromData(data) { 
        return new Coord1D(data.getId()); 
    }
    get data() { 
        var data = new proto.Coord1D();
        data.setId(this.id);
        return data;
    }
    get hash() { return this.id.toString(); }
    get coord3D() { return this.map1Dto3D.get(id); }
}

class Coord2D extends Coord {
    constructor(r, c) { 
        super();
        this.r = r; // row
        this.c = c; // column
    }
    static fromData(data) { 
        return new Coord2D(data.getRow(), data.getColumn()); 
    }
    get hash() { return this.r + "." + this.c; }
}

/** Represents a hexagon located on a 3-axis
 * Immutable. Creating instances with identical values result in
 * instances with the same reference. e.g.
 * 
 * let equal = new Coord3D(0,0,0) === new Coord(0,0,0); // true
 * 
 * TODO: document (pointy | flat). Is this impl dependent on it?
 */
export class Coord3D extends Coord {
    constructor(x, y, z) {
        super();
        
        let hash = Coord3D._getHash(x, y, z);
        if (this.constructor._cache.has(hash)) {
            // return existing instance and exit this constructor
            return this.constructor._cache.get(hash);
        }
        this.x = x;
        this.y = y;
        this.z = z;
        this._hash = hash;
        this.constructor._cache.set(hash, this);
    }
    /** String */
    get hash() { return this._hash; }
    static _getHash(x, y, z) { return x + "." + y + "." + z; }
    static fromData(data) {
        return new Coord3D(data.getX(), data.getY(), data.getZ());
    }
    get data() {
        let data = new proto.Coord3D();
        data.setX(this.x);
        data.setY(this.y);
        data.setZ(this.z);
        return data;
    }
    /** <Coord3D>[6] */
    get neighbors() {
        if (this._neighbors == undefined) {
            var x = this.x, y = this.y, z = this.z;
            this._neighbors = [
                new Coord3D(x + 1, y - 1, z + 0),
                new Coord3D(x + 1, y - 0, z - 1),
                new Coord3D(x + 0, y + 1, z - 1),
                new Coord3D(x - 1, y + 1, z + 0),
                new Coord3D(x - 1, y + 0, z + 1),
                new Coord3D(x + 0, y - 1, z + 1),
            ];
        }
        return this._neighbors;
    }
    /** Distance to 3-axis origin 0, 0, 0 
     * int >= 0 */
    get radius() {
        if (this._radius === undefined) {
            this._radius = Math.max(
                Math.abs(this.x), 
                Math.abs(this.y),
                Math.abs(this.z))
        }
        return this._radius;
    }
    /** <Node>[6] */
    get nodes() {
        if (this._nodes === undefined) {
            let n = this.neighbors;
            this._nodes = [
                new Node(this, n[0], n[1]),
                new Node(this, n[1], n[2]),
                new Node(this, n[2], n[3]),
                new Node(this, n[3], n[4]),
                new Node(this, n[4], n[5]),
                new Node(this, n[5], n[0]),
            ]
        }
        return this._nodes;
    }
    /** <Edge>[6] */
    get edges() {
        if (this._edges === undefined) {
            let n = this.neighbors;
            this._edges = [
                new Edge(this, n[0]),
                new Edge(this, n[1]),
                new Edge(this, n[2]),
                new Edge(this, n[3]),
                new Edge(this, n[4]),
                new Edge(this, n[5]),
            ];
        }
        return this._edges;
    }
}
Coord3D._cache = new Map();
Coord3D.center = new Coord3D(0, 0, 0);
