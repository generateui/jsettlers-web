/** Renders a Hex onto a von-grid tile */
class HexRenderer {
    constructor(boardRenderer, hex, radius) {
        this.boardRenderer = boardRenderer;
        this._hex = hex;

		this.scale = 0.96;
		this.coord = hex.coord;

		this.uniqueID = Util.generateID();

		if (HexRenderer.geometry === undefined) {
			// create base shape used for building geometry
			var vertices = [];
			// create the skeleton of the hex
			for (var i = 0; i < 6; i++) {
				const angle = (Math.TAU / 6) * i;
				const x = radius * Math.cos(angle);
				const y = radius * Math.sin(angle);
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

			HexRenderer.geometry = new THREE.ExtrudeGeometry(cellShape, {
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

		this.mesh = new THREE.Mesh(HexRenderer.geometry, this.material);
		this.mesh.userData.structure = this;

        // rotate it to face "up" (the threejs coordinate space is Y+)
		this.mesh.rotation.x = -90 * Math.DEG_TO_RAD;
        this.mesh.scale.set(this.scale, this.scale, 1);
        const position = boardRenderer.coordToPixel(hex.coord);
        this.mesh.position.copy(position);
        this.mesh.position.y = 0;

		if (this.material.emissive) {
			this._emissive = this.material.emissive.getHex();
		} else {
			this._emissive = null;
		}

        this.portRenderer = null;
        this.chitRenderer = null;

        const color = new THREE.Color(this.hex.color);
        this.material.color = color;
        this.mesh.userData.structure = this;

        if (this.chitRenderer === null) {
            this.chitRenderer = new ChitRenderer(this.hex, boardRenderer);
            boardRenderer.group.add(this.chitRenderer.mesh);
        }
        if (this.hex.port !== null) {
            this.portRenderer = new PortRenderer(boardRenderer, this.hex.port);
        }

        this.removePortChangedSubscription = hex.portChanged(this.portChanged.bind(this));
        this.removeChitChangedSubscription = hex.chitChanged(this.chitChanged.bind(this));
    }
    portChanged(oldPort, newPort) {
        if (this.portRenderer !== null) {
            this.boardRenderer.group.remove(this.portRenderer.mesh);
        }
        if (newPort !== null) {
            this.portRenderer = new PortRenderer(this.boardRenderer, newPort);
        }
    }
    chitChanged(oldChit, newChit) {
        if (this.chitRenderer !== null) {
            this.boardRenderer.group.remove(this.chitRenderer.mesh);
        }
        if (newChit !== null) {
            this.chitRenderer = new ChitRenderer(this.hex, this.boardRenderer);
            this.boardRenderer.group.add(this.chitRenderer.mesh);
        }
    }

    dispose() {
        this.removeChitChangedSubscription();
        this.removePortChangedSubscription();
    }
    get hex() { return this._hex; }
    set hex(hex) {
        this._hex = hex;
        const color = new THREE.Color(this.hex.color);
        const coord = this.hex.coord;
        this.material.color = color;
        this.removeChitChangedSubscription();
        this.removePortChangedSubscription();
        this.removePortChangedSubscription = this.hex.portChanged(this.portChanged);
        this.removeChitChangedSubscription = this.hex.chitChanged(this.chitChanged);
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
		this.coord = null;
		if (this.mesh.parent) this.mesh.parent.remove(this.mesh);
		this.mesh.userData.structure = null;
		this.mesh = null;
		this.material = null;
		this.userData = null;
		this.entity = null;
		this.geometry = null;
		this._emissive = null;

		// from vg.Board
		this.cellShape = null;
		this.cellGeo.dispose();
		this.cellGeo = null;
		this.cellShapeGeo.dispose();
		this.cellShapeGeo = null;
	}
}