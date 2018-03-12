import {Renderer, EMPHASIS} from "./renderer.js";

export class RoadRenderer extends Renderer {
    constructor(boardRenderer, road) {
        super();

        this.road = road;
        
        this.boardRenderer = boardRenderer;

        // TODO: cache
        this.color = new THREE.Color(road.player.color.integer);
        var boxGeometry = new THREE.BoxGeometry(6, 2, 2);
        this.geometry = new THREE.EdgesGeometry(boxGeometry);
        this.lines = new THREE.LineSegments(this.geometry, new THREE.LineBasicMaterial({ color: 0x000000 }));
        this.material = new THREE.MeshPhongMaterial( {color: this.color} );
        var box = new THREE.Mesh(boxGeometry, this.material);
        box.add(this.lines); 
        var radians = ((road.edge.rotation || 60)* Math.PI) / 180;
        box.rotateY(radians);
        var position = boardRenderer.edgeToPixel(road.edge);
        box.position.set(position.x, position.y, position.z);
        this.mesh = box;
        this.mesh.userData.structure = this;
        this.lines.userData.structure = this;
        this.boardRenderer.addMesh(box);
    }
    get player() {
        return this.road.player;
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
        this.mesh.userData.structure = null;
        this.mesh = null;
        this.lines = null;
        this.geometry.dispose();
        this.material.dispose();
        this.material = null;
    }
}