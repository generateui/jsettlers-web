var proto = require("../src/generated/data_pb");
import {Node} from "./node.js";
import {Edge} from "./edge.js";

/** relative location of a hex on a hexagonal grid
Currently 3 implementation exist: 1D, 2D and 3D. Internally everywhere 
coord3D is assumed to be used. On the borders, Coord1D and Coord3D are 
used for e.g. parsing and displaying coordinates to the user. 
Coordinates are immutable.
Coordinates are interned, meaning that creating an instance with the same
values yields the same instance. 
Example: `let equal = new Coord3D(0,0,0) === new Coord(0,0,0);` true */
export class Coord {
    constructor() {

        // converted cooords may keep a reference to the source coordinates
        this.coord1D = null;
        this.coord2D = null;
        this.coord3D = null;
    }
    // get neighbors;
    // get nodes();
    // get edges();
    static fromData(data) {
        if (data.hasCoord1D()) {
            // not implemented
        } else if (data.hasCoord2D()) {
            // not implemented
        } else if (data.hasCoord3D()) {
            return Coord3D.fromData(data.getCoord3D());
        }
    }
    static parse(coordExpression) {
        if (coordExpression.coord1D() !== null) {
            return Coord1D.parse(coordExpression.coord1D());
        } else if(coordExpression.coord2D() !== null) {
            return Coord2D.parse(coordExpression.coord2D());
        } else if(coordExpression.coord3D !== null) {
            return Coord3D.parse(coordExpression.coord3D());
        }
        return null;
    }
}
export class Coord1D extends Coord {
    constructor(id) { // integer id of a hex
        super();

        const hash = Coord1D._getHash(id);
        if (this.constructor._cache.has(hash)) {
            return this.constructor._cache.get(hash);
        }
        this.id = id;
        this._hash = hash;
        this.constructor._cache.set(hash, this);
    }
    static fromData(data) { 
        return new Coord1D(data.getId());
    }
    static parse(coord1DExpression) {
        if (coord1DExpression.NUMBER() !== null) {
            let id = parseInt(coord1DExpression.NUMBER());
            return new Coord1D(id);
        }
        return null;
    }
    get data() {
        var data = new proto.Coord1D();
        data.setId(this.id);
        return data;
    }
    static _getHash(id) { return id.toString(); }
    get hash() { return this._hash; }
    toString() {
        return `[${this.id}]`;
    }
}
Coord1D._cache = new Map();
export class Coord2D extends Coord {
    constructor(r, c) {
        super();

        let hash = Coord2D._getHash(r, c);
        if (this.constructor._cache.has(hash)) {
            // return existing instance and exit this constructor
            return this.constructor._cache.get(hash);
        }
        this.r = r; // row
        this.c = c; // column
        this._hash = hash;
        this.constructor._cache.set(hash, this);
    }
    static _getHash(r, c) { return r + "." + c; }
    static fromData(data) { 
        return new Coord2D(data.getRow(), data.getColumn()); 
    }
    static parse(coord2DExpression) {
        let row = null;
        let column = null;
        if (coord2DExpression.row() !== null) {
            row = parseInt(coord2DExpression.row().NUMBER());
        }
        if (coord2DExpression.column() !== null) {
            column = parseInt(coord2DExpression.column().NUMBER());
        }
        if (row !== null && column !== null) {
            return new Coord2D(row, column);
        }
        return null;
    }
    get hash() { return this._hash; }
    toString() {
        return `[${this.r} ${this.c}]`;
    }
}
Coord2D._cache = new Map();

/** Represents a hexagon located on a 3-axis
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
    static parse(coord3DExpression) {
        let x = null;
        let y = null;
        let z = null;
        if (coord3DExpression.x() !== null) {
            x = parseInt(coord2DExpression.x().NUMBER());
        }
        if (coord3DExpression.y() !== null) {
            y = parseInt(coord2DExpression.y().NUMBER());
        }
        if (coord3DExpression.z() !== null) {
            z = parseInt(coord2DExpression.z().NUMBER());
        }
        if (x !== null && y !== null && z !== null) {
            return new Coord3D(x, y, z);
        }
        return null;
    }
    get data() {
        const data = new proto.Coord3D();
        data.setX(this.x);
        data.setY(this.y);
        data.setZ(this.z);
        const coord = new proto.Coord();
        coord.setCoord3D(data);
        return coord;
    }
    /** <Coord3D>[6] */
    get neighbors() {
        if (this._neighbors == undefined) {
            var x = this.x, y = this.y, z = this.z;
            this._neighbors = [
                new Coord3D(x + 1, y - 0, z - 1),
                new Coord3D(x + 0, y + 1, z - 1),
                new Coord3D(x - 1, y + 1, z + 0),
                new Coord3D(x - 1, y + 0, z + 1),
                new Coord3D(x + 0, y - 1, z + 1),
                new Coord3D(x + 1, y - 1, z + 0),
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
            ];
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
    toString() {
        return `[${this.x} ${this.y} ${this.z}]`;
    }
}
Coord3D._cache = new Map();
Coord3D.center = new Coord3D(0, 0, 0);
