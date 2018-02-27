import {Scene} from "./scene.js";
import {RobberRenderer} from "./robberRenderer.js";
import {ChitRenderer} from "./chitRenderer.js";
import {HexRenderer} from "./hexRenderer.js";
import {PortRenderer} from "./portRenderer.js";
import {NodeRenderer} from "./nodeRenderer.js";
import {EdgeRenderer} from "./edgeRenderer.js";
import {CityRenderer} from "./cityRenderer.js";
import {TownRenderer} from "./townRenderer.js";
import {RoadRenderer} from "./roadRenderer.js";
import {PortPickerRenderer} from "./portPickerRenderer.js";
import {MouseCaster} from "../../../von-grid/MouseCaster.js";
import {NoBehavior} from "../boardBehavior.js";
import {Standard4pDesign} from "../../board.js";

/* Renders a 3D hexagon board using von-grid */
export class BoardRenderer {
    constructor(element, board, behavior, handleBehavior) {
        this.board = board || new Standard4pDesign();
        this._behavior = behavior || new NoBehavior();

		this.cellSize = 11; // size of the hexagon shape (radius)
		this._cellWidth = this.cellSize * 2;
		this._cellLength = (Math.SQRT3 * 0.5) * this._cellWidth;
		
		BoardRenderer.TWO_THIRDS = 2 / 3;

		this.tilesGroup = new THREE.Group();
        this.scene = new Scene(element);
        
        this.nodesGroup = new THREE.Group();
        this.edgesGroup = new THREE.Group();
        this.group = new THREE.Group();
        this.hexRenderers = new Map(); // <Coord, HexRenderer>
        this.nodeRenderers = new Map(); // <Node, NodeRenderer>
        this.edgeRenderers = new Map(); // <Edge, EdgeRenderer>
        this.townRenderers = new Map(); // <Node, TownRenderer>
        this.cityRenderers = new Map(); // <Node, CityRenderer>
        this.roadRenderers = new Map(); // <Edge, RoadRenderer>
        this.robberRenderer = new RobberRenderer(this, this.board.robber);
        this.portPickerRenderer = new PortPickerRenderer(this);
        this.group.add(this.portPickerRenderer.group);
        
        this.scene.scene.add(this.group);

        this.group.add(this.tilesGroup);
        this.group.add(this.edgesGroup);
        this.group.add(this.nodesGroup);

        this.scene.mouse.signal.add(function(event, target) {
            // target here is the userData supplied object set in Renderers
            if (target === null || target === undefined) {
                return;
            }
            if (event === MouseCaster.CLICK) {
                this.behavior.click(this, target);
            }
            if (event === MouseCaster.OVER) {
                this.behavior.enter(this, target);
            }
            if (event === MouseCaster.OUT) {
                this.behavior.leave(this, target);
            }
        }, this);

        this.initialize();
        this.scene.startAnimating(30);
    }
    initialize() {
        this.scene.paused = true;

        this.removeChangedSubscription = this.board.hexes.changed((key, oldValue, newValue) => {
            var hexRenderer = this.hexRenderers.get(oldValue.coord);
            hexRenderer.hex = newValue;
        });
        this.removeDeletedSubscription = this.board.hexes.deleted(key => {
            var hexRenderer = this.hexRenderers.get(key);
            this.tilesGroup.remove(hexRenderer.mesh);
            this.hexRenderers.delete(key);
            hexRenderer.dispose();
        });
        this.removeTownDeletedSubscription = this.board.towns.deleted(key => {
            const townRenderer = this.townRenderers.get(key);
            this.townRenderers.delete(key);
            townRenderer.dispose();
        });

        for (var [coord, hex] of this.board.hexes.map) {
            var hexRenderer = new HexRenderer(this, hex, this.cellSize);
            this.hexRenderers.set(hex.coord, hexRenderer);
			this.tilesGroup.add(hexRenderer.mesh);
        }
        // TODO: we probably want to make this lazy
        for (var node of this.board.getAllNodes()) {
            var nodeRenderer = new NodeRenderer(node, this);
            this.nodesGroup.add(nodeRenderer.mesh);
            this.nodeRenderers.set(node, nodeRenderer)
        }
        // TODO: we probably want to make this lazy
        for (var edge of this.board.getAllEdges()) {
            var edgeRenderer = new EdgeRenderer(edge, this);
            this.edgesGroup.add(edgeRenderer.mesh);
            this.edgeRenderers.set(edge, edgeRenderer);
        }
        this.removeTownAddedSubscription = this.board.towns.added((key, value) => {
            var townRenderer = new TownRenderer(this, value);
            this.townRenderers.set(key, townRenderer);
        });
        this.removeCityAddedSubscription = this.board.cities.added((key, value) => {
            var cityRenderer = new CityRenderer(this, value);
            this.cityRenderers.set(key, cityRenderer);
        });
        this.removeRoadAddedSubscription = this.board.roads.added((key, value) => {
            var roadRenderer = new RoadRenderer(this, value);
            this.roadRenderers.set(key, roadRenderer);
        });

        this.scene.paused = false;
    }
    setBoard(board) {
        this.reset();
        this.board = board;
        this.initialize();
    }
    reset() {
        // https://stackoverflow.com/questions/33152132
        this.removeChangedSubscription();
        this.removeDeletedSubscription();

        this.disposeRenderers(this.hexRenderers, this.tilesGroup);
        this.disposeRenderers(this.nodeRenderers, this.nodesGroup);
        this.disposeRenderers(this.edgeRenderers, this.edgesGroup);
        this.disposeRenderers(this.townRenderers, this.scene.scene);
        this.disposeRenderers(this.cityRenderers, this.scene.scene);
        this.disposeRenderers(this.roadRenderers, this.scene.scene);
        this.removeTownAddedSubscription();
        this.removeCityAddedSubscription();
        this.removeRoadAddedSubscription();
    }

