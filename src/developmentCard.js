var proto = require("../data_pb");
import {Coord} from "./coord.js";

export class DevelopmentCard {
    static fromData(data) {
        var developmentCard = null;
        if (data.hasMonopoly()) {
            developmentCard = Monopoly.fromData(data.getMonopoly());
        } else if (data.hasYearOfPlenty()) {
            developmentCard = YearOfPlenty.fromData(data.getYearOfPlenty());
        } else if (data.hasSoldier()) {
            developmentCard = Soldier.fromData(data.getSoldier());
        } else if (data.hasRoadBuilding()) {
            developmentCard = new RoadBuilding();
        } else if (data.hasVictoryPoint()) {
            developmentCard = new VictoryPoint();
        }
        developmentCard.playerId = data.getPlayerId();
        developmentCard.turnBoughtIndex = data.getTurnBoughtIndex();
        developmentCard.turnPlayedIndex = data.getTurnPlayedIndex();
    }
}
export class YearOfPlenty extends DevelopmentCard {
    constructor() {
        super();
        this.resourceType1 = null;
        this.resourceType2 = null;
    }
    static fromData(data) {
        const yop = new YearOfPlenty();
        yop.resourceType1 = data.getResourceType1();
        yop.resourceType2 = data.getResourceType2();
        return yop;
    }
    get name() { return "YearOfPlenty"; }
}
export class Monopoly extends DevelopmentCard {
    constructor() {
        super();
        this.resourceType = null;
    }
    static fromData(data) {
        const monopoly = new Monopoly();
        monopoly.resourceType = data.getResourceType();
        return monopoly;
    }
    get name() { return "Monopoly"; }
}
export class Soldier extends DevelopmentCard {
    constructor() {
        super();
    }
    static fromData(data) {
        const soldier = new Soldier();
        soldier.coord = Coord.fromData(data.getCoord());
        return soldier;
    }
    get name() { return "Soldier"; }
}
export class VictoryPoint extends DevelopmentCard {
    constructor() {
        super();
    }
    get name() { return "VictoryPoint"; }
}
export class RoadBuilding extends DevelopmentCard {
    constructor() {
        super();
    }
    get name() { return "RoadBuilding"; }
}