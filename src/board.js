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
        this._hexes = new ObservableMap(); // <Coord, Hex>
        this.robber = new Robber(Coord3D.center);
        this.towns = new ObservableMap(); // <Node, Town>
        this.cities = new ObservableMap(); // <Node, City>
        this.roads = new ObservableMap(); // <Edge, Road>
    }
    generateBoardForPlay() {
        this.hexBag = [];
        for (var hex of this._config.hexBag) {
            // expand config specification of hexes in hexBag
             // e.g. [new Forest(), [3, () => new Mountain()]]
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
        for (let coord of fromBagCoords) {
            var hex = new HexFromBag(coord);
            hex.chit = new Chit(proto.carcattonne_data.ChitType.CHITFROMBAG);
            // hex.chit = this.getRandomChit();
            hexes.push(hex);
        }
        for (let coord of seaCoords) {
            hexes.push(new Sea(coord));
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
