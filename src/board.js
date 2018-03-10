var proto = require("../data_pb");

import {ObservableMap} from "./generic/observableMap.js"; 
import {Robber} from "./robber.js";
import {Chit} from "./chit.js";
import {Coord3D} from "./coord.js";
import {Edge} from "./edge.js";
import {Forest, WheatField, River, Sea, Mountain, Pasture, Desert, HexFromBag} from "./hex.js";
import {Any3To1Port, Clay2To1Port, Any4To1Port, FromBagPort, Ore2To1Port, Sheep2To1Port, Timber2To1Port, Wheat2To1Port} from "./port.js";

export class BoardDescriptor {
    constructor(config) {
        this.id = config.id; // integer
        this.name = config.name;
        this.author = config.author;
        this.createBoard = config.createBoard;
        
        // prevent Vue.js from altering this member
        Object.defineProperty(this, "createFunction", {configurable: false});
    }
}

export class Board {
    constructor(config) {
        this._config = config || {
            
             // all hexes on this board
             // each Hex is expected a valid .coord
            hexes: [],

             // a bag of hex types to pick from to replace HexFromBag hexes with
             // items may be 
             // 1. A Hex instance
             // 2. Array in form [int amount, () => CreateHex()]
             // e.g. [new Forest(), [3, () => new Mountain()]]
            hexBag: [],
            chitBag: [],
        };
        this._hexes = new ObservableMap(); // <Coord, Hex>
        this.robber = new Robber(Coord3D.center); // TODO: move to desert
        this.towns = new ObservableMap(); // <Node, Town>
        this.cities = new ObservableMap(); // <Node, City>
        this.roads = new ObservableMap(); // <Edge, Road>
        this.nodePieces = new ObservableMap(); // <Node, Piece> Piece = Town | City
        this.edgePieces = new Map(); // <Edge, Piece> Piece = Road | ??
        this.portsByNode = new Map();
        this.producersByNode = new Map(); // <Node, Producer>

        const c = Coord3D.center;
        const n1 = new Edge(c, c.neighbors[0]);
    }
    static create(id) {
        if (Board.factoryCache === undefined) {
            const cache = new Map();
            cache.set(Standard4pDesign.descriptor.id, Standard4pDesign.descriptor);
            cache.set(JustSomeSea.descriptor.id, JustSomeSea.descriptor);
            cache.set(TheGreatForest.descriptor.id, TheGreatForest.descriptor);
            Board.factoryCache = cache;
        }
        if (Board.factoryCache.has(id)) {
            const descriptor = Board.factoryCache.get(id);
            return descriptor.createBoard();
        }
        throw new Error(`Board with id [${id}] not found`);
    }
    /** normalize the config into a simple list of hex instances */
    static _flattenConfig(config) {
        const items = [];
        for (var item of config) {
            // expand config specification of hexes in hexBag
            // e.g. [new Forest(), [3, () => new Mountain()]]
            if (Array.isArray(item)) {
                var array = item;
                var amount = array[0];
                var createItemFunction = array[1];
                for (var i=0; i<amount; i++) {
                    var createdItem = createItemFunction();
                    items.push(createdItem);
                }
            } else { // a hex instance
                items.push(item);
            }
        }
        return items;
    }
    generateBoardForPlay() {
        const bagHexes = Board._flattenConfig(this._config.hexBag);
        const hexesToReplace = Array.from(this._hexes.values()).filter(h => h instanceof HexFromBag);
        var i = 0;
        while (i < hexesToReplace.length && bagHexes.length > 0) {
            const toReplace = hexesToReplace[i];
            const index = Math.floor(Math.random() * bagHexes.length);
            const pick = bagHexes[index];
            pick.coord = toReplace.coord;
            pick.port = toReplace.port;
            pick.chit = toReplace.chit;
            bagHexes.splice(index, 1);
            this.hexes.set(pick.coord, pick);
            i++;
        }
        const bagChits = Board._flattenConfig(this._config.chitBag);
        const hexesWithChitToReplace = Array.from(this._hexes.values()).filter(h => h.chit.type === proto.ChitType.CHITFROMBAG);
        var j = 0;
        while (j < hexesWithChitToReplace.length&& bagChits.length > 0) {
            const toReplace = hexesWithChitToReplace[j];
            if (!toReplace.canHaveChit) {
                toReplace.chit.type = proto.ChitType.CHITNONE;
                j++;
                continue;
            }
            const index = Math.floor(Math.random() * bagChits.length);
            const pick = bagChits[index];
            toReplace.chit = pick;
            bagChits.splice(index, 1);
            j++;
        }
        const bagPorts = Board._flattenConfig(this._config.portBag);
        const hexesWithPortToReplace = Array.from(this._hexes.values()).filter(h => h.port instanceof FromBagPort);
        var j = 0;
        while (j < hexesWithPortToReplace.length && bagPorts.length > 0) {
            const toReplace = hexesWithPortToReplace[j];
            const index = Math.floor(Math.random() * bagPorts.length);
            const pick = bagPorts[index];
            pick.partIndex = toReplace.port.partIndex;
            pick.seaCoord = toReplace.port.seaCoord;
            toReplace.port = pick;
            bagPorts.splice(index, 1);
            j++;
        }
        for (var hex of this._hexes.values()) {
            if (hex.port !== null) {
                const edge = hex.port.edge;
                this.portsByNode.set(edge.node1, hex.port);
                this.portsByNode.set(edge.node2, hex.port);
            }
        }
    }
    placeHexes() {
        for (var hex of this._config.hexes) {
            this._hexes.set(hex.coord, hex);
        }
    }
    getAllNodes() {
        var nodes = new Set();
        for (var hex of this._hexes.map.values()) {
            for (var node of hex.coord.nodes) {
                nodes.add(node);
            }
        }
        return nodes;
    }
    getAllEdges() {
        var edges = new Set();
        for (var hex of this._hexes.map.values()) {
            for (var edge of hex.coord.edges) {
                edges.add(edge);
            }
        }
        return edges;
    }
    getCoordsByRadius(radius) {
        if (radius === 0) {
            return new Set( [Coord3D.center] );
        }
        var aCoord = new Coord3D(0, radius, -radius);
        var coords = new Set();
        this.addNeighborsRecursively(coords, aCoord, c => c.radius === radius);
        return coords;
    }
    addNeighborsRecursively(coords, coord, shouldAdd) {
        if (shouldAdd(coord)) {
            coords.add(coord);
        }
        for (var neighbor of coord.neighbors) {
            if (!coords.has(neighbor) && shouldAdd(neighbor)) {
                this.addNeighborsRecursively(coords, neighbor, shouldAdd);
            }
        }
    }
    townPossibilities(player) {
        const possibilities = [];
        const edgePieces = Array.from(player.edgePieces.map.keys());
        const nodes = new Set(edgePieces.mapMany(ep => ep.nodes));
        for (let node of nodes) {
            const isNodeUsed = this.nodePieces.has(node);
            const anyNeighborUsed = 
                this.nodePieces.has(node.nodes[0]) ||
                this.nodePieces.has(node.nodes[1]) ||
                this.nodePieces.has(node.nodes[2]);
            if (!isNodeUsed && !anyNeighborUsed) {
                possibilities.push(node);
            }
        }
        return possibilities;
    }
    roadPossibilities(player) {
        const possibilities = [];
        if (player.nodePieces.length === 0) {
            return possibilities;
        }
        for (let edge of player.edgePieces.map.keys()) {
            const node1IsUsed = this.nodePieces.has(edge.node1);
            const opponentUsesNode1 = node1IsUsed && this.nodePieces.get(edge.node1).player !== player;
            const otherEdges1 = node.otherEdges(edge);
            if (!opponentUsesNode1 && !this.edgePieces.has(otherEdges1[0])) {
                possibilities.push(otherEdges1[0]);
            }
            if (!opponentUsesNode1 && !this.edgePieces.has(otherEdges1[1])) {
                possibilities.push(otherEdges1[1]);
            }
            const node2IsUsed = this.nodePieces.has(edge.node2);
            const opponentUsesNode2 = node2IsUsed && this.nodePieces.get(edge.node2).player !== player;
            const otherEdges2 = node.otherEdges(edge);
            if (!opponentUsesNode2 && !this.edgePieces.has(otherEdges2[0])) {
                possibilities.push(otherEdges2[0]);
            }
            if (!opponentUsesNode2 && !this.edgePieces.has(otherEdges2[1])) {
                possibilities.push(otherEdges2[1]);
            }
        }
        return possibilities;
    }
    get hexes() { return this._hexes; }
    setHex(coord, hex) {
        this._hexes[coord] = hex;
    }
}
export class JustSomeSea extends Board {
    constructor() {
        super();

        var coords = [
            ...super.getCoordsByRadius(0),
            ...super.getCoordsByRadius(1),
            ...super.getCoordsByRadius(2), 
        ];
        for (let coord of coords) {
            this._hexes.set(coord, new Sea(coord));
        }
    }
}
JustSomeSea.descriptor = new BoardDescriptor({
    id: 1,
    name: "Just some sea",
    author: "Ruud Poutsma",
    createBoard: function(config) { return new JustSomeSea() }
});
export class TheGreatForest extends Board {
    constructor() {
        super();

        var coords = [
            ...super.getCoordsByRadius(0),
            ...super.getCoordsByRadius(1),
            ...super.getCoordsByRadius(2), 
        ];
        for (let coord of coords) {
            if (coord == Coord3D.center) {
                this._hexes.set(coord, new WheatField(coord));
            } else {
                this._hexes.set(coord, new Forest(coord));
            }
        }
    }
}
TheGreatForest.descriptor = new BoardDescriptor({
    id: 2,
    name: "The great forest",
    author: "Ruud Poutsma",
    createBoard: function(config) { return new TheGreatForest() }
});

