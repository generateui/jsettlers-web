import { jsettlers as pb } from "../src/generated/data";
import { Coord } from "./coord.js";
import { ResourceList, Resource } from "./resource";
import { MoveRobber } from "./actions/moveRobber";
import { RobPlayer } from "./actions/robPlayer";
import { MoveRobberThenRobPlayer, BuildTwoRoads } from "./expectation";

export class DevelopmentCard {
    constructor() {
        this.id = DevelopmentCard.nextId();
        this.turnPlayedIndex = null;
        this.player = null;
        this.turnBoughtIndex = null;
    }
    static fromData(data, game) {
        var developmentCard = null;
        if (data.monopoly) {
            developmentCard = Monopoly.fromData(data.monopoly);
        } else if (data.yearOfPlenty) {
            developmentCard = YearOfPlenty.fromData(data.yearOfPlenty);
        } else if (data.soldier) {
            developmentCard = new Soldier();
        } else if (data.roadBuilding) {
            developmentCard = new RoadBuilding();
        } else if (data.victoryPoint) {
            developmentCard = new VictoryPoint();
        }
        if (data.playerId !== undefined) {
            developmentCard.player = game.getPlayerById(data.playerId);
        }
        if (data.turnBoughtIndex) {
            developmentCard.turnBoughtIndex = data.turnBoughtIndex;
        }
        if (data.turnPlayedIndex) {
            developmentCard.turnPlayedIndex = data.turnPlayedIndex;
        }
        return developmentCard;
    }
    static parse(developmentCardExpression, resolver) {
        const expr = developmentCardExpression;
        const player = resolver.parsePlayer(expr.player());
        if (expr.monopoly() !== null) { return new Monopoly({ player: player }); }
        if (expr.soldier() !== null) { return new Soldier({ player: player }); }
        if (expr.yearOfPlenty() !== null) { return new YearOfPlenty({ player: player }); }
        if (expr.roadBuilding() !== null) { return new RoadBuilding({ player: player }); }
        if (expr.victoryPoint() !== null) { return new VictoryPoint({ player: player }); }
        return null;
    }
    static nextId() {
        if (Resource.currentId === undefined) {
            Resource.currentId = 0;
        }
        Resource.currentId++;
        return Resource.currentId;
    }
    // calling super.property does not work in es6
    _getData() {
        const data = pb.DevelopmentCard.create({ });
        if (this.turnBoughtIndex !== null) {
            data.turnBoughtIndex = this.turnBoughtIndex;
        }
        if (this.turnPlayedIndex !== null) {
            data.turnPlayedIndex = this.turnPlayedIndex;
        }
        if (this.player !== null) {
            data.playerId = this.player.id;
        }
        return data;
    }
    static get cost() {
        return new ResourceList([
            pb.ResourceType.Wheat,
            pb.ResourceType.Ore,
            pb.ResourceType.Sheep,
        ]);
    }
    get maxOnePerTurn() {
        return true;
    }
}
export class YearOfPlenty extends DevelopmentCard {
    constructor(config) {
        super();

        config = config || {};
        this.player = config.player || null;
        this.resourceType1 = config.resourceType1;
        this.resourceType2 = config.resourceType2;
        if (this.resourceType1 !== undefined && this.resourceType2 !== undefined) {
            this.resourceList = new ResourceList([this.resourceType1, this.resourceType2]);
        }
        this.resourceList = null;
    }
    static fromData(data) {
        return new YearOfPlenty({
            resourceType1: data.resourceType1,
            resourceType2: data.resourceType2
        });
    }
    get data() {
        const data = super._getData();
        data.yearOfPlenty = {
            resourceType1: this.resourceType1,
            resourceType2: this.resourceType2
        }
        return data;
    }
    play(game, player) {
        player.resources.add(this.resourceType1);
        player.resources.add(this.resourceType2);
    }
    get name() { return "YearOfPlenty"; }
}
export class Monopoly extends DevelopmentCard {
    constructor(config) {
        super();

        config = config || {};
        this.player = config.player || null;
        this.resourceType = config.resourceType;
        this.stolen = config.stolen || null;
    }
    static fromData(data) {
        return new Monopoly({ resourceType: data.resourceType });
    }
    get data() {
        const data = super._getData();
        data.monopoly = {
            resourceType: this.resourceType
        }
        return data;
    }
    play(game, player) {
        const stolen = new ResourceList();
        for (var opponent of game.getOpponents(player)) {
            const resourcesOfType = opponent.resources.of(this.resourceType);
            const toMove = new ResourceList(resourcesOfType);
            player.resources.moveFrom(opponent.resources, toMove);
            stolen.add(toMove);
        }
        this.stolen = stolen;
    }
    get name() { return "Monopoly"; }
}
export class Soldier extends DevelopmentCard {
    constructor(config) {
        super();

        config = config || {};
        this.player = config.player || null;
    }
    get data() {
        const data = super._getData();
        data.soldier = {};
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
    constructor(config) {
        super();

        config = config || {};
        this.player = config.player || null;
        this.victoryPoints = 1;
    }
    play(game, player) {
        player.victoryPoints.push(this);
    }
    get data() { 
        const data = super._getData();
        data.victoryPoint = {};
        return data;
    }
    get name() { return "VictoryPoint"; }
    get maxOnePerTurn() { return false; }
}
export class RoadBuilding extends DevelopmentCard {
    constructor(config) {
        super();

        config = config || {};
        this.player = config.player || null;
    }
    play(game, player) {
        player.roadBuildingTokens += 2;
        game.expectation = new BuildTwoRoads(game);
    }
    get data() { 
        const data = super._getData();
        data.roadBuilding = {};
        return data;
    }
    get name() { return "RoadBuilding"; }
}