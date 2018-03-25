var proto = require("../src/generated/data_pb");

import {ObservableMap} from "./generic/observableMap"; 
import {Robber} from "./robber";
import {Chit} from "./chit";
import {Coord3D, Coord2D, Coord1D} from "./coord";
import {Edge} from "./edge";
import {Forest, WheatField, River, Sea, Mountain, Pasture, Desert, HexFromBag, NoneHex, Hex} from "./hex.js";
import {Any3To1Port, Clay2To1Port, Any4To1Port, FromBagPort, Ore2To1Port, Sheep2To1Port, Timber2To1Port, Wheat2To1Port, Port} from "./port.js";
import { Parser } from "./parser";
import { Node } from "./node";

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
    }
    static create(id) {
        if (Board.factoryCache === undefined) {
            const cache = new Map();
            cache.set(Standard4pDesign.descriptor.id, Standard4pDesign.descriptor);
            cache.set(JustSomeSea.descriptor.id, JustSomeSea.descriptor);
            cache.set(TheGreatForest.descriptor.id, TheGreatForest.descriptor);
            cache.set(From2DBoard.descriptor.id, From2DBoard.descriptor);
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
    getSeaCoord(edge) {
        if (this._hexes.get(edge.coord1) instanceof Sea) {
            return this._hexes.get(edge.coord1).coord;
        }
        if (this._hexes.get(edge.coord2) instanceof Sea) {
            return this._hexes.get(edge.coord2).coord;
        }
        return null;
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
        const nodePieces = this.nodePieces.map;
        const nodes = new Set(edgePieces.mapMany(ep => ep.nodes));
        for (let node of nodes) {
            const isNodeUsed = nodePieces.has(node);
            const anyNeighborUsed = 
                nodePieces.has(node.nodes[0]) ||
                nodePieces.has(node.nodes[1]) ||
                nodePieces.has(node.nodes[2]);
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
        const nodePieces = this.nodePieces.map;
        for (let edge of player.edgePieces.map.keys()) {
            const node1IsUsed = nodePieces.has(edge.node1);
            const opponentUsesNode1 = node1IsUsed && nodePieces.get(edge.node1).player !== player;
            const otherEdges1 = edge.node1.otherEdges(edge);
            if (!opponentUsesNode1 && !this.edgePieces.has(otherEdges1[0])) {
                possibilities.push(otherEdges1[0]);
            }
            if (!opponentUsesNode1 && !this.edgePieces.has(otherEdges1[1])) {
                possibilities.push(otherEdges1[1]);
            }
            const node2IsUsed = nodePieces.has(edge.node2);
            const opponentUsesNode2 = node2IsUsed && nodePieces.get(edge.node2).player !== player;
            const otherEdges2 = edge.node2.otherEdges(edge);
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
        portsConfig.set(new Coord3D(0,   3, -3), 4);
        portsConfig.set(new Coord3D(2,   1, -3), 3);
        portsConfig.set(new Coord3D(3,  -1, -2), 2);
        portsConfig.set(new Coord3D(3,  -3,  0), 2);
        portsConfig.set(new Coord3D(1,  -3,  2), 1);
        portsConfig.set(new Coord3D(-1, -2,  3), 1);
        portsConfig.set(new Coord3D(-3,  0,  3), 0);
        portsConfig.set(new Coord3D(-3,  2,  1), 0);
        portsConfig.set(new Coord3D(-2,  3, -1), 5);
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

export class From2DBoard extends Board {
    constructor(boardExpression) {
        super();

        var hexSetup = null;
        var chitSetup = null;
        var portSetup = null;
        for (let boardOption of boardExpression.boardOption()) {
            if (boardOption.hexSetup() !== null) {
                hexSetup = boardOption.hexSetup();
            }
            if (boardOption.chitSetup() !== null) {
                chitSetup = boardOption.chitSetup();
            }
            if (boardOption.portsSetup() !== null) {
                portSetup = boardOption.portsSetup();
            }
        }
        var maxRow = 0;
        var maxColumn = 0;
        var rowNumber = 0;
        var columnNumber = 0;
        var hexes = [];
        var coord2Ds = []; // index - 1 is coord1D
        for (let hexRow of hexSetup.hexRow()) {
            columnNumber = 0;
            var row = hexRow.oddHexRow() === null ? hexRow.evenHexRow() : hexRow.oddHexRow();
            for (let hexExpression of row.hex()) {
                const coord2D = new Coord2D(rowNumber, columnNumber);
                if (hexExpression.none() === null) { 
                    // only register coord2D and coord1D when we have a usable hex
                    coord2Ds.push(coord2D);
                }
                var hex = Hex.parse(hexExpression);
                hex.coord = coord2D; //set the coord2D now, convert later to coord3D
                hexes.push(hex);
                columnNumber += 1;
            }
            maxColumn = Math.max(maxColumn, columnNumber);
            rowNumber += 1;
        }
        var maxRow = rowNumber;
        let convert1DTo2D = new Convert1DTo2D(coord2Ds);
        let convert2DTo3D = new Convert2DTo3D(coord2Ds, maxRow, maxColumn);
        let convert1DTo3D = new Convert1DTo3D(convert1DTo2D, convert2DTo3D);
        this.convertTo3D = new ConvertTo3D(convert1DTo3D, convert2DTo3D);
        for (let hex of hexes) {
            if (hex instanceof NoneHex) {
                continue;
            }
            const coord2D = hex.coord;
            const coord3D = convert2DTo3D.convertCoord(coord2D);
            hex.coord = coord3D; // convert it to coord3D
            this._hexes.set(coord3D, hex);
        }

        rowNumber = 0;
        for (let chitRow of chitSetup.chitRow()) {
            columnNumber = 0;
            var row = chitRow.oddChitRow() === null ? chitRow.evenChitRow() : chitRow.oddChitRow();
            for (let chitExpression of row.chit()) {
                let chit = Chit.parse(chitExpression);
                const coord2D = new Coord2D(rowNumber, columnNumber);
                const coord3D = this.convertTo3D.convertCoord(coord2D);
                if (this._hexes.map.has(coord3D)) {
                    this._hexes.get(coord3D).chit = chit;
                }
                columnNumber += 1;
            }
            rowNumber += 1;
        }
        const ports = [];
        for (let portAtEdge of portSetup.portAtEdge()) {
            const portExpression = portAtEdge.port();
            var port = Port.parse(portExpression);

            const edgeExpression = portAtEdge.edge();
            const edge = Edge.parse(edgeExpression);
            const edge3D = this.convertTo3D.convertEdge(edge);
            const seaCoord = this.getSeaCoord(edge3D);

            if (seaCoord === null) {
                console.log(`port at edge ${edge2D.toString()} does not have a sea hex`);
                continue;
            }
            port.seaCoord = seaCoord;
            port.partIndex = Edge.partIndexFromEdge(edge3D, seaCoord);
            ports.push(port);
        }
        for (let port of ports) {
            this._hexes.get(port.seaCoord).port = port;
        }
    }
}
From2DBoard.descriptor = new BoardDescriptor({
    id: 4,
    name: "Expression",
    author: "Ruud Poutsma",
    createBoard: function(config) { return new From2DBoard() }
});

/** converts a Coord, Edge or Node from one dimension to another */
class Converter {
    convertCoord(coord) {}
    convertEdge(edge) {}
    convertNode(node) {}
}
class ConvertTo3D extends Converter {
    constructor(convert1DTo3D, convert2DTo3D) {
        super();

        this.convert1DTo3D = convert1DTo3D;
        this.convert2Dto3D = convert2DTo3D;
    }
    convertCoord(coord) {
        if (coord instanceof Coord1D) {
            return this.convert1DTo3D.convertCoord(coord);
        }
        if (coord instanceof Coord2D) {
            return this.convert2Dto3D.convertCoord(coord);
        }
        if (coord instanceof Coord3D) {
            return coord;
        }
    }
    convertEdge(edge) {
        if (edge.coord1 instanceof Coord1D) {
            return this.convert1DTo3D.convertEdge(edge);
        }
        if (edge.coord1 instanceof Coord2D) {
            return this.convert2DTo3D.convertEdge(edge);
        }
        if (edge.coord1 instanceof Coord3D) {
            return edge;
        }
    }
    convertNode(node) {
        if (node.coord1 instanceof Coord1D) {
            return this.convert1DTo3D.convertNode(node);
        }
        if (node.coord1 instanceof Coord2D) {
            return this.convert2DTo3D.convertNode(node);
        }
        if (node.coord1 instanceof Coord3D) {
            return node;
        }
    }
}
class Convert1DTo3D extends Converter {
    constructor(convert1DTo2D, convert2DTo3D) {
        super();
        
        this.convert1DTo2D = convert1DTo2D;
        this.convert2Dto3D = convert2DTo3D;
    }
    convertCoord(coord1D) {
        const coord2D = this.convert1DTo2D.convertCoord(coord1D);
        const coord3D = this.convert2Dto3D.convertCoord(coord2D);
        return coord3D;
    }
    convertEdge(edge1D) {
        const coord3D1 = this.convertCoord(edge1D.coord1);
        const coord3D2 = this.convertCoord(edge1D.coord2);
        return new Edge(coord3D1, coord3D2);
    }
    convertNode(node1D) {
        const coord3D1 = this.convertCoord(node1D.coord1);
        const coord3D2 = this.convertCoord(node1D.coord2);
        const coord3D3 = this.convertCoord(node1D.coord3);
        return new Node(coord3D1, coord3D2, coord3D3);
    }
}
class Convert2DTo3D extends Converter {
    constructor(coord2Ds, maxRow, maxColumn) {
        super();

        this.coord3DsByCoord2D = new Map(); // <Coord2D, Coord3D>
        var rowCompensation = Math.floor(maxRow / 2);
        var columnCompensation = Math.floor(maxColumn / 2);
        const q = rowCompensation % 2;
        rowCompensation = rowCompensation % 2 == 0 ? rowCompensation : rowCompensation - 1;
        for (let coord2D of coord2Ds) {
            // minus: compensate for backwards rendering
            const r = -(coord2D.r - rowCompensation);
            const c = -(coord2D.c - columnCompensation);
            const z = c - (r + (r & 1)) / 2;
            const x = r + q;
            const y = -x - z;
            const coord3D = new Coord3D(x, y, z);
            this.coord3DsByCoord2D.set(coord2D, coord3D);
        }
    }
    convertCoord(coord2D) {
        const coord3D = this.coord3DsByCoord2D.get(coord2D);
        return coord3D;
    }
    convertEdge(edge2D) {
        var coord3D1 = this.coord3DsByCoord2D.get(edge2D.coord1);
        var coord3D2 = this.coord3DsByCoord2D.get(edge2D.coord2);
        return new Edge(coord3D1, coord3D2);
    }
    convertNode(node2D) {
        var coord3D1 = this.coord3DsByCoord2D.get(node2D.coord1);
        var coord3D2 = this.coord3DsByCoord2D.get(node2D.coord2);
        var coord3D3 = this.coord3DsByCoord2D.get(node2D.coord3);
        return new Node(coord3D1, coord3D2, coord3D3);
    }
}
class Convert1DTo2D extends Converter {
    constructor(coord2DsByCoord1D) { // Coord2D[], index is id of Coord1D
        super();

        this.coord2DsByCoord1D = coord2DsByCoord1D;
    }
    convertCoord(coord1D) {
        return this.coord2DsByCoord1D[coord1D.id - 1]; // arrays are 0-based
    }
    convertEdge(edge1D) {
        var coord2D1 = this.coord2DsByCoord1D[edge1D.coord1];
        var coord2D2 = this.coord2DsByCoord1D[edge1D.coord2];
        return new Edge(coord2D1, coord2D2);
    }
    convertNode(node1D) {
        var coord2D1 = this.coord2DsByCoord1D.get(node1D.coord1);
        var coord2D2 = this.coord2DsByCoord1D.get(node1D.coord2);
        var coord2D3 = this.coord2DsByCoord1D.get(node1D.coord3);
        return new Node(coord2D1, coord2D2, coord2D3);
    }
}