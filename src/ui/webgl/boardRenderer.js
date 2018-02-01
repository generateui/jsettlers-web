class Renderer {
    darken() {
        this.material.color = new THREE.Color(0x444444);
    }
    lighten() {
        this.material.color = new THREE.Color(0xffffff);
    }
    normalize() {
        this.material.color = new THREE.Color(0xdddddd);
    }
    redify() {
        this.material.color = new THREE.Color(0xff0000);
    }
}

/* Renders a 3D hexagon board using von-grid */
class BoardRenderer {
    constructor(element, board, behavior) {
        this.board = board || new Standard4pDesign();
        this._behavior = behavior || new SetHex();

		this.cellSize = 11; // size of the hexagon shape (radius)
		this._cellWidth = this.cellSize * 2;
		this._cellLength = (Math.SQRT3 * 0.5) * this._cellWidth;
		
		BoardRenderer.TWO_THIRDS = 2 / 3;

        this.removeChangedSubscription = this.board.hexes.changed((key, oldValue, newValue) => {
            var hexRenderer = this.hexRenderers.get(oldValue.coord);
            hexRenderer.hex = newValue;
        });

        this.removeTownAddedSubscription = this.board.towns.added((key, value) => {
            var townRenderer = new TownRenderer(this, value);
            this.townRenderers.set(value, townRenderer);
        })
        this.removeCityAddedSubscription = this.board.cities.added((key, value) => {
            var cityRenderer = new CityRenderer(this, value);
            this.cityRenderers.set(value, cityRenderer);
        })
        this.removeRoadAddedSubscription = this.board.roads.added((key, value) => {
            var roadRenderer = new RoadRenderer(this, value);
            this.roadRenderers.set(value, roadRenderer);
        })

		this.tileGroup = new THREE.Group();
        this.scene = new Scene(element);
        
        this.nodesGroup = new THREE.Group();
        this.edgesGroup = new THREE.Group();
        this.group = new THREE.Group();
        this.hexRenderers = new Map(); // <Coord, HexRenderer>
        this.nodeRenderers = new Map(); // <Node, NodeRenderer>
        this.edgeRenderers = new Map(); // <Edge, EdgeRenderer>
        this.townRenderers = new Map(); // <Node, Town>
        this.cityRenderers = new Map(); // <Node, City>
        this.roadRenderers = new Map(); // <Edge, Road>
        this.robberRenderer = new RobberRenderer(this, board.robber);
        this.portPickerRenderer = new PortPickerRenderer(this);
        this.group.add(this.portPickerRenderer.group);
        
        this.scene.scene.add(this.group);
        // this.scene.focusOn(this.group);

        for (var [coord, hex] of this.board.hexes) {
            var hexRenderer = new HexRenderer(this, hex, this.cellSize);
            this.hexRenderers.set(hex.coord, hexRenderer);
			this.tileGroup.add(hexRenderer.mesh);
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

        this.group.add(this.tileGroup);
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

        this.scene.startAnimating(30);
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

    addMesh(mesh) {
        this.scene.scene.add(mesh);
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
	}
}