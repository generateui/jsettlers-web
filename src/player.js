import {Observable} from "./generic/observable.js";
import {Util} from "./util.js";
import {Stock} from "./stock.js";
import {Resource, Timber, Wheat, Ore, Sheep, Brick, Gold, ResourceList} from "./resource.js";
import {DevelopmentCard, YearOfPlenty, Monopoly, Soldier, VictoryPoint, RoadBuilding} from "./developmentCard.js";
import {Any4To1Port, Any3To1Port, PortList, Wheat2To1Port, Sheep2To1Port, Port} from "./port.js";
import { ObservableMap } from "./generic/observableMap.js";
import { jsettlers as pb } from "../src/generated/data";
import { Town } from "./town.js";
import { City } from "./city.js";
import { Road } from "./road.js";

export class Player extends Observable {
    constructor(config) {
        super();

        config = config || {};

        this.id = config.id;
        this.color = config.color || 0x000000;
        this.user = config.user || new User();
        this.maxHandResources = 7;
        this.developmentCards = []; // TODO: ObservableArray
        this.playedDevelopmentCards = [];
        this.roadBuildingTokens = 0;
        this.victoryPoints = [];
        this.soldiers = [];
        this.routeLength = 0;
        this.stock = new Stock();
        this.ports = new PortList([new Any4To1Port()]);
        this.towns = new Map(); // <Node, Town>
        this.cities = new Map(); // <Node, City>
        this.roads = new Map(); // <Edge, Road>
        this.producers = new Map(); // <Node, Piece> (Piece = Town | City)
        this.nodePieces = new Map(); // <Node, Piece> (Piece = Town | City)
        this.edgePieces = new Map(); // <Edge, Piece> (Piece = Road)
        this.resources = new ResourceList();

        this.makeObservable(["user"]);
    }
    get victoryPointsCount() {
        let total = 0;
        for (let vp of this.victoryPoints) {
            total += vp.victoryPoints;
        }
        return total;
    }
    /** true if player can pay for given resources taking trades into account */
    canPayWith(resourceList) {
        const cost = resourceList;
        if (this.resources.hasAtLeast(cost)) {
            return true;
        }
        const amountGoldNeeded = resources.amountGoldNeeded(cost);
        const resourcesWithoutCost = new ResourceList(cost);
        resourcesWithoutCost.remove(cost);
        const amountGold = this.ports.amountGold(resourcesWithoutCost);
        return amountGold >= amountGoldNeeded;
    }
    static get colors() {
        if (Player._colors === undefined) {
            Player._colors = [Color.red, Color.green, Color.blue, Color.white, Color.brown, Color.orange];
        }
        return Player._colors;
    }
    get data() {
        const data = pb.Player.create({
            id: this.id,
            color: this.color,
            maxHandResources: this.maxHandResources,
            developmentCards: this.developmentCards.map(dc => dc.data),
            playedDevelopmentCards: this.playedDevelopmentCards.map(dc => dc.data),
            roadBuildingTokens: this.roadBuildingTokens,
            routeLength: this.routeLength,
            stock: this.stock.data,
            ports: this.ports.items.map(p => p.data),
            towns: Array.from(this.towns.values()).map(t => t.data),
            cities: Array.from(this.cities.values()).map(c => c.data),
            roads: Array.from(this.roads.values()).map(r => r.data),
            resources: this.resources.toResourceTypeArray(),
        });
        if (this.user !== null) {
            data.user = this.user.data;
        }
        return data;
    }
    static fromData(data, game) {
        var player = new Player();
        player.id = data.id;
        // game.getPlayerById cannot be called at this point as the player is 
        // not yet pushed to the game.players array, so create a mock
        const resolver = {
            getPlayerById: function(id) {
                return player;
            }
        }
        player.color = data.color;
        if (data.user) {
            player.user = User.fromData(data.user);
        } else {
            player.user = null;
        }
        player.maxHandResources = data.maxHandResources;
        player.developmentCards = data.developmentCards
            .map(dcd => DevelopmentCard.fromData(dcd, resolver));
        for (let pdcd of data.playedDevelopmentCards) {
            const dc = DevelopmentCard.fromData(pdcd, resolver);
            player.playedDevelopmentCards.push(dc);
            if (dc instanceof Soldier) {
                player.soldiers.push(dc);
            }
            if (dc instanceof VictoryPoint) {
                player.victoryPoints.push(dc);
            }
        }
        player.roadBuildingTokens = data.roadBuildingTokens;
        player.stock = Stock.fromData(data.stock);
        player.ports = new PortList(data.ports.map(pd => Port.fromData(pd)));
        player.routeLength = data.routeLength;
        for (let townData of data.towns) {
            const town = Town.fromData(townData);
            player.towns.set(town.node, town);
            town.player = player;
            player.victoryPoints.push(town);
            player.nodePieces.set(town.node, town);
            player.producers.set(town.node, town);
            game.board.towns.set(town.node, town);
            game.board.nodePieces.set(town.node, town);
            game.board.producersByNode.set(town.node, town);

        }
        for (let cityData of data.cities) {
            const city = City.fromData(cityData);
            player.cities.set(city.node, city);
            city.player = player;
            player.victoryPoints.push(city);
            player.nodePieces.set(city.node, city);
            player.producers.set(city.node, city);
            game.board.cities.set(city.node, city);
            game.board.nodePieces.set(city.node, city);
            game.board.producersByNode.set(city.node, city);
        }
        for (let roadData of data.roads) {
            const road = Road.fromData(roadData);
            player.roads.set(road.edge, road);
            road.player = player;
            player.edgePieces.set(road.edge, road);
            game.board.roads.set(road.edge, road);
            game.board.edgePieces.set(road.edge, road);
        }
        player.resources = new ResourceList(data.resources);
        return player;
    }
}
export class Color {
    constructor(integer, name) {
        this.integer = integer;
        this.name = name;
    }
    static get red() {
        if (Color._red === undefined) {
            Color._red = new Color(0xff0000, "Red");
        }
        return Color._red;
    }
    static get green() {
        if (Color._green === undefined) {
            Color._green = new Color(0x00ff00, "Green");
        }
        return Color._green;
    }
    static get blue() {
        if (Color._blue === undefined) {
            Color._blue = new Color(0x0000ff, "Blue");
        }
        return Color._blue;
    }
    static get white() {
        if (Color._white === undefined) {
            Color._white = new Color(0xbbbbbb, "White");
        }
        return Color._white;
    }
    static get brown() {
        if (Color._brown === undefined) {
            Color._brown = new Color(0xff0000, "Brown");
        }
        return Color._brown;
    }
    static get orange() {
        if (Color._orange === undefined) {
            Color._orange = new Color(0xff0000, "Orange");
        }
        return Color._orange;
    }
    /** returns color in #000000 format */
    get css() {
        if (this._cssString === undefined) {
            this._cssString = '#' + ('00000' + (this.integer | 0).toString(16)).substr(-6);
        }
        return this._cssString;
    }
    /** returns color in rgba(r, g, b, alpha) format */
    toCssRgba(alpha) {
        const r = (this.integer & 0xff0000) >> 16;
        const g = (this.integer & 0x00ff00) >> 8;
        const b = (this.integer & 0x0000ff);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
}
export class User {
    constructor(config) {
        config = config || {};

        this.name = config.name || "";
        this.id = config.id || 0;
    }
    static fromData(data) {
        return new User({
            id: data.id,
            name: data.name
        });
    }
    get data() {
        return pb.User.create({
            id: this.id,
            name: this.name
        });
    }
}