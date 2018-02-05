var proto = require("../data_pb");
import {Observable} from "./generic/observable.js";
import {Chit} from "./chit.js";

export class Hex extends Observable {
    constructor(coord) {
        super();
        this.coord = coord; // a Coord1d, Coord2d or Coord3d
        this.chit = new Chit(proto.ChitType.NONEHEX);
        this.port = null;
        this.makeObservable(["chit", "port"]);
    }
    static fromType(type, coord) {
        var hexType = proto.HexType;
        switch (type) {
            case hexType.NONEHEX: return new NoneHex(coord);
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
    get canHaveChit() { return false; }
    get canHaveRobber() { return false; }
}
export class Desert extends Hex {
    constructor(coord) {
        super(coord);
    }
    get type() { return proto.HexType.DESERT; }
    get color() { return 0xcfa762; }
    get canHaveRobber() { return true; }
}
export class Sea extends Hex { 
    constructor(coord) {
        super(coord);
    }
    get type() { return proto.HexType.SEA; }
    get color() { return 0x1E90FF; }
    get canHavePort() { return true; }
    get canHaveChit() { return true; }
}
export class WheatField extends Hex { 
    constructor(coord) {
        super(coord);
    }
    get type() { return proto.HexType.WHEATFIELD; }
    get color() { return 0xFFD700; }
    get canHaveChit() { return true; }
    get canHaveRobber() { return true; }
}
export class Mountain extends Hex {
    constructor(coord) {
        super(coord);
    }
    get type() { return proto.HexType.MOUNTAIN; }
    get color() { return 0x8A2BE2; }
    get canHaveChit() { return true; }
    get canHaveRobber() { return true; }
 }
 export class River extends Hex { 
    constructor(coord) {
        super(coord);
    }
    get type() { return proto.HexType.RIVER; }
    get color() { return 0xFF3232; }
    get canHaveChit() { return true; }
    get canHaveRobber() { return true; }
}
export class Forest extends Hex { 
    constructor(coord) {
        super(coord);
    }
    get type() { return proto.HexType.FOREST; }
    get color() { return 0x006400; }
    get canHaveChit() { return true; }
    get canHaveRobber() { return true; }
}
export class Pasture extends Hex {
    constructor(coord) {
        super(coord);
    }
    get type() { return proto.HexType.PASTURE; }
    get color() { return 0x00FF00; }
    get canHaveChit() { return true; }
    get canHaveRobber() { return true; }
}
export class NoneHex extends Hex {
    constructor(coord) {
        super(coord);
    }
    get type() { return proto.HexType.NONEHEX; }
    get color() { return 0xC0C0C0; }
}
export class HexFromBag extends Hex {
    constructor(coord) {
        super(coord);
    }
    get type() { return proto.HexType.HEXFROMBAG; }
    get color() { return 0x808080; }
    get canHaveChit() { return true; }
    get canHavePort() { return true; }
}