import {Renderer} from "./renderer.js";

/** Renders a Node as a large yellow rectangular box positioned at given Edge */
export class EdgeRenderer extends Renderer {
    constructor(edge, boardRenderer) {
        super();
        this.edge = edge;

        this.geometry = new THREE.BoxGeometry(8, 3, 3);
        // var edgesGeometry = new THREE.EdgesGeometry(boxGeometry);
        // var lines = new THREE.LineSegments(edgesGeometry, new THREE.LineBasicMaterial({ color: 0x000000 }));
        this.material = new THREE.MeshLambertMaterial( {color: 0xffff00, transparent: true, opacity: 0.75} );
        var box = new THREE.Mesh(this.geometry, this.material);
        // box.add(lines);
        var radians = ((edge.rotation || 60)* Math.PI) / 180;
        box.rotateY(radians);
        box.visible = false;
        var position = boardRenderer.edgeToPixel(edge);
        box.position.set(position.x, position.y, position.z);
        this.mesh = box;
        this.mesh.userData.structure = this;
    }
    normalize() {
        this.material.color = new THREE.Color(0xffff00);
    }
    dispose() {
        this.geometry.dispose();
        this.material.dispose();
        this.mesh = null;
    }
}