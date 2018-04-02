import { jsettlers as pb } from "../src/generated/data";
import {Edge} from "./edge.js";

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
    divide(resources, resourceType) {
        return Math.floor(resources.of(resourceType).length / this.inAmount);
    }
    static parse(portExpression) {
        if (portExpression.any3To1Port() !== null) { return new Any3To1Port(); }
        if (portExpression.any4To1Port() !== null) { return new Any4To1Port(); }
        if (portExpression.fromBagPort() !== null) { return new FromBagPort(); }
        
        if (portExpression.timber2To1Port() !== null) { return new Timber2To1Port(); }
        if (portExpression.wheat2To1Port() !== null) { return new Wheat2To1Port(); }
        if (portExpression.ore2To1Port() !== null) { return new Ore2To1Port(); }
        if (portExpression.brick2To1Port() !== null) { return new Clay2To1Port(); }
        if (portExpression.sheep2To1Port() !== null) { return new Sheep2To1Port(); }
        return null;
    }
    static fromType(portType, partIndex, seaCoord, landCoord) {
        switch (portType) {
            case pb.PortType.Clay2To1: return new Clay2To1Port(partIndex, seaCoord);
            case pb.PortType.Ore2To1: return new Ore2To1Port(partIndex, seaCoord);
            case pb.PortType.Wheat2To1: return new Wheat2To1Port(partIndex, seaCoord);
            case pb.PortType.Timber2To1: return new Timber2To1Port(partIndex, seaCoord);
            case pb.PortType.Sheep2To1: return new Sheep2To1Port(partIndex, seaCoord);
            case pb.PortType.Any3To1: return new Any3To1Port(partIndex, seaCoord);
            case pb.PortType.Any4To1: return new Any4To1Port(partIndex, seaCoord);
            case pb.PortType.FromBag: return new FromBagPort(partIndex, seaCoord);
        }
    }
}
export class Clay2To1Port extends Port { 
    constructor(partIndex, seaCoord) {
        super(partIndex, seaCoord);
    }
    get color() { return 0xff0000; }   
    get type() { return pb.PortType.Clay2To1; } 
    get resourceType() { return pb.ResourceType.Brick; }
    get inAmount() { return 2; }
    get outAmount() { return 1; }
    get name() { return "Clay2To1Port"; }
}
export class Ore2To1Port extends Port { 
    constructor(partIndex, seaCoord) {
        super(partIndex, seaCoord);
    }
    get color() { return 0x8A2BE2; }
    get type() { return pb.PortType.Ore2To1; } 
    get resourceType() { return pb.ResourceType.Ore; }
    get inAmount() { return 2; }
    get outAmount() { return 1; }
    get name() { return "Ore2To1Port"; }
}
export class Sheep2To1Port extends Port { 
    constructor(partIndex, seaCoord) {
        super(partIndex, seaCoord);
    }
    get color() { return 0x00FF00; }        
    get type() { return pb.PortType.Sheep2To1; } 
    get resourceType() { return pb.ResourceType.Sheep; }
    get inAmount() { return 2; }
    get outAmount() { return 1; }
    get name() { return "Sheep2To1Port"; }
}
export class Wheat2To1Port extends Port { 
    constructor(partIndex, seaCoord) {
        super(partIndex, seaCoord);
    }
    get color() { return 0xFFD700; }
    get type() { return pb.PortType.Wheat2To1; } 
    get resourceType() { return pb.ResourceType.Wheat; }
    get inAmount() { return 2; }
    get outAmount() { return 1; }
    get name() { return "Wheat2To1Port"; }
}
export class Timber2To1Port extends Port {
    constructor(partIndex, seaCoord) {
        super(partIndex, seaCoord);
    }
    get color() { return 0x006400; }
    get type() { return pb.PortType.Timber2To1; } 
    get resourceType() { return pb.ResourceType.Timber; }
    get inAmount() { return 2; }
    get outAmount() { return 1; }
    get name() { return "Timber2To1Port"; }
}
export class Any3To1Port extends Port {
    constructor(partIndex, seaCoord) {
        super(partIndex, seaCoord);
    }
    get color() { return 0xffffff; }
    get type() { return pb.PortType.Any3To1; }
    get inAmount() { return 3; }
    get outAmount() { return 1; }
    get name() { return "Any3To1Port"; }
}
export class Any4To1Port extends Port {
    constructor(partIndex, seaCoord) {
        super(partIndex, seaCoord);
    }
    get canPlaceOnBoard() { return false; }
    get type() { return pb.PortType.Any4To1; }
    get inAmount() { return 4; }
    get outAmount() { return 1; }
    get name() { return "Any4To1Port"; }
}
/* Design-time port replaced on board-preparation time by a port from a bag */
export class FromBagPort extends Port {
    constructor(partIndex, seaCoord) {
        super(partIndex, seaCoord);
    }
    get color() { return 0xaaaaaa; }
    get type() { return pb.PortType.FromBag; } 
    get name() { return "FromBagPort"; }
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
        const rt = typeof(resourceType) === "string" ? pb.ResourceType[resourceType] : resourceType;
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
    amountGold(resources) {
        let total = 0;
        for (let resourceType of resources.types) {
            if (resources.of(resourceType).length === 0) {
                break;
            }
            const port = this.bestPortForResourceType(resourceType);
            total += port.divide(resources, resourceType);
        }
        return total;
    }
}