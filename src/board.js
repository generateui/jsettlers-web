class Board {
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
        };
        this._hexes = new Map(); // <Coord, Hex>
    }
    generateBoardForPlay() {
        this.hexBag = [];
        for (var hex of this._config.hexBag) {
            // expand config specification of hexes in hexBag
            if (Array.isArray(hex)) {
                var array = hex;
                var amount = array[0];
                var createHexFunction = array[1];
                for (var i=0; i<amount; i++){
                    var createdHex = createHexFunction();
                    this.hexBag.add(createdHex);
                }
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
        for (var hex of this._hexes.values()) {
            for (var node of hex.coord.nodes) {
                nodes.add(node);
            }
        }
        return nodes;
    }
    getAllEdges() {
        var edges = new Set();
        for (var hex of this._hexes.values()) {
            for (var edge of hex.coord.edges) {
                edges.add(edge);
            }
        }
        return edges;
    }
    get hexes() { return this._hexes; }
    setHex(coord, hex) {
        this._hexes[coord] = hex;
    }
}
class Standard4pDesign extends Board {
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
            ]
        };
        this.placeHexes();
    }

    generateHexes() {
        var fromBagCoords = [
            ...this.getCoordsByRadius(0),
            ...this.getCoordsByRadius(1),
            ...this.getCoordsByRadius(2), 
        ];
        var seaCoords = this.getCoordsByRadius(3);
        
        var hexes = [];
        for (var coord of fromBagCoords) {
            hexes.push(new HexFromBag(coord));
        }
        for (var coord of seaCoords) {
            hexes.push(new Sea(coord));
        }
        return hexes;
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
}
