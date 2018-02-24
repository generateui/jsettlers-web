/* A behavior dictates how a board responds to user interaction.
*
* A behavior operates on an abstracted Renderer. Renderers can be implemented
* on any UI implementation technique: WebGL, canvas, svg, DOM, text-based, ...
* A behavior is not aware of the underlying UI implementation. Instead, it operates
* on a defined interface for the renderers. For instance, to show all the edges
* of a board, the `.showEdges()` method is called on a BoardRenderer. The BoardRenderer
* instance then takes care to update his rendering to show the edges.
*/
var proto = require("../../data_pb");
import {Player, User} from "../player.js";
import {RobberRenderer} from "./webgl/robberRenderer.js";
import {ChitRenderer} from "./webgl/chitRenderer.js";
import {HexRenderer} from "./webgl/hexRenderer.js";
import {PortRenderer} from "./webgl/portRenderer.js";
import {NodeRenderer} from "./webgl/nodeRenderer.js";
import {EdgeRenderer} from "./webgl/edgeRenderer.js";
import {CityRenderer} from "./webgl/cityRenderer.js";
import {TownRenderer} from "./webgl/townRenderer.js";
import {RoadRenderer} from "./webgl/roadRenderer.js";
import {PortPickerRenderer} from "./webgl/portPickerRenderer.js";
import {HexPartRenderer} from "./webgl/hexPartRenderer.js";
import {Hex} from "../hex.js";
import {Chit} from "../chit.js";
import {Port} from "../port.js";
import {Util} from "../util.js";
import {Road} from "../road.js";
import {Town} from "../town.js";
import {City} from "../city.js";
import {Edge} from "../edge.js";

export class BoardBehavior {
    start(boardRenderer) {} // set the behavior as active behavior on the BoardRenderer
    click(boardRenderer, renderer) { }
    enter(boardRenderer, renderer) { }
    leave(boardRenderer, renderer) { }
    stop(boardRenderer) {} // unset the behavior & cleanup any resources/handlers
}
/** Don't respond to any user input at all */
export class NoBehavior extends BoardBehavior { }
/* Sets a hex to target clicked hexagon location */
export class SetHex extends BoardBehavior {
    constructor() {
        super();
        // the hextype to use for the setted hex
        this.hexType = proto.HexType.FOREST; 
    }
    click(boardRenderer, renderer) {
        var hex = renderer.hex;
        if (hex === undefined) {
            return;
        }
        // create and set the new hex to the board
        var newHex = Hex.fromType(this.hexType)
        newHex.coord = hex.coord;
        boardRenderer.board.hexes.set(hex.coord, newHex);
    }
}
export class SetChit extends BoardBehavior {
    constructor() {
        super();
        this.composite = new EmphasizeHoveredObject(r => r.chit !== undefined || r.hex !== undefined);
        this.chitType = proto.ChitType.HEXFROMBAG;
    }
    click(boardRenderer, renderer) {
        if (renderer instanceof ChitRenderer) {
            const hex = boardRenderer.board.hexes.get(renderer.coord);
            hex.chit = new Chit(this.chitType);
        }
        if (renderer instanceof HexRenderer) {
            renderer.hex.chit = new Chit(this.chitType);
        }
    }
    start(boardRenderer) {
        this.composite.start(boardRenderer);
    }
    enter(boardRenderer, renderer) {
        this.composite.enter(boardRenderer, renderer);
    }
    leave(boardRenderer, renderer) {
        this.composite.leave(boardRenderer, renderer);
    }
    stop(boardRenderer) {
        this.composite.stop(boardRenderer);
    }
}
/** Shows all the nodes of all the hexes of the board */
export class ShowAllNodes extends BoardBehavior {
    start(boardRenderer) {
        var nodes = boardRenderer.board.getAllNodes();
        boardRenderer.showNodes(nodes);
    }
    stop(boardRenderer) {
        boardRenderer.hideAllNodes();
    }
}
/** Shows all nodes of clicked hex */
export class ShowNodesOfClickedHex extends BoardBehavior {
    constructor() {
        super();
    }
    start(boardRenderer) {
        boardRenderer.hideAllNodes();
    }
    click(boardRenderer, renderer) {
        if (renderer.hex === undefined) {
            return;
        }
        var nodes = renderer.hex.coord.nodes;
        boardRenderer.showNodes(nodes);
    }
    stop(boardRenderer) {
        boardRenderer.hideAllNodes();
    }
}

