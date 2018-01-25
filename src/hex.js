class Hex {
    constructor(coord) {
        this.coord = coord; // a Coord1d, Coord2d or Coord3d
        this.chit = new Chit(proto.carcattonne_data.ChitType.NONE);
        this.port = null;
    }
    static fromType(type, coord) {
        var hexType = proto.carcattonne_data.HexType;
        switch (type) {
            case hexType.NONE: return new NoneHex(coord);
            case hexType.DESERT: return new Desert(coord);
            case hexType.SEA: return new Sea(coord);
            case hexType.FOREST: return new Forest(coord);
            case hexType.RIVER: return new River(coord);
            case hexType.MOUNTAIN: return new Mountain(coord);
            case hexType.PASTURE: return new Pasture(coord);
            case hexType.WHEATFIELD: return new WheatField(coord);
            case hexType.HEXFROMBAG: return new HexFromBag(coord);
        }
    }
    get color() { return 0x0; }
    /** True when this hex can have a port on top of it */
    get canHavePort() { return false; }
}
class Desert extends Hex {
    constructor(coord) {
        super(coord);
    }
    get type() { return proto.carcattonne_data.HexType.DESERT; }
    get color() { return 0xFFE4C4; }
}
class Sea extends Hex { 
    constructor(coord) {
        super(coord);
    }
    get color() { return 0x1E90FF; }
    get canHavePort() { return true; }
}
class WheatField extends Hex { 
    constructor(coord) {
        super(coord);
    }
    get type() { return proto.carcattonne_data.HexType.WHEATFIELD; }
    get color() { return 0xFFD700; }
}
class Mountain extends Hex {
    constructor(coord) {
        super(coord);
    }
    get color() { return 0x8A2BE2; }
 }
class River extends Hex { 
    constructor(coord) {
        super(coord);
    }
    get color() { return 0xFF3232; }
}
class Forest extends Hex { 
    constructor(coord) {
        super(coord);
    }
    get color() { return 0x006400; }
}
class Pasture extends Hex {
    constructor(coord) {
        super(coord);
    }
    get color() { return 0x00FF00; }
}
class NoneHex extends Hex {
    constructor(coord) {
        super(coord);
    }
    get color() { return 0xC0C0C0; }
}
class HexFromBag extends Hex {
    constructor(coord) {
        super(coord);
    }
    get color() { return 0x808080; }
}