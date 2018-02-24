var proto = require("../data_pb");
import {Edge} from "./edge.js";
import { get } from "https";

export class Port {
    constructor(partIndex, seaCoord) {
        this.partIndex = partIndex;
        this.seaCoord = seaCoord;
        this._edge = null;
    }
    get edge() {
        if (this._edge === null) {
            this._edge = Edge.fromPartIndex(this.seaCoord, this.partIndex);
        }
        return this._edge;
    }
    get color() { return 0x0; }
    get canPlaceOnBoard() { return true; }
    static fromType(portType, partIndex, seaCoord, landCoord) {
        switch (portType) {
            case proto.PortType.CLAY2TO1: return new Clay2To1Port(partIndex, seaCoord);
            case proto.PortType.ORE2TO1: return new Ore2To1Port(partIndex, seaCoord);
            case proto.PortType.WHEAT2TO1: return new Wheat2To1Port(partIndex, seaCoord);
            case proto.PortType.TIMBER2TO1: return new Timber2To1Port(partIndex, seaCoord);
            case proto.PortType.SHEEP2TO1: return new Sheep2To1Port(partIndex, seaCoord);
            case proto.PortType.ANY3TO1: return new Any3To1Port(partIndex, seaCoord);
            case proto.PortType.ANY4TO1: return new Any4To1Port(partIndex, seaCoord);
            case proto.PortType.FROMBAG: return new FromBagPort(partIndex, seaCoord);
        }
    }
    static getHumanName(portType) {
        var portName = proto.PortType[portType];
        return Util.getPascalCasedName(portName);
    }
}
export class Clay2To1Port extends Port { 
    constructor(partIndex, seaCoord) {
        super(partIndex, seaCoord);
    }
    get color() { return 0xff0000; }   
    get type() { return proto.PortType.CLAY2TO1; } 
    get resourceType() { return proto.ResourceType.BRICK; }
    get inAmount() { return 2; }
    get outAmount() { return 1; }
}
export class Ore2To1Port extends Port { 
    constructor(partIndex, seaCoord) {
        super(partIndex, seaCoord);
    }
    get color() { return 0x8A2BE2; }
    get type() { return proto.PortType.ORE2TO1; } 
    get resourceType() { return proto.ResourceType.ORE; }
    get inAmount() { return 2; }
    get outAmount() { return 1; }
}
export class Sheep2To1Port extends Port { 
    constructor(partIndex, seaCoord) {
        super(partIndex, seaCoord);
    }
    get color() { return 0x00FF00; }        
    get type() { return proto.PortType.SHEEP2TO1; } 
    get resourceType() { return proto.ResourceType.SHEEP; }
    get inAmount() { return 2; }
    get outAmount() { return 1; }
}
export class Wheat2To1Port extends Port { 
    constructor(partIndex, seaCoord) {
        super(partIndex, seaCoord);
    }
    get color() { return 0xFFD700; }    
    get type() { return proto.PortType.WHEAT2TO1; } 
    get resourceType() { return proto.ResourceType.WHEAT; }
    get inAmount() { return 2; }
    get outAmount() { return 1; }
}
export class Timber2To1Port extends Port { 
    constructor(partIndex, seaCoord) {
        super(partIndex, seaCoord);
    }
    get color() { return 0x006400; }
    get type() { return proto.PortType.TIMBER2TO1; } 
    get resourceType() { return proto.ResourceType.TIMBER; }
    get inAmount() { return 2; }
    get outAmount() { return 1; }
}
export class Any3To1Port extends Port { 
    constructor(partIndex, seaCoord) {
        super(partIndex, seaCoord);
    }
    get color() { return 0xffffff; }
    get type() { return proto.PortType.ANY3TO1; } 
    get inAmount() { return 3; }
    get outAmount() { return 1; }
}
export class Any4To1Port extends Port { 
    constructor(partIndex, seaCoord) {
        super(partIndex, seaCoord);
    }
    get canPlaceOnBoard() { return false; }
    get type() { return proto.PortType.ANY4TO1; } 
    get inAmount() { return 4; }
    get outAmount() { return 1; }
}
/* Design-time port replaced on board-preparation time by a port from a bag */
export class FromBagPort extends Port {
    constructor(partIndex, seaCoord) {
        super(partIndex, seaCoord);
    }
    get color() { return 0xaaaaaa; }
    get type() { return proto.PortType.FROMBAG; } 
}
export class PortList {
    constructor(items) {
        if (items !== undefined) {
            this._list = [...items];
        } else {
            this._list = [];
        }
    }
    get items() { return this._list; }
    add(port) {
        this._list.push(port);
    }
    bestPortForResourceType(resourceType) {
        const rt = typeof(resourceType) === "string" ? proto.ResourceType[resourceType] : resourceType;
        var result = null;
        for (var port of this._list) {
            if (port.resourceType === undefined || port.resourceType === rt) {
                if (result === null || result.inAmount > port.inAmount) {
                    result = port;
                }
            }
        }
        return result;
    }
}