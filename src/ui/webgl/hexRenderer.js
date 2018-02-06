var proto = require("../../../data_pb");

import {Renderer} from "./renderer.js";
import {ChitRenderer} from "./chitRenderer.js";
import {PortRenderer} from "./portRenderer.js";
import {Util} from "../../util.js";

/** Renders a Hex onto a von-grid tile */
export class HexRenderer extends Renderer {
    constructor(boardRenderer, hex, radius) {
		super();
		
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

			const geometry = new THREE.ExtrudeGeometry(cellShape, {
				amount: 1,
				bevelEnabled: true,
				bevelSegments: 1,
				steps: 1,
				bevelSize: 0.5,
				bevelThickness: 0.5
			});

			var mi = 0;
			//A bit ugly loop but surely gets the job done
			for (var z = 0; z < geometry.faces.length; z++) {
				var face = geometry.faces[z];
				if (face.normal.x === 0 && face.normal.y === 0 && face.normal.z === 1) {
					if (mi === 0) {
						geometry.faceVertexUvs[0][z][0].x = 1;
						geometry.faceVertexUvs[0][z][0].y = 0.5;
						geometry.faceVertexUvs[0][z][1].x = 0.75;
						geometry.faceVertexUvs[0][z][1].y = 1;
						geometry.faceVertexUvs[0][z][2].x = 0.25;
						geometry.faceVertexUvs[0][z][2].y = 1;
						face.materialIndex = 1;
					} else if (mi === 1) {
						geometry.faceVertexUvs[0][z][0].x = 0.25;
						geometry.faceVertexUvs[0][z][0].y = 1;
						geometry.faceVertexUvs[0][z][1].x = 0;
						geometry.faceVertexUvs[0][z][1].y = 0.5;
						geometry.faceVertexUvs[0][z][2].x = 0.25;
						geometry.faceVertexUvs[0][z][2].y = 0;
						face.materialIndex = 1;
					} else if (mi === 2) {
						geometry.faceVertexUvs[0][z][0].x = 0.25;
						geometry.faceVertexUvs[0][z][0].y = 0;
						geometry.faceVertexUvs[0][z][1].x = 0.75;
						geometry.faceVertexUvs[0][z][1].y = 0;
						geometry.faceVertexUvs[0][z][2].x = 1;
						geometry.faceVertexUvs[0][z][2].y = 0.5;
						face.materialIndex = 1;
					} else if (mi === 3) { // mid
						geometry.faceVertexUvs[0][z][0].x = 1;
						geometry.faceVertexUvs[0][z][0].y = 0.5;
						geometry.faceVertexUvs[0][z][1].x = 0.25;
						geometry.faceVertexUvs[0][z][1].y = 1;
						geometry.faceVertexUvs[0][z][2].x = 0.25;
						geometry.faceVertexUvs[0][z][2].y = 0;
						face.materialIndex = 1;
					}
					mi++;
				} else {
					face.materialIndex = 0;
				}
			}
			HexRenderer.geometry = geometry;
		}

		this.highlight = '0x0084cc';
		this.texture = new THREE.TextureLoader().load(this._getTexture(hex));
		this.topMaterial = new THREE.MeshLambertMaterial({ color: 0xdddddd, map: this.texture });
		// this.topMaterial.emissive = new THREE.Color(this.highlight);
		this.material = new THREE.MeshLambertMaterial({ color: 0x0 });
		// this.material.emissive = new THREE.Color(this.highlight);
		this.userData = {};

		this.selected = false;

		this.mesh = new THREE.Mesh(HexRenderer.geometry, [this.material, this.topMaterial]);
		this.mesh.userData.structure = this;

        // rotate it to face "up" (the threejs coordinate space is Y+)
		this.mesh.rotation.x = -90 * Math.DEG_TO_RAD;
        this.mesh.scale.set(this.scale, this.scale, 1);
        const position = boardRenderer.coordToPixel(hex.coord);
        this.mesh.position.copy(position);
        this.mesh.position.y = 0;

        this.portRenderer = null;

        this.material.color = new THREE.Color(this.hex.color);
        this.mesh.userData.structure = this;

		this.chitRenderer = new ChitRenderer(this.hex.chit, this.hex.coord, boardRenderer);
		boardRenderer.group.add(this.chitRenderer.mesh);
			
        if (this.hex.port !== null) {
            this.portRenderer = new PortRenderer(boardRenderer, this.hex.port);
        }

        this.removePortChangedSubscription = hex.portChanged(this.portChanged.bind(this));
        this.removeChitChangedSubscription = hex.chitChanged(this.chitChanged.bind(this));
	}
	_getTexture(hex) {
		var name = Util.getEnumName(proto.HexType, hex.type);
		name = name.toLowerCase();
		return `doc/images/${name}.jpg`;
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
		this.chitRenderer.chit = newChit;
    }

    dispose() {
        this.removeChitChangedSubscription();
        this.removePortChangedSubscription();
    }
    get hex() { return this._hex; }
    set hex(hex) {
		this._hex = hex;
		const texture = this._getTexture(hex);
		this.topMaterial.map = new THREE.TextureLoader().load(texture);
		this.topMaterial.needsUpdate = true;
        this.material.color = new THREE.Color(this.hex.color);
        this.material.needsUpdate = true;
        this.removeChitChangedSubscription();
        this.removePortChangedSubscription();
        this.removePortChangedSubscription = hex.portChanged(this.portChanged.bind(this));
        this.removeChitChangedSubscription = hex.chitChanged(this.chitChanged.bind(this));
	}
	lighten() {
		this.topMaterial.color = new THREE.Color(0xffffff);
		this.topMaterial.needsUpdate = true;
		if (this.portRenderer !== null) {
			this.portRenderer.lighten();
		}
		if (this.chitRenderer !== null) {
			this.chitRenderer.lighten();
		}
	}
	normalize() {
		this.topMaterial.color = new THREE.Color(0xdddddd);
		this.topMaterial.needsUpdate = true;
		if (this.portRenderer !== null) {
			this.portRenderer.normalize();
		}
		if (this.chitRenderer !== null) {
			this.chitRenderer.normalize();
		}
	}
	darken() {
		this.topMaterial.color = new THREE.Color(0x444444);
		this.topMaterial.needsUpdate = true;
		if (this.portRenderer !== null) {
			this.portRenderer.darken();
		}
		if (this.chitRenderer !== null) {
			this.chitRenderer.darken();
		}
	}
	redify() {
		this.topMaterial.color = new THREE.Color(0xff0000);
		this.topMaterial.needsUpdate = true;
		if (this.portRenderer !== null) {
			this.portRenderer.redify();
		}
		if (this.chitRenderer !== null) {
			this.chitRenderer.redify();
		}
	}

	dispose() {
		this.coord = null;
		this.mesh.userData.structure = null;
		this.mesh = null;
		this.boardRenderer.group.remove(this.chitRenderer.mesh);
		this.chitRenderer.dispose();
		this.chitRenderer = null;
		if (this.texture !== null) {
			this.texture.dispose();
		}
		if (this.portRenderer != null) {
			this.boardRenderer.group.remove(this.portRenderer.mesh);
			this.portRenderer.dispose();
			this.portRenderer = null;
		}
		this.material = null;
		this.topMaterial = null;
		this.userData = null;
		this.geometry = null;
		this.boardRenderer = null;
		this.removePortChangedSubscription();
		this.removeChitChangedSubscription();
	}
}