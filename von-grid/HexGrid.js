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
		this.coords = [];

		this._cellWidth = this.cellSize * 2;
		this._cellLength = (vg.SQRT3 * 0.5) * this._cellWidth;
		
		vgHexGrid.TWO_THIRDS = 2 / 3;
	}

	// grid cell (Hex in cube coordinate space) to position in pixels/world
	coordToPixel(coord) {
		const x = coord.x * this._cellWidth * 0.75;
		const y = 1;
		const z = -((coord.z - coord.y) * this._cellLength * 0.5);
		return new THREE.Vector3(x, y, z);
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
		return new Coord3D(rx, ry, rz);
	}

	distance(coord1, coord2) {
		return Math.max(Math.abs(coord1.x - coord2.x), Math.abs(coord1.y - coord2.y), Math.abs(coord1.z - coord2.z));
	}

	generateTiles() {
		var tiles = [];
		for (var coord of this.coords) {
			const tile = new vgTile(coord, this.cellSize)
			tile.position.copy(this.coordToPixel(coord));
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
					this.add(new Coord3D(x, y, z));
				}
			}
		}
	}

	add(coord) {
		this.coords.push(coord);
	}

	remove(coord) {
		var index = this.coords.indexOf(coord);
		if (index !== -1) {
			this.coords.slice(index, 1);
		}
	}

	dispose() {
		this.coords = null;
		this.cellShape = null;
		this.cellGeo.dispose();
		this.cellGeo = null;
		this.cellShapeGeo.dispose();
		this.cellShapeGeo = null;
	}
}
