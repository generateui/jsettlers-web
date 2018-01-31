/*
	Graph of hexagons. Handles grid cell management (placement math for eg pathfinding, range, etc) and grid conversion math.
	[Cube/axial coordinate system](http://www.redblobgames.com/grids/hexagons/), "flat top" version only. Since this is 3D, just rotate your camera for pointy top maps.
	Interface:
	type
	size - number of cells (in radius); only used if the map is generated
	cellSize
	cells - a hash so we can have sparse maps
	
	cellShape
	cellGeo
	cellShapeGeo

	@author Corey Birnbaum https://github.com/vonWolfehaus/
 */
// 'utils/Loader', 'graphs/Hex', 'utils/Tools'
class vgHexGrid {
	constructor() {
		this.size = 5; // only used for generated maps
		this.cellSize = 11;
		this.cells = {};

		this._cellWidth = this.cellSize * 2;
		this._cellLength = (vg.SQRT3 * 0.5) * this._cellWidth;
		// cached objects
		this._vec3 = new THREE.Vector3();
		
		vgHexGrid.TWO_THIRDS = 2 / 3;
	}

	// grid cell (Hex in cube coordinate space) to position in pixels/world
	cellToPixel(cell) {
		this._vec3.x = cell.q * this._cellWidth * 0.75;
		this._vec3.y = 1;
		this._vec3.z = -((cell.s - cell.r) * this._cellLength * 0.5);
		return this._vec3;
	}

	pixelToCell(pos) {
		// convert a position in world space ("pixels") to cell coordinates
		var q = pos.x * (vgHexGrid.TWO_THIRDS / this.cellSize);
		var r = ((-pos.x / 3) + (vg.SQRT3/3) * pos.z) / this.cellSize;
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
		return new vg.Cell(rx, ry, rz);
	}

	cellToHash(cell) {
		return cell.q + "." + cell.r + "." + cell.s;
	}

	distance(cellA, cellB) {
		return Math.max(Math.abs(cellA.q - cellB.q), Math.abs(cellA.r - cellB.r), Math.abs(cellA.s - cellB.s));
	}

	generateTiles() {
		var tiles = [];
		for (var i in this.cells) {
			const cell = this.cells[i];
			const tile = new vgTile(cell, this.cellSize)
			tile.position.copy(this.cellToPixel(cell));
			tile.position.y = 0;
			tiles.push(tile);
		}
		return tiles;
	}

	// create a flat, hexagon-shaped grid
	generate(size) {
		for (var x = -size; x < size+1; x++) {
			for (var y = -size; y < size+1; y++) {
				const z = -x-y;
				if (Math.abs(x) <= size && Math.abs(y) <= size && Math.abs(z) <= size) {
					this.add(new vg.Cell(x, y, z));
				}
			}
		}
	}

	add(cell) {
		var hash = this.cellToHash(cell);
		this.cells[hash] = cell;
		return cell;
	}

	remove(cell) {
		var h = this.cellToHash(cell);
		if (this.cells[h]) {
			delete this.cells[h];
		}
	}

	dispose() {
		this.cells = null;
		this.cellShape = null;
		this.cellGeo.dispose();
		this.cellGeo = null;
		this.cellShapeGeo.dispose();
		this.cellShapeGeo = null;
		this._vec3 = null;
		this._geoCache = null;
	}

}
