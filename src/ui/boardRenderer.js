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
/* Renders a 3D hexagon board using von-grid */
class BoardRenderer {
    constructor(element, board, behavior) {
        this.board = board || new Standard4pDesign();
        this.behavior = behavior || new SetHex();

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

        this.hexRenderers = new Map(); // <coord.hash, HexRenderer>

        this.mouse.signal.add(function(evt, tile) {
            if (evt === vg.MouseCaster.CLICK) {
                var cell = this.vgBoard.grid.pixelToCell(this.mouse.position);
                var coord3D = new Coord3D(cell.q, cell.r, cell.s);
                var hex = this.board.hexes.get(coord3D.hash);
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
            this.hexRenderers.set(hex.coord.hash, hexRenderer);
        }
    }

    update() {
        this.mouse.update();
        this.scene.render();
        requestAnimationFrame(this.update.bind(this));
    }
}