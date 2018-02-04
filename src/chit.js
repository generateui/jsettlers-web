var proto = require("../data_pb");

export class Chit {
    constructor(type) {
        this.type = type;
    }
    get number() {
        switch(this.type) {
            case proto.ChitType.CHIT2: return 2;
            case proto.ChitType.CHIT3: return 3;
            case proto.ChitType.CHIT4: return 4;
            case proto.ChitType.CHIT5: return 5;
            case proto.ChitType.CHIT6: return 6;
            case proto.ChitType.CHIT8: return 8;
            case proto.ChitType.CHIT9: return 9;
            case proto.ChitType.CHIT10: return 10;
            case proto.ChitType.CHIT11: return 11;
            case proto.ChitType.CHIT12: return 12;
        }
        return null;
    }
}