export class Standard4pDesign extends Board {
    constructor() {
        super();

        this._config = {
            hexes: this.generateHexes(),
            hexBag: [
                new Desert(),
                [4, () => new Forest()],
                [4, () => new WheatField()],
                [4, () => new Pasture()],
                [3, () => new Mountain()],
                [3, () => new River()],
            ],
            chitBag: [
                new Chit(proto.ChitType.CHIT2),
                [2, () => new Chit(proto.ChitType.CHIT3)],
                [2, () => new Chit(proto.ChitType.CHIT4)],
                [2, () => new Chit(proto.ChitType.CHIT5)],
                [2, () => new Chit(proto.ChitType.CHIT6)],
                [2, () => new Chit(proto.ChitType.CHIT8)],
                [2, () => new Chit(proto.ChitType.CHIT9)],
                [2, () => new Chit(proto.ChitType.CHIT10)],
                [2, () => new Chit(proto.ChitType.CHIT11)],
                new Chit(proto.ChitType.CHIT12),
            ],
            portBag: [
                new Clay2To1Port(),
                new Timber2To1Port(),
                new Ore2To1Port(),
                new Wheat2To1Port(),
                new Sheep2To1Port(),
                [4, () => new Any3To1Port()],
            ],
        };
        this.placeHexes();
        // super.generateBoardForPlay();
    }

