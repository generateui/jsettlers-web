var proto = require("../../../data_pb");
import {Renderer} from "./renderer.js";
import {Util} from "../../util.js";

export class ChitRenderer extends Renderer {
    constructor(chit, coord, boardRenderer) {
        super();
        this.coord = coord;
        this._chit = chit || null;

        if (ChitRenderer.geometry === undefined) { // cache geometry to speed up a bit
            const radius =  3;
            var cilinderGeometry = new THREE.CylinderGeometry(radius, radius, 0.2, 16);
            // Apply material to top cap of cilinder and a different material
            // to the sides of the cilinder, so the texture is placed on top
            // and the sides have just a color
            var halfRadius = radius / 2;
            for (var z = 0; z < cilinderGeometry.faces.length; z++) {
                var face = cilinderGeometry.faces[z];
                if (face.normal.y !== 0) {
                    cilinderGeometry.faceVertexUvs[0][z][0].u = (cilinderGeometry.vertices[face.a].x + halfRadius) / radius;
                    cilinderGeometry.faceVertexUvs[0][z][0].v = (cilinderGeometry.vertices[face.a].z + halfRadius) / radius;
                    cilinderGeometry.faceVertexUvs[0][z][1].u = (cilinderGeometry.vertices[face.b].x + halfRadius) / radius;
                    cilinderGeometry.faceVertexUvs[0][z][1].v = (cilinderGeometry.vertices[face.b].z + halfRadius) / radius;
                    cilinderGeometry.faceVertexUvs[0][z][2].u = (cilinderGeometry.vertices[face.c].x + halfRadius) / radius;
                    cilinderGeometry.faceVertexUvs[0][z][2].v = (cilinderGeometry.vertices[face.c].z + halfRadius) / radius;
                    face.materialIndex = 0;
                } else {
                    face.materialIndex = 1;
                }
            }
            ChitRenderer.geometry = cilinderGeometry;
            // side material never changes, so cache it too
            ChitRenderer.sideMaterial = new THREE.MeshBasicMaterial( {color: 0xc3b091} ); //khaki
        }

        var texture = this._getTexture(this._chit);
        this.topMaterial = new THREE.MeshLambertMaterial( {color: 0xdddddd, map: texture} );
        this.mesh = new THREE.Mesh(ChitRenderer.geometry, [this.topMaterial, ChitRenderer.sideMaterial]);

        var position = boardRenderer.coordToPixel(coord);
        this.mesh.position.set(position.x, 2, position.z);
        this.mesh.userData.structure = this;
        this._updateVisibility();
    }
    _updateVisibility() {
        const show = this.chit != null && this._chit.type !== proto.ChitType.CHITNONE && this._chit.type !== undefined;
        this.mesh.visible = show;
    }
    get chit() { return this._chit; }
    set chit(chit) {
        this._chit = chit;
        this.topMaterial.map = this._getTexture(this._chit);
        this.topMaterial.needsUpdate = true;
        this._updateVisibility();
    }
    _getTexture(chit) {
        if (chit !== null && chit.type === proto.ChitType.CHITNONE || chit.type === undefined) {
            return null;
        }
        const name = Util.getEnumName(proto.ChitType, chit.type);
        var texture = new THREE.TextureLoader().load(`doc/images/${name}.png`);
        return texture;
    }
	lighten() {
		this.topMaterial.color = new THREE.Color(0xffffff);
	}
	normalize() {
		this.topMaterial.color = new THREE.Color(0xdddddd);
	}
	darken() {
		this.topMaterial.color = new THREE.Color(0x444444);
    }
    redify() {
		this.topMaterial.color = new THREE.Color(0xff0000);
    }
}