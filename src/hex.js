import { jsettlers as pb } from "../src/generated/data";
import {Observable} from "./generic/observable.js";
import {Chit} from "./chit.js";

export class Hex extends Observable {
    constructor(coord) {
        super();
        this.coord = coord; // a Coord1d, Coord2d or Coord3d
        this.chit = new Chit(pb.ChitType.NoneHex);
        this.port = null;
        this.makeObservable(["chit", "port"]);
    }
    static fromType(type, coord) {
        var hexType = pb.HexType;
        switch (type) {
            case hexType.NoneHex: return new NoneHex(coord);
            case hexType.Desert: return new Desert(coord);
            case hexType.Sea: return new Sea(coord);
            case hexType.Forest: return new Forest(coord);
            case hexType.River: return new River(coord);
            case hexType.Mountain: return new Mountain(coord);
            case hexType.Pasture: return new Pasture(coord);
            case hexType.WheatField: return new WheatField(coord);
            case hexType.HexFromBag: return new HexFromBag(coord);
        }
    }
    static parse(hexExpression) {
        const expr = hexExpression;
        if (expr.none() !== null) { return new NoneHex(); }
        if (expr.sea() !== null) { return new Sea(); }
        if (expr.desert() !== null) { return new Desert(); }
        if (expr.pasture() !== null) { return new Pasture(); }
        if (expr.river() !== null) { return new River(); }
        if (expr.forest() !== null) { return new Forest(); }
        if (expr.mountain() !== null) { return new Mountain(); }
        if (expr.wheatField() !== null) { return new WheatField(); }
        return null;
    }
    get color() { return 0x0; }
    /** True when this hex can have a port on top of it */
    get canHavePort() { return false; }
    get canHaveChit() { return false; }
    get canHaveRobber() { return false; }
    get canBuildLandPieces() { return false; }
}
export class Desert extends Hex {
    constructor(coord) {
        super(coord);
    }
    get type() { return pb.HexType.Desert; }
    get color() { return 0xcfa762; }
    get canHaveRobber() { return true; }
    get canBuildLandPieces() { return true; }
}
export class Sea extends Hex { 
    constructor(coord) {
        super(coord);
    }
    get type() { return pb.HexType.Sea; }
    get color() { return 0x1E90FF; }
    get canHavePort() { return true; }
    get canHaveChit() { return true; }
}
export class WheatField extends Hex { 
    constructor(coord) {
        super(coord);
    }
    get type() { return pb.HexType.WheatField; }
    get color() { return 0xFFD700; }
    get canHaveChit() { return true; }
    get canHaveRobber() { return true; }
    get resourceType() { return pb.ResourceType.Wheat; }
    get canBuildLandPieces() { return true; }
}
export class Mountain extends Hex {
    constructor(coord) {
        super(coord);
    }
    get type() { return pb.HexType.Mountain; }
    get color() { return 0x8A2BE2; }
    get canHaveChit() { return true; }
    get canHaveRobber() { return true; }
    get resourceType() { return pb.ResourceType.Ore; }
    get canBuildLandPieces() { return true; }
 }
 export class River extends Hex { 
    constructor(coord) {
        super(coord);
    }
    get type() { return pb.HexType.River; }
    get color() { return 0xFF3232; }
    get canHaveChit() { return true; }
    get canHaveRobber() { return true; }
    get resourceType() { return pb.ResourceType.Brick; }
    get canBuildLandPieces() { return true; }
}
export class Forest extends Hex { 
    constructor(coord) {
        super(coord);
    }
    get type() { return pb.HexType.Forest; }
    get color() { return 0x006400; }
    get canHaveChit() { return true; }
    get canHaveRobber() { return true; }
    get resourceType() { return pb.ResourceType.Timber; }
    get canBuildLandPieces() { return true; }
}
export class Pasture extends Hex {
    constructor(coord) {
        super(coord);
    }
    get type() { return pb.HexType.Pasture; }
    get color() { return 0x00FF00; }
    get canHaveChit() { return true; }
    get canHaveRobber() { return true; }
    get resourceType() { return pb.ResourceType.Sheep; }
    get canBuildLandPieces() { return true; }
}
export class NoneHex extends Hex {
    constructor(coord) {
        super(coord);
    }
    get type() { return pb.HexType.NoneHex; }
    get color() { return 0xC0C0C0; }
}
export class HexFromBag extends Hex {
    constructor(coord) {
        super(coord);
    }
    get type() { return pb.HexType.HexFromBag; }
    get color() { return 0x808080; }
    get canHaveChit() { return true; }
    get canHavePort() { return true; }
}