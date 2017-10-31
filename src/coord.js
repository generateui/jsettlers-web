// relative location of a hex on a hexagonal grid
class Coord {}  

class Coord1D extends Coord {
    constructor(id) { // integer id of a hex
        this.id = id;
        this.map1Dto3D = new Map([
            [ new Coord1D(0x00700).hash, new Coord3D(0,0,0)]
        ]);
    }
    static fromData(data) { 
        return new Coord1D(data.getId()); 
    }
    get data() { 
        var data = new protobuf.carcattone_data.Coord1D();
        data.setId(this.id);
        return data;
    }
    get hash() { return this.id.toString(); }
    get coord3D() { return this.map1Dto3D.get(id); }
}

class Coord2D extends Coord {
    constructor(r, c) { 
        this.r = r; // row
        this.c = c; // column
    }
    static fromData(data) { 
        return new Coord2D(data.getRow(), data.getColumn()); 
    }
    get hash() { return this.r + "." + this.c; }
}

class Coord3D extends Coord {
    constructor(x, y, z) {
        super();
        this.x = x;
        this.y = y;
        this.z = z;
    }
    static fromData(data) {
        return new Coord3D(data.getX(), data.getY(), data.getZ());
    }
    get data() {
        var data = new proto.carcattone_data.Coord3D();
        data.setX(this.x);
        data.setY(this.y);
        data.setZ(this.z);
        return data;
    }
    get hash() {
        if (this._hash == null) {
            this._hash = this.x + "." + this.y + "." + this.z;
        }
        return this._hash;
    }
    get neighbors() {
        if (this._neighbors == null) {
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
    // Distance to 3-axis origin 0,0,0
    get radius() {
        if (this._radius == null) {
            this._radius = Math.max(
                Math.abs(this.x), Math.abs(this.y), Math.abs(this.z))
        }
        return this._radius;
    }
}
