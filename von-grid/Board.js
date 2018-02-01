/*
	Interface to the grid. Holds data about the visual representation of the cells (tiles).

	@author Corey Birnbaum https://github.com/vonWolfehaus/
 */
class vgBoard {
	constructor(grid) {
		this.tileGroup = null; // only for tiles
	
		this.group = new THREE.Object3D(); // can hold all entities, also holds tileGroup, never trashed
	
		this.grid = grid;
	
		this.tilesByCoord = new Map(); // <Cell, Tile>
		this.tileGroup = new THREE.Object3D();
		this.group.add(this.tileGroup);
	}

	addTile(tile) {
		this.tilesByCoord.set(tile.coord, tile);

		this.snapTileToGrid(tile);
		tile.position.y = 0;

		this.tileGroup.add(tile.mesh);
		this.grid.add(tile.coord);
	}

	removeTile(tile) {
		if (!tile) return; // was already removed somewhere
		var i = this.tilesByCoord.indexOf(tile);
		this.grid.remove(tile.coord);

		this.tilesByCoord.delete(tile.coord);

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
		if (tile.coord) {
			tile.position.copy(this.grid.coordToPixel(tile.coord));
		}
		else {
			var coord = this.grid.pixelToCell(tile.position);
			tile.position.copy(this.grid.coordToPixel(coord));
		}
		return tile;
	}

	generateTilemap() {
		this.reset();

		var tiles = this.grid.generateTiles();
		for (var tile of tiles) {
			this.tilesByCoord.set(tile.coord, tile);
		}

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
