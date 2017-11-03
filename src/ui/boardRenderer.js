/** Renders a Hex onto a von-grid tile */
class HexRenderer {
    constructor(hex) {
        this.hex = hex;
    }
    render(grid) {
        var coord = this.hex.coord;
        var cell = new vg.Cell(coord.x, coord.y, coord.z);
        var color = new THREE.Color(this.hex.color);
        var hash = grid.cellToHash(cell);
        grid.cells[hash].tile.material.color = color;
        grid.cells[hash].tile.mesh.userData.structure = this;
        this.mesh = grid.cells[hash].tile.mesh;
    }
}

/** Renders a Node as a large yellow cilinder positioned at the Node
 * This renderer enables user selection of a node.
 */
class NodeRenderer {
    constructor(node, boardRenderer) {
        this.node = node;
        this.mesh = null;

        var cilinderGeometry = new THREE.CylinderGeometry(3, 3, 1, 16);
        var edges = new THREE.EdgesGeometry(cilinderGeometry);
        var lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
        var material = new THREE.MeshBasicMaterial({color: 0xffff00});
        var cilinder = new THREE.Mesh(cilinderGeometry, material);
        cilinder.visible = false;
        cilinder.add(lines);
        var position = boardRenderer.nodeToPixel(node);
        cilinder.position.set(position.x, position.y, position.z);
        this.mesh = cilinder;
        this.mesh.userData.structure = this;
    }
}

/** Renders a Node as a large yellow rectangular box positioned at given Edge */
class EdgeRenderer {
    constructor(edge, boardRenderer) {
        this.edge = edge;

        var boxGeometry = new THREE.BoxGeometry(8, 3, 3);
        var edgesGeometry = new THREE.EdgesGeometry(boxGeometry);
        var lines = new THREE.LineSegments(edgesGeometry, new THREE.LineBasicMaterial({ color: 0x000000 }));
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        var box = new THREE.Mesh(boxGeometry, material);
        box.add(lines);
        var radians = ((edge.rotation || 60)* Math.PI) / 180;
        box.rotateY(radians);
        box.visible = false;
        var position = boardRenderer.edgeToPixel(edge);
        box.position.set(position.x, position.y, position.z);
        this.mesh = box;
        this.mesh.userData.structure = this;
    }
}
/* Renders a 3D hexagon board using von-grid */
class BoardRenderer {
    constructor(element, board, behavior) {
        this.board = board || new Standard4pDesign();
        this._behavior = behavior || new SetHex();

        this.nodesGroup = new THREE.Group();
        this.edgesGroup = new THREE.Group();
        this.hexRenderers = new Map(); // <Coord, HexRenderer>
        this.nodeRenderers = new Map(); // <Node, NodeRenderer>
        this.edgeRenderers = new Map(); // <Edge, EdgeRenderer>
        
        this.scene = new vg.Scene({
            element: element,
            cameraPosition: {x:0, y:150, z:150}
        }, true);

        // TODO: use sparse maps instead
        // this constructs the cells in grid coordinate space
        this.vgGrid = new vg.HexGrid({
            cellSize: 11 // size of individual cells
        });
        this.vgGrid.generate({
            size: 3 // size of the board
        });

        this.vgBoard = new vg.Board(this.vgGrid);

        // this will generate extruded hexagonal tiles
        this.vgBoard.generateTilemap({
            tileScale: 0.96 // you might have to scale the tile so the extruded geometry fits the cell size perfectly
        });
        this.scene.add(this.vgBoard.group);
        this.scene.focusOn(this.vgBoard.group);

        for (var [coord, hex] of this.board.hexes) {
            var hexRenderer = new HexRenderer(hex)
            hexRenderer.render(this.vgGrid);
            this.hexRenderers.set(hex.coord, hexRenderer);
        }
        for (var node of this.board.getAllNodes()) {
            var nodeRenderer = new NodeRenderer(node, this);
            this.nodesGroup.add(nodeRenderer.mesh);
            this.nodeRenderers.set(node, nodeRenderer)
        }
        for (var edge of this.board.getAllEdges()) {
            var edgeRenderer = new EdgeRenderer(edge, this);
            this.edgesGroup.add(edgeRenderer.mesh);
            this.edgeRenderers.set(edge, edgeRenderer);
        }

        this.vgBoard.group.add(this.nodesGroup);
        this.vgBoard.group.add(this.edgesGroup);

        this.mouse = new vg.MouseCaster(this.scene.container, this.scene.camera, element);
        this.mouse.signal.add(function(event, target) {
            this.dirty = true;
            // target here is the userData supplied object set in Renderers
            // target: Renderer
            if (target === null || target === undefined) {
                return;
            }
            if (event === vg.MouseCaster.CLICK) {
                this.behavior.click(this, target);
            }
            if (event === vg.MouseCaster.OVER) {
                this.behavior.enter(this, target);
            }
            if (event === vg.MouseCaster.OUT) {
                this.behavior.leave(this, target);
            }
        }, this);

        this.dirty = true;
        this.update();
    }
    // TODO: don't hog resources by RAF-ing when dirty only
    update(timestamp) {
        if (this.dirty){
            window.requestAnimationFrame(this.update.bind(this));
        }
        this.mouse.update();
        this.scene.render();
}

    get behavior() { return this._behavior; }
    set behavior(newBehavior) {
        this._behavior.stop(this);
        this._behavior = newBehavior;
        this._behavior.start(this);
    }

    hideAllNodes() {
        this.nodesGroup.visible = false;
        this.dirty = true;
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
        this.dirty = true;
    }

    hideAllEdges() {
        this.edgesGroup.visible = false;
        this.dirty = true;
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
        this.dirty = true;
    }

    nodeToPixel(node) {
        // TODO: this code is a bit barfy.
        // TODO: cache
        var cell1 = new vg.Cell(node.coord1.x, node.coord1.y, node.coord1.z);
        var coord1Position = this.cellToPixel(cell1);

        var cell2 = new vg.Cell(node.coord2.x, node.coord2.y, node.coord2.z);
        var coord2Position = this.cellToPixel(cell2);

        var cell3 = new vg.Cell(node.coord3.x, node.coord3.y, node.coord3.z);
        var coord3Position = this.cellToPixel(cell3);
        // coordPosition is the center of a hex in world coordinates
        // the center of three world positions is the position of the node
        var centroidX = (coord1Position.x + coord2Position.x + coord3Position.x) / 3;
        var centroidZ = (coord1Position.z + coord2Position.z + coord3Position.z) / 3;
        return new THREE.Vector3(centroidX, 2, centroidZ);
    }

	cellToPixel(cell) {
        return new THREE.Vector3(
            cell.q * this.vgGrid._cellWidth * 0.75,
            cell.h,
            -((cell.s - cell.r) * this.vgGrid._cellLength * 0.5)
        );
    }
    edgeToPixel(edge) {
        var edge1Position = this.nodeToPixel(edge.node1);
        var edge2Position = this.nodeToPixel(edge.node2);
        var centroidX = (edge1Position.x + edge2Position.x) / 2;
        var centroidZ = (edge1Position.z + edge2Position.z) / 2;
        return new THREE.Vector3(centroidX, 3, centroidZ);
    }

}