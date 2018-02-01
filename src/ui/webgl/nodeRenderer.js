/** Renders a Node as a large yellow cilinder positioned at the Node
 * This renderer enables user selection of a node.
 */
class NodeRenderer {
    constructor(node, boardRenderer) {
        this.node = node;
        this.mesh = null;

        var cilinderGeometry = new THREE.CylinderGeometry(3, 3, 1, 16);
        // TODO: remove edge lines or fix problem lines don't hit in hittesting
        // var edges = new THREE.EdgesGeometry(cilinderGeometry);
        // var lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
        var material = new THREE.MeshPhongMaterial({color: 0xffff00});
        var cilinder = new THREE.Mesh(cilinderGeometry, material);
        cilinder.visible = false;
        // cilinder.add(lines);
        var position = boardRenderer.nodeToPixel(node);
        cilinder.position.set(position.x, position.y, position.z);
        this.mesh = cilinder;
        this.mesh.userData.structure = this;
    }
}
