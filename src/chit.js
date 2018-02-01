class Chit {
    constructor(type) {
        this.type = type;
    }
    get number() {
        switch(this.type) {
            case proto.carcattonne_data.ChitType.CHIT2: return 2;
            case proto.carcattonne_data.ChitType.CHIT3: return 3;
            case proto.carcattonne_data.ChitType.CHIT4: return 4;
            case proto.carcattonne_data.ChitType.CHIT5: return 5;
            case proto.carcattonne_data.ChitType.CHIT6: return 6;
            case proto.carcattonne_data.ChitType.CHIT8: return 8;
            case proto.carcattonne_data.ChitType.CHIT9: return 9;
            case proto.carcattonne_data.ChitType.CHIT10: return 10;
            case proto.carcattonne_data.ChitType.CHIT11: return 11;
            case proto.carcattonne_data.ChitType.CHIT12: return 12;
        }
        return null;
    }
}