    generateHexes() {
        var fromBagCoords = [
            ...super.getCoordsByRadius(0),
            ...super.getCoordsByRadius(1),
            ...super.getCoordsByRadius(2), 
        ];
        var seaCoords = super.getCoordsByRadius(3);
        var portsConfig = new Map();
        portsConfig.set(new Coord3D(0,   3, -3), 1);
        portsConfig.set(new Coord3D(2,   1, -3), 2);
        portsConfig.set(new Coord3D(3,  -1, -2), 2);
        portsConfig.set(new Coord3D(3,  -3,  0), 3);
        portsConfig.set(new Coord3D(1,  -3,  2), 4);
        portsConfig.set(new Coord3D(-1, -2,  3), 4);
        portsConfig.set(new Coord3D(-3,  0,  3), 5);
        portsConfig.set(new Coord3D(-3,  2 , 1), 0);
        portsConfig.set(new Coord3D(2,   3, -1), 0);
        var hexes = [];
        for (let coord of fromBagCoords) {
            var hex = new HexFromBag(coord);
            hex.chit = new Chit(proto.ChitType.CHITFROMBAG);
            hexes.push(hex);
        }
        for (let coord of seaCoords) {
            const sea = new Sea(coord);
            if (portsConfig.has(coord)) {
                const partIndex = portsConfig.get(coord);
                sea.port = new FromBagPort(partIndex, coord);
            }
            hexes.push(sea);
        }
        return hexes;
    }
    getRandomChit() {
        var index = this.getRandomIntInclusive(0, 11);
        return new Chit(index);
    }
    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }
}
Standard4pDesign.descriptor = new BoardDescriptor({
    id: 0,
    name: "Standard 4p",
    author: "Ruud Poutsma",
    createBoard: function(config) { return new Standard4pDesign() }
});