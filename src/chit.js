import { jsettlers as pb } from "../src/generated/data";

export class Chit {
    constructor(type) {
        this.type = type;
    }
    get number() {
        switch(this.type) {
            case pb.ChitType.Chit2: return 2;
            case pb.ChitType.Chit3: return 3;
            case pb.ChitType.Chit4: return 4;
            case pb.ChitType.Chit5: return 5;
            case pb.ChitType.Chit6: return 6;
            case pb.ChitType.Chit8: return 8;
            case pb.ChitType.Chit9: return 9;
            case pb.ChitType.Chit10: return 10;
            case pb.ChitType.Chit11: return 11;
            case pb.ChitType.Chit12: return 12;
        }
        return null;
    }
    static parse(chitExpression) {
        if (chitExpression.NUMBER() !== null) {
            const number = parseInt(chitExpression.NUMBER());
            var chit = Chit.fromNumber(number);
            if (chit === null) {
                return new Chit(pb.ChitType.ChitNone);
            }
            return chit;
        } else if(chitExpression.chitFromBag() !== null) {
            return new Chit(pb.ChitType.ChitFromBag);
        } else {
            return new Chit(pb.ChitType.ChitNone);
        }
    }
    static fromNumber(number) {
        switch(number) {
            case 2: return new Chit(pb.ChitType.Chit2);
            case 3: return new Chit(pb.ChitType.Chit3);
            case 4: return new Chit(pb.ChitType.Chit4);
            case 5: return new Chit(pb.ChitType.Chit5);
            case 6: return new Chit(pb.ChitType.Chit6);
            case 8: return new Chit(pb.ChitType.Chit8);
            case 9: return new Chit(pb.ChitType.Chit9);
            case 10: return new Chit(pb.ChitType.Chit10);
            case 11: return new Chit(pb.ChitType.Chit11);
            case 12: return new Chit(pb.ChitType.Chit12);
        }
        return null;
    }
}