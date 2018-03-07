var proto = require("../data_pb");
import {Coord} from "./coord.js";
import { ResourceList, Resource } from "./resource";
import { MoveRobber } from "./actions/moveRobber";
import { RobPlayer } from "./actions/robPlayer";
import { MoveRobberThenRobPlayer, BuildTwoRoads } from "./expectation";

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
        return developmentCard;
    }
    // calling super.property does not work in es6
    _getData() {
        const data = new proto.DevelopmentCard();
        data.setPlayerId(this.player.id);
        data.setTurnBoughtIndex(this.turnBoughtIndex);
        data.setTurnPlayedIndex(this.turnPlayedIndex);
        return data;
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
    get data() {
        const data = super._getData();
        const yop = new proto.YearOfPlenty();
        yop.setResourceType1(this.resourceType1);
        yop.setResourceType2(this.resourceType2);
        data.setYearOfPlenty(yop);
        return data;
    }
    play(game, player) {
        player.resources.add(this.resourceType1);
        player.resources.add(this.resourceType2);
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
    get data() {
        const monopoly = new proto.Monopoly();
        monopoly.setResourceType(this.resourceType);
        const data = super._getData();
        data.setMonopoly(monopoly);
        return data;
    }
    play(game, player) {
        for (var opponent of game.getOpponents(player)) {
            const resourcesOfType = opponent.resources.of(this.resourceType);
            const toMove = new ResourceList(resourcesOfType);
            player.resources.moveFrom(opponent.resources, toMove);
        }
    }
    get name() { return "Monopoly"; }
}
export class Soldier extends DevelopmentCard {
    constructor() {
        super();
        this.coord = null;
    }
    static fromData(data) {
        return new Soldier();
    }
    get data() {
        const soldier = new proto.Soldier();
        const data = super._getData();
        data.setSoldier(soldier);
        return data;
    }
    play(game, player) {
        game.expectation = new MoveRobberThenRobPlayer(game);
        player.soldiers.push(this);
        if (game.largestArmy.player === null && player.soldiers.length === 3) {
            game.largestArmy.player = player;
            player.victoryPoints.push(game.largestArmy);
            return;
        }
        if (game.largestArmy.player !== null) {
            if (player.soldiers.length > game.largestArmy.player.soldiers.length) {
                game.largestArmy.player.victoryPoints.remove(game.largestArmy);
                game.largestArmy.player = player;
                player.victoryPoints.push(game.largestArmy);
                return;
            }
        }
    }
    get name() { return "Soldier"; }
}
export class VictoryPoint extends DevelopmentCard {
    constructor() {
        super();
        this.victoryPoints = 1;
    }
    play(game, player) {
        player.victoryPoints.push(this);
    }
    get data() { 
        const vp = new proto.VictoryPoint();
        const data = super._getData();
        data.setVictoryPoint(vp);
        return data;
    }
    get name() { return "VictoryPoint"; }
}
export class RoadBuilding extends DevelopmentCard {
    constructor() {
        super();
    }
    play(game, player) {
        player.roadBuildingTokens += 2;
        game.expectation = new BuildTwoRoads(game);
    }
    get data() { 
        const roadBuilding = new proto.RoadBuilding();
        const data = super._getData();
        data.setRoadBuilding(roadBuilding);
        return data;
    }
    get name() { return "RoadBuilding"; }
}