/*
	Example tile class that constructs its geometry for rendering and holds some gameplay properties.

	@author Corey Birnbaum https://github.com/vonWolfehaus/
*/
class vgTile  {
	constructor (cell, size) {
		this.scale = 0.96;
		this.cell = cell;
		// if (this.cell.tile && this.cell.tile !== this) this.cell.tile.dispose(); // remove whatever was there
		this.cell.tile = this;

		this.uniqueID = vg.generateID();

		if (vgTile.geometry === undefined) {
			// create base shape used for building geometry
			var vertices = [];
			// create the skeleton of the hex
			for (var i = 0; i < 6; i++) {
				const angle = (vg.TAU / 6) * i;
				const x = size * Math.cos(angle);
				const y = size * Math.sin(angle);
				vertices.push(new THREE.Vector3(x, y, 0));
			}
			// copy the verts into a shape for the geometry to use
			const cellShape = new THREE.Shape();
			cellShape.moveTo(vertices[0].x, vertices[0].y);
			for (i = 1; i < 6; i++) {
				cellShape.lineTo(vertices[i].x, vertices[i].y);
			}
			cellShape.lineTo(vertices[0].x, vertices[0].y);
			cellShape.autoClose = true;

			vgTile.geometry = new THREE.ExtrudeGeometry(cellShape, {
				amount: 1,
				bevelEnabled: true,
				bevelSegments: 1,
				steps: 1,
				bevelSize: 0.5,
				bevelThickness: 0.5
			});
		}

		// this.geometry = vgTile.geometry;

		this.material = new THREE.MeshPhongMaterial();
		this.entity = null;
		this.userData = {};

		this.selected = false;
		this.highlight = '0x0084cc';

		this.mesh = new THREE.Mesh(vgTile.geometry, this.material);
		this.mesh.userData.structure = this;

		// create references so we can control orientation through this (Tile), instead of drilling down
		this.position = this.mesh.position;
		this.rotation = this.mesh.rotation;

		// rotate it to face "up" (the threejs coordinate space is Y+)
		this.rotation.x = -90 * vg.DEG_TO_RAD;
		this.mesh.scale.set(this.scale, this.scale, 1);

		if (this.material.emissive) {
			this._emissive = this.material.emissive.getHex();
		}
		else {
			this._emissive = null;
		}
	} 

	select() {
		if (this.material.emissive) {
			this.material.emissive.setHex(this.highlight);
		}
		this.selected = true;
		return this;
	}

	deselect() {
		if (this._emissive !== null && this.material.emissive) {
			this.material.emissive.setHex(this._emissive);
		}
		this.selected = false;
		return this;
	}

	toggle() {
		if (this.selected) {
			this.deselect();
		}
		else {
			this.select();
		}
		return this;
	}

	dispose() {
		this.cell = null;
		this.position = null;
		this.rotation = null;
		if (this.mesh.parent) this.mesh.parent.remove(this.mesh);
		this.mesh.userData.structure = null;
		this.mesh = null;
		this.material = null;
		this.userData = null;
		this.entity = null;
		this.geometry = null;
		this._emissive = null;
	}
}