    disposeRenderers(renderers, group) {
        for (var renderer of renderers.values()) {
            group.remove(renderer.mesh);
            renderer.dispose();
        }
        renderers.clear();
    }

    lightenHexes(hexes) {
        for (var hex of hexes) {
            const renderer = this.hexRenderers.get(hex.coord);
            renderer.lighten();
        }
    }
    darkenHexes(hexes) {
        for (var hex of hexes) {
            const renderer = this.hexRenderers.get(hex.coord);
            renderer.darken();
        }
    }
    normalizeHexes(hexes) {
        for (var hex of hexes) {
            const renderer = this.hexRenderers.get(hex.coord);
            renderer.normalize();
        }
    }
    redifyHexes(hexes) {
        for (var hex of hexes) {
            const renderer = this.hexRenderers.get(hex.coord);
            renderer.redify();
        }
    }

    async animateLongestRoad(edges) {
        const timer = ms => new Promise(result => setTimeout(result, ms));
        const scale = 1.5;
        for (let edge of edges) {
            const roadRenderer = this.roadRenderers.get(edge);
            roadRenderer.mesh.scale.set(scale, scale, scale);
        }
        await timer(2000);
        for (let edge of edges) {
            const roadRenderer = this.roadRenderers.get(edge);
            roadRenderer.mesh.scale.set(1,1,1);
        }
    }

    addMesh(mesh) {
        this.scene.scene.add(mesh);
    }
    removeMesh(mesh) {
        this.scene.scene.remove(mesh);
    }

    get behavior() { return this._behavior; }
    set behavior(newBehavior) {
        this._behavior.stop(this);
        this._behavior = newBehavior;
        this._behavior.start(this);
    }

    hideAllNodes() {
        this.nodesGroup.visible = false;
    }
    showNodes(nodes) {
        this.nodesGroup.visible = true;
        for (var [node, nodeRenderer] of this.nodeRenderers) {
            nodeRenderer.mesh.visible = false;
        }
        for (var node of nodes) {
            var nodeRenderer = this.nodeRenderers.get(node);
            nodeRenderer.mesh.visible = true;
        }
    }

    hideAllEdges() {
        this.edgesGroup.visible = false;
    }
    showEdges(edges) {
        this.edgesGroup.visible = true;
        for (var [edge, edgeRenderer] of this.edgeRenderers) {
            edgeRenderer.mesh.visible = false;
        }
        for (var edge of edges) {
            var edgeRenderer = this.edgeRenderers.get(edge);
            edgeRenderer.mesh.visible = true;
        }
    }

    nodeToPixel(node) {
        // TODO: cache
        var coord1Position = this.coordToPixel(node.coord1);
        var coord2Position = this.coordToPixel(node.coord2);
        var coord3Position = this.coordToPixel(node.coord3);
        // coordPosition is the center of a hex in world coordinates
        // the center of three world positions is the position of the node
        var centroidX = (coord1Position.x + coord2Position.x + coord3Position.x) / 3;
        var centroidZ = (coord1Position.z + coord2Position.z + coord3Position.z) / 3;
        return new THREE.Vector3(centroidX, 2, centroidZ);
    }

    edgeToPixel(edge) {
        var edge1Position = this.nodeToPixel(edge.node1);
        var edge2Position = this.nodeToPixel(edge.node2);
        var centroidX = (edge1Position.x + edge2Position.x) / 2;
        var centroidZ = (edge1Position.z + edge2Position.z) / 2;
        return new THREE.Vector3(centroidX, 3, centroidZ);
    }

	// coord to position in pixels/world
	coordToPixel(coord) {
		const x = coord.x * this._cellWidth * 0.75;
		const y = 1;
		const z = -((coord.z - coord.y) * this._cellLength * 0.5);
		return new THREE.Vector3(x, y, z);
	}

	pixelToCell(pos) {
		// convert a position in world space ("pixels") to cell coordinates
		var q = pos.x * (BoardRenderer.TWO_THIRDS / this.cellSize);
		var r = ((-pos.x / 3) + (Math.SQRT3/3) * pos.z) / this.cellSize;
		var s = -q-r;

		var rx = Math.round(q);
		var ry = Math.round(r);
		var rz = Math.round(s);

		var xDiff = Math.abs(rx - q);
		var yDiff = Math.abs(ry - r);
		var zDiff = Math.abs(rz - s);

		if (xDiff > yDiff && xDiff > zDiff) {
			rx = -ry-rz;
		} else if (yDiff > zDiff) {
			ry = -rx-rz;
		} else {
			rz = -rx-ry;
		}
		return new Coord3D(rx, ry, rz);
	}

	distance(coord1, coord2) {
		return Math.max(Math.abs(coord1.x - coord2.x), Math.abs(coord1.y - coord2.y), Math.abs(coord1.z - coord2.z));
	}

	dispose() {
        this._behavior.stop(this);
        this._behavior = null;
        this.reset();

        this.robberRenderer.dispose();
        this.robberRenderer = null;
        this.group.remove(this.portPickerRenderer.group);
        this.portPickerRenderer.dispose();
        
        this.hexRenderers = null; // <Coord, HexRenderer>
        this.nodeRenderers = null; // <Node, NodeRenderer>
        this.edgeRenderers = null; // <Edge, EdgeRenderer>
        this.townRenderers = null; // <Node, Town>
        this.cityRenderers = null; // <Node, City>
        this.roadRenderers = null; // <Edge, Road>

        this.nodesGroup = null;
        this.edgesGroup = null;
        this.group = null;
        this.board = null;
        this.tilesGroup = null;
        this.scene.dispose();
        this.scene = null;
	}
}