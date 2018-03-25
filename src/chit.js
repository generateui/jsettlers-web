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
    static parse(chitExpression) {
        if (chitExpression.NUMBER() !== null) {
            const number = parseInt(chitExpression.NUMBER());
            var chit = Chit.fromNumber(number);
            if (chit === null) {
                return new Chit(proto.ChitType.CHITNONE);
            }
            return chit;
        } else if(chitExpression.chitFromBag() !== null) {
            return new Chit(proto.ChitType.CHITFROMBAG);
        } else {
            return new Chit(proto.ChitType.CHITNONE);
        }
    }
    static fromNumber(number) {
        switch(number) {
            case 2: return new Chit(proto.ChitType.CHIT2);
            case 3: return new Chit(proto.ChitType.CHIT3);
            case 4: return new Chit(proto.ChitType.CHIT4);
            case 5: return new Chit(proto.ChitType.CHIT5);
            case 6: return new Chit(proto.ChitType.CHIT6);
            case 8: return new Chit(proto.ChitType.CHIT8);
            case 9: return new Chit(proto.ChitType.CHIT9);
            case 10: return new Chit(proto.ChitType.CHIT10);
            case 11: return new Chit(proto.ChitType.CHIT11);
            case 12: return new Chit(proto.ChitType.CHIT12);
        }
        return null;
    }
}