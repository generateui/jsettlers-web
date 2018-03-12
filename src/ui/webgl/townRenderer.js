import {Renderer, EMPHASIS} from "./renderer.js";

export class TownRenderer extends Renderer {
    constructor(boardRenderer, town) {
        super();

        this._emphasis = EMPHASIS.normal;
        this.town = town;
        this.boardRenderer = boardRenderer;

        var loader = new THREE.STLLoader();
        loader.load('models3D/town.stl', (geometry) => {
            this.color = new THREE.Color(town.player.color.integer);
            this.material = new THREE.MeshLambertMaterial({color: this.color});
            var edges = new THREE.EdgesGeometry(geometry);
            this.lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
            var mesh = new THREE.Mesh(geometry, this.material);
            mesh.add(this.lines);
            var p = this.boardRenderer.nodeToPixel(town.node);
            mesh.rotation.x = -0.5 * Math.PI;
            mesh.position.set(p.x, 2, p.z); // don't place it in the center on top of chit, add tile height
            // TODO: move town by half width/depth
            mesh.scale.set(0.25, 0.25, 0.25);
            this.boardRenderer.addMesh(mesh);
            this.mesh = mesh;
            this.mesh.userData.structure = this;
            this.lines.userData.structure = this;
        });
    }
    get emphasis() {
        return this._emphasis;
    }
    set emphasis(emphasis) {
        if (this._emphasis === emphasis) {
            return;
        }
        this._emphasis = emphasis;
        if (emphasis === EMPHASIS.normal) {
            this.material.color = this.color;
            return;
        }
        if (emphasis === EMPHASIS.red) {
            // not supported
            this.material.color = this.color;
            return;
        }
        let color = null;
        let lerpFactor = null;
		switch (emphasis) {
			case EMPHASIS.light: color = 0xdddddd; lerpFactor = 0.4; break;
			case EMPHASIS.dark: color = 0x0; lerpFactor = 0.8; break;
        }
        const lerpColor = new THREE.Color(color);
        const clone = this.color.clone();
        clone.lerp(lerpColor, lerpFactor);
        this.material.color = clone;
    }
    get player() {
        return this.town.player;
    }
    dispose() {
        this.material.dispose();
        this.boardRenderer.removeMesh(this.mesh);

        this.material = null;
        this.town = null;
        this.boardRenderer = null;
    }
}