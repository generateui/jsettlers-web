var proto = require("../../data_pb");
import {EmphasizeHoveredObject, BoardBehavior} from "./boardBehavior.js";
import {Player, User} from "../player.js";
import {RobberRenderer} from "./webgl/robberRenderer.js";
import {ChitRenderer} from "./webgl/chitRenderer.js";
import {HexRenderer} from "./webgl/hexRenderer.js";
import {Hex} from "../hex.js";
import {Util} from "../util.js";
import {Road} from "../road.js";
import {Town} from "../town.js";
import {City} from "../city.js";

export class MoveRobber extends BoardBehavior {
    constructor() {
        super();
        this.emphasizeHoveredHex = new EmphasizeHoveredObject(r => r instanceof HexRenderer);
    }
    click(boardRenderer, renderer) {
        if (renderer instanceof HexRenderer) {
            const coord = renderer.hex.coord;
            boardRenderer.board.robber.coord = coord;
        }
    }
    enter(boardRenderer, renderer) {
        this.emphasizeHoveredHex.enter(boardRenderer, renderer);
        var all = Array.from(boardRenderer.board.hexes.values());
        var possible = all.filter(h => h.canHaveRobber);
        const robberHex = boardRenderer.board.hexes.get(boardRenderer.board.robber.coord);
        // possible = Util.except(possible, [robberHex]);
        boardRenderer.redifyHexes([robberHex]);
        const notPossible = Util.except(all, possible);
        boardRenderer.lightenHexes(possible);
        boardRenderer.darkenHexes(notPossible);
    }
    leave(boardRenderer, renderer) {
        this.emphasizeHoveredHex.leave(boardRenderer, renderer);
    }
    stop(boardRenderer) {
        boardRenderer.normalizeHexes(boardRenderer.board.hexes.values());
    }
}
export class BuildTown extends BoardBehavior {
    constructor() {
        super();
        this.player = new Player({color: 0xff0000});
        this.player.color = 0xff0000;
    }
    start(boardRenderer) {
        this.boardRenderer = boardRenderer;
        var nodes = boardRenderer.board.getAllNodes();
        boardRenderer.showNodes(nodes);
    }
    click(boardRenderer, renderer) {
        if (renderer instanceof NodeRenderer) {
            const node = renderer.node;
            this.boardRenderer.board.towns.set(node, new Town(this.player, node));
        }
    }
    stop(boardRenderer) {
        boardRenderer.hideAllNodes();
    }
}
export class BuildCity extends BoardBehavior {
    constructor() {
        super();
        this.player = new Player();
        this.player.color = 0xff0000;
    }
    start(boardRenderer) {
        this.boardRenderer = boardRenderer;
        var nodes = boardRenderer.board.getAllNodes();
        boardRenderer.showNodes(nodes);
    }
    click(boardRenderer, renderer) {
        if (renderer instanceof NodeRenderer) {
            const node = renderer.node;
            this.boardRenderer.board.cities.set(node, new City(this.player, node));
        }
    }
    stop(boardRenderer) {
        boardRenderer.hideAllNodes();
    }
}
export class BuildRoad extends BoardBehavior {
    constructor() {
        super();
        this.emphasizeHoveredObject = new EmphasizeHoveredObject();
        this.player = new Player();
        this.player.color = 0xff0000;
    }
    _showEdges() {
        var edges = this.boardRenderer.board.getAllEdges();
        var roadEdges = this.boardRenderer.board.roads.map.keys();
        var edgesToShow = Util.except(edges, roadEdges);
        this.boardRenderer.showEdges(edgesToShow);
    }
    start(boardRenderer) {
        this.boardRenderer = boardRenderer;
        this._showEdges();
    }
    click(boardRenderer, renderer) {
        if (renderer instanceof EdgeRenderer) {
            const edge = renderer.edge;
            this.boardRenderer.board.roads.set(edge, new Road(this.player, edge));
            this._showEdges();
        }
    }
    stop(boardRenderer) {
        boardRenderer.hideAllEdges();
    }
    enter(boardRenderer, renderer) {
        this.emphasizeHoveredObject.enter(boardRenderer, renderer);
    }
    leave(boardRenderer, renderer) {
        this.emphasizeHoveredObject.leave(boardRenderer, renderer);
    }
}