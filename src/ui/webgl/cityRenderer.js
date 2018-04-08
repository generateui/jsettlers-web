import {Renderer, EMPHASIS} from "./renderer.js";

export class CityRenderer extends Renderer {
    constructor(boardRenderer, city) {
        super();
        this.city = city;
        this.boardRenderer = boardRenderer;
        var loader = new THREE.STLLoader();
        loader.load('models3D/city.stl', (geometry) => {
            this.color = new THREE.Color(city.player.color.integer);
            this.material = new THREE.MeshPhongMaterial({color: this.color});
            this.geometry = new THREE.EdgesGeometry(geometry);
            this.lines = new THREE.LineSegments(this.geometry, new THREE.LineBasicMaterial({ color: 0x000000 }));
            var mesh = new THREE.Mesh(geometry, this.material);
            mesh.add(this.lines);
            var p = this.boardRenderer.nodeToPixel(city.node);
            mesh.rotation.x = -0.5 * Math.PI;
            mesh.position.set(p.x, 2, p.z); // don't place it in the center on top of chit, add tile height
            mesh.scale.set(0.25, 0.25, 0.25);
            this.boardRenderer.addMesh(mesh);
            this.mesh = mesh;
            this.mesh.userData.structure = this;
            this.lines.userData.structure = this;
        });
    }
    get player() {
        return this.city.player;
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

    dispose() {
        this.geometry.dispose();
        this.material.dispose();
        this.lines = null;
        this.mesh = null;
    }
}