export class ShowAllEdges extends BoardBehavior {
    start(boardRenderer) {
        var allEdges = boardRenderer.board.getAllEdges();
        boardRenderer.showEdges(allEdges);
    }
    stop(boardRenderer) {
        boardRenderer.hideAllEdges();
    }
}
export class ShowEdgesOfClickedHex extends BoardBehavior {
    start(boardRenderer) {
        boardRenderer.hideAllEdges();
    }
    click(boardRenderer, renderer) {
        var edges = renderer.hex.coord.edges;
        boardRenderer.showEdges(edges);
    }
    stop(boardRenderer) {
        boardRenderer.hideAllEdges();
    }
}
export class ShowEdgesOfClickedNode extends BoardBehavior {
    constructor() {
        super();
        let isNodeRenderer = r => r.node !== undefined;
        this.composite = new CompositeBehavior(
            new ShowAllNodes(), 
            new EmphasizeHoveredObject(isNodeRenderer));
    }
    start(boardRenderer) {
        this.composite.start(boardRenderer);
    }
    enter(boardRenderer, renderer) {
        this.composite.enter(boardRenderer, renderer);
    }
    leave(boardRenderer, renderer) {
        this.composite.leave(boardRenderer, renderer);
    }
    click(boardRenderer, renderer) {
        if (renderer.node === undefined) {
            return;
        }
        var edges = renderer.node.edges;
        boardRenderer.showEdges(edges);
    }
    stop(boardRenderer) {
        this.composite.stop(boardRenderer);
    }
}
/** Changes color of hovered object */
export class EmphasizeHoveredObject extends BoardBehavior {
    constructor(rendererFilter) { // a function: bool filter(renderer);
        super();
        this._rendererFilter = rendererFilter || function(r) { return true; };
    }
    enter(boardRenderer, renderer) {
        if (!this._rendererFilter(renderer)) {
            return;
        }
        renderer.darken();
    }
    leave(boardRenderer, renderer) {
        if (!this._rendererFilter(renderer)) {
            return;
        }
        renderer.normalize();
    }
}
/** Dispatches behavior onto given behaviors */
export class CompositeBehavior extends BoardBehavior {
    constructor(...behaviors) {
        super();
        this.behaviors = behaviors;
    }
    start(boardRenderer) {
        for (var behavior of this.behaviors) {
            behavior.start(boardRenderer);
        }
    }
    stop(boardRenderer) {
        for (var behavior of this.behaviors) {
            behavior.stop(boardRenderer);
        }
    }
    click(boardRenderer, renderer) {
        for (var behavior of this.behaviors) {
            behavior.click(boardRenderer, renderer);
        }
    }
    enter(boardRenderer, renderer) {
        for (var behavior of this.behaviors) {
            behavior.enter(boardRenderer, renderer);
        }
    }
    leave(boardRenderer, renderer) {
        for (var behavior of this.behaviors) {
            behavior.leave(boardRenderer, renderer);
        }
    }
}
export class SetPort {
    constructor() {
        this.selectedHexPartRenderer = null;
        this.selectedHexRenderer = null;
        this._portType = proto.PortType.Clay2To1;
    }
    get portType() {
        return this._portType;
    }
    set portType(portType) {
        this._portType = portType;
        this.portPickerRenderer.portType = this.portType;
    }
    start(boardRenderer) {
        this.portPickerRenderer = boardRenderer.portPickerRenderer;
        boardRenderer.portPickerRenderer.visible = true;
    }
    stop(boardRenderer) {
        boardRenderer.portPickerRenderer.visible = false;
    }
    click(boardRenderer, renderer) {
        if (this.selectedHexRenderer != null) {
            var newPort = Port.fromType(this.portType, this.selectedHexPartRenderer.partIndex, this.selectedHexRenderer.hex.coord);
            this.selectedHexRenderer.hex.port = newPort;
        }
    }
    enter(boardRenderer, renderer) {
        if (renderer instanceof HexRenderer) {
            boardRenderer.portPickerRenderer.visible = renderer.hex.canHavePort;
            boardRenderer.portPickerRenderer.hex = renderer.hex;
            this.selectedHexRenderer = renderer;
        }
        if (renderer instanceof HexPartRenderer) {
            this.selectedHexPartRenderer = renderer;
            this.selectedHexPartRenderer.hovered = true;
        }
    }
    leave(boardRenderer, renderer) {
        if (this.selectedHexPartRenderer != null) {
            this.selectedHexPartRenderer.hovered = false;
            this.selectedHexPartRenderer = null;
        }
    }
}

export class RemoveHex extends BoardBehavior {
    click(boardRenderer, renderer) {
        if (renderer instanceof HexRenderer) {
            boardRenderer.board.hexes.delete(renderer.hex.coord);
        }
        if (renderer instanceof ChitRenderer) {
            boardRenderer.board.hexes.delete(renderer.coord);
        }
        if (renderer instanceof PortRenderer) {
            boardRenderer.board.hexes.delete(renderer.port.seaCoord);
        }
    }
}
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
    constructor(player) {
        super();
        this.player = player || new Player({color: 0xff0000});
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
        this.emphasizeHoveredObject = new EmphasizeHoveredObject(r => r instanceof EdgeRenderer);
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
