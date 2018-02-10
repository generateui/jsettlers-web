import {Observable} from "./generic/observable.js";
import {Util} from "./util.js";
import {Resource, Timber, Wheat, Ore, Sheep, Brick, Gold, ResourceList} from "./resource.js";
import {DevelopmentCard, YearOfPlenty, Monopoly, Soldier, VictoryPoint, RoadBuilding} from "./developmentCard.js";
var proto = require("../data_pb");

export class Player extends Observable {
    constructor(config) {
        super();

        config = config || {};

        this.color = config.color || 0x000000;
        this.user = config.user || new User();
        this.maxHandResources = 7;
        this.developmentCards = [
            new Soldier(), new YearOfPlenty(), new Monopoly(), new VictoryPoint(), new RoadBuilding()
        ]; // TODO: ObseravbleArray
        this.resources = [{}, {}, {}, {}, {}, {}, {}, {}];
        this.victoryPoints = [{},{},{}];
        this.towns = new Map(); // <Node, Town>
        this.cities = new Map(); // <Node, City>
        this.roads = new Map(); // <Edge, Road>
        this.victoryPoints = []; // <Edge, Road>
        // this.resources = [new Timber(),new Timber(),new Timber(),new Timber(),new Timber(),new Wheat(),new Wheat(),new Brick()];
        this.resources = new ResourceList(); // <ResourceType, Resources[]>
        this.resources[proto.ResourceType.TIMBER] =  [new Timber(), new Timber(), new Timber()];
        this.resources[proto.ResourceType.WHEAT] = [new Wheat(), new Wheat()];
        this.resources[proto.ResourceType.ORE] = [new Ore(), new Ore()];
        this.resources[proto.ResourceType.SHEEP] = [new Sheep(), new Sheep()];
        this.resources[proto.ResourceType.BRICK] = [new Brick(), new Brick()];
        this.resources[proto.ResourceType.GOLD] = [new Gold(), new Gold()];

        this.makeObservable(["user"]);
    }
}
export class User {
    constructor(config) {
        config = config || {};

        this.name = config.name || "";
        this.color = config.color || null;
        this.id = config.id || 0;
    }
}