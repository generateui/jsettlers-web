class Port {
    constructor(partIndex, seaCoord) {
        this.partIndex = partIndex;
        this.seaCoord = seaCoord;
    }
    get color() { return 0x0; }
    get canPlaceOnBoard() { return true; }
    static fromType(portType, partIndex, seaCoord, landCoord) {
        switch (portType) {
            case proto.carcattonne_data.PortType.CLAY2TO1: return new Clay2To1Port(partIndex, seaCoord);
            case proto.carcattonne_data.PortType.ORE2TO1: return new Ore2To1Port(partIndex, seaCoord);
            case proto.carcattonne_data.PortType.WHEAT2TO1: return new Wheat2To1Port(partIndex, seaCoord);
            case proto.carcattonne_data.PortType.TIMBER2TO1: return new Timber2To1Port(partIndex, seaCoord);
            case proto.carcattonne_data.PortType.SHEEP2TO1: return new Sheep2To1Port(partIndex, seaCoord);
            case proto.carcattonne_data.PortType.ANY3TO1: return new Any3To1Port(partIndex, seaCoord);
            case proto.carcattonne_data.PortType.ANY4TO1: return new Any4To1Port(partIndex, seaCoord);
            case proto.carcattonne_data.PortType.FROMBAG: return new FromBagPort(partIndex, seaCoord);
        }
    }
    static getHumanName(portType) {
        var portName = proto.carcattonne_data.PortType[portType];
        return Util.getPascalCasedName(portName);
    }
}
class Clay2To1Port extends Port { 
    constructor(partIndex, seaCoord) {
        super(partIndex, seaCoord);
    }
    get color() { return 0xff0000; }   
    get type() { return proto.carcattonne_data.PortType.Clay2To1; } 
}
class Ore2To1Port extends Port { 
    constructor(partIndex, seaCoord) {
        super(partIndex, seaCoord);
    }
    get color() { return 0x8A2BE2; }
}
class Sheep2To1Port extends Port { 
    constructor(partIndex, seaCoord) {
        super(partIndex, seaCoord);
    }
    get color() { return 0x00FF00; }        
}
class Wheat2To1Port extends Port { 
    constructor(partIndex, seaCoord) {
        super(partIndex, seaCoord);
    }
    get color() { return 0xFFD700; }    
}
class Timber2To1Port extends Port { 
    constructor(partIndex, seaCoord) {
        super(partIndex, seaCoord);
    }
    get color() { return 0x006400; }
}
class Any3To1Port extends Port { 
    constructor(partIndex, seaCoord) {
        super(partIndex, seaCoord);
    }
    get color() { return 0xffffff; }
}
class Any4To1Port extends Port { 
    constructor(partIndex, seaCoord) {
        super(partIndex, seaCoord);
    }
    get canPlaceOnBoard() { return false; }
}
/* Design-time port replaced on board-preparation time by a port from a bag */
class FromBagPort extends Port {
    constructor(partIndex, seaCoord) {
        super(partIndex, seaCoord);
    }
    get color() { return 0xaaaaaa; }
}