import {Renderer} from "./renderer.js";

/** Renders a Node as a large yellow cilinder positioned at the Node
 * This renderer enables user selection of a node.
 */
export class NodeRenderer extends Renderer {
    constructor(node, boardRenderer) {
        super();
        
        this.node = node;
        this.mesh = null;

        this.geometry = new THREE.CylinderGeometry(3, 3, 1, 16);
        // TODO: remove edge lines or fix problem lines don't hit in hittesting
        // var edges = new THREE.EdgesGeometry(cilinderGeometry);
        // var lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
        this.material = new THREE.MeshLambertMaterial({color: 0xffff00});
        var cilinder = new THREE.Mesh(this.geometry, this.material);
        cilinder.visible = false;
        // cilinder.add(lines);
        var position = boardRenderer.nodeToPixel(node);
        cilinder.position.set(position.x, position.y, position.z);
        this.mesh = cilinder;
        this.mesh.userData.structure = this;
    }
    dispose() {
        this.geometry.dispose();
        this.material.dispose();
        this.mesh = null;
    }
}
