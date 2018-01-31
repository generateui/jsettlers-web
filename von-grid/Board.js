/*
	Interface to the grid. Holds data about the visual representation of the cells (tiles).

	@author Corey Birnbaum https://github.com/vonWolfehaus/
 */
class vgBoard {
	constructor(grid) {
		this.tiles = [];
		this.tileGroup = null; // only for tiles
	
		this.group = new THREE.Object3D(); // can hold all entities, also holds tileGroup, never trashed
	
		this.grid = grid;
	
		this.tiles = [];
		this.tileGroup = new THREE.Object3D();
		this.group.add(this.tileGroup);
	}

	addTile(tile) {
		this.tiles.push(tile);

		this.snapTileToGrid(tile);
		tile.position.y = 0;

		this.tileGroup.add(tile.mesh);
		this.grid.add(tile.cell);

		tile.cell.tile = tile;
	}

	removeTile(tile) {
		if (!tile) return; // was already removed somewhere
		var i = this.tiles.indexOf(tile);
		this.grid.remove(tile.cell);

		if (i !== -1) this.tiles.splice(i, 1);
		// this.tileGroup.remove(tile.mesh);

		tile.dispose();
	}

	removeAllTiles() {
		if (!this.tileGroup) return;
		var tiles = this.tileGroup.children;
		for (var i = 0; i < tiles.length; i++) {
			this.tileGroup.remove(tiles[i]);
		}
	}

	snapTileToGrid(tile) {
		if (tile.cell) {
			tile.position.copy(this.grid.cellToPixel(tile.cell));
		}
		else {
			var cell = this.grid.pixelToCell(tile.position);
			tile.position.copy(this.grid.cellToPixel(cell));
		}
		return tile;
	}

	generateTilemap() {
		this.reset();

		var tiles = this.grid.generateTiles();
		this.tiles = tiles;

		this.tileGroup = new THREE.Object3D();
		for (var i = 0; i < tiles.length; i++) {
			this.tileGroup.add(tiles[i].mesh);
		}

		this.group.add(this.tileGroup);
	}

	reset() {
		// removes all tiles from the scene, but leaves the grid intact
		this.removeAllTiles();
		if (this.tileGroup) this.group.remove(this.tileGroup);
	}
}
