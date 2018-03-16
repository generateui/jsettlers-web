import {Renderer, EMPHASIS} from "./renderer.js";

/** Renders a Node as a large yellow cilinder positioned at the Node
 * This renderer enables user selection of a node.
 */
export class NodeRenderer extends Renderer {
    constructor(node, boardRenderer) {
        super();
        
        this.node = node;
        this.mesh = null;
        this._emphasis = EMPHASIS.normal;

        this.geometry = new THREE.CylinderGeometry(3, 3, 1, 16);
        // TODO: remove edge lines or fix problem lines don't hit in hittesting
        this.material = new THREE.MeshLambertMaterial({color: new THREE.Color(0xffff00)});
        var cilinder = new THREE.Mesh(this.geometry, this.material);
        cilinder.visible = false;
        var position = boardRenderer.nodeToPixel(node);
        cilinder.position.set(position.x, position.y, position.z);
        this.mesh = cilinder;
        this.mesh.userData.structure = this;
    }
    get emphasis() {
        return this._emphasis;
    }
    set emphasis(emphasis) {
		let color = null;
		switch (emphasis) {
			case EMPHASIS.light: color = 0xffff99; break; // canary yellow
			case EMPHASIS.dark: color = 0xdaa520; break; // gold
			case EMPHASIS.red: color = 0xff0000; break;
			case EMPHASIS.normal: color = 0xffff00; break;
        }
        this.material.color = new THREE.Color(color);
        this.material.needsUpdate = true;
        this._emphasis = emphasis;
    }
    dispose() {
        this.geometry.dispose();
        this.material.dispose();
        this.mesh = null;
    }
}
