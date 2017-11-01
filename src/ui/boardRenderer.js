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
    }
}
class NodeRenderer {
    constructor(node, vgGrid) {
        this.node = node;
        this.vgGrid = vgGrid;
        this.mesh = null;

        var cilinderGeometry = new THREE.CylinderGeometry(3, 3, 1, 16);
        var edges = new THREE.EdgesGeometry(cilinderGeometry);
        var lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
        var material = new THREE.MeshBasicMaterial({color: 0xffff00});
        var cilinder = new THREE.Mesh(cilinderGeometry, material);
        cilinder.visible = false;
        cilinder.add(lines);
        var position = this.nodeToPixel(node);
        cilinder.position.set(position.x, position.y, position.z);
        this.mesh = cilinder;
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
}
/* Renders a 3D hexagon board using von-grid */
class BoardRenderer {
    constructor(element, board, behavior) {
        this.board = board || new Standard4pDesign();
        this._behavior = behavior || new SetHex();
        this.displayedNodes = [];
        this.nodesGroup = new THREE.Group();

        this.scene = new vg.Scene({
            element: element,
            cameraPosition: {x:0, y:150, z:150}
        }, true);
        // this constructs the cells in grid coordinate space
        this.vgGrid = new vg.HexGrid({
            cellSize: 11 // size of individual cells
        });
        this.vgGrid.generate({
            size: 3 // size of the board
        });

        this.mouse = new vg.MouseCaster(this.scene.container, this.scene.camera);
        this.vgBoard = new vg.Board(this.vgGrid);

        // this will generate extruded hexagonal tiles
        this.vgBoard.generateTilemap({
            tileScale: 0.96 // you might have to scale the tile so the extruded geometry fits the cell size perfectly
        });
        this.scene.add(this.vgBoard.group);
        this.scene.focusOn(this.vgBoard.group);

        var vec = new THREE.Vector3();

        this.hexRenderers = new Map(); // <Coord, HexRenderer>

        this.mouse.signal.add(function(evt, tile) {
            if (evt === vg.MouseCaster.CLICK) {
                var cell = this.vgBoard.grid.pixelToCell(this.mouse.position);
                var coord3D = new Coord3D(cell.q, cell.r, cell.s);
                var hex = this.board.hexes.get(coord3D);
                if (hex == null) {
                    // the board is rendering more hexes than underlaying domain board object
                    // has defined. 
                    return;                            
                }
                var tile = this.vgBoard.getTileAtCell(cell);
                if (tile) {
                    this.behavior.click(this, hex);
                }
            }
        }, this);

        this.update();

        for (var [coord, hex] of this.board.hexes) {
            var hexRenderer = new HexRenderer(hex)
            hexRenderer.render(this.vgGrid);
            this.hexRenderers.set(hex.coord, hexRenderer);
        }
        this.nodeRenderers = new Map();
        for (var node of this.board.getAllNodes()) {
            var nodeRenderer = new NodeRenderer(node, this.vgGrid);
            this.nodesGroup.add(nodeRenderer.mesh);
            this.nodeRenderers.set(node, nodeRenderer)
        }
        this.scene.add(this.nodesGroup);
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
        for (var nnode of nodes) {
            var nodeRenderer = this.nodeRenderers.get(nnode);
            nodeRenderer.mesh.visible = true;
        }
    }


    update() {
        this.mouse.update();
        this.scene.render();
        requestAnimationFrame(this.update.bind(this));
    }
}