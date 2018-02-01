/** Renders a Node as a large yellow rectangular box positioned at given Edge */
class EdgeRenderer {
    constructor(edge, boardRenderer) {
        this.edge = edge;

        var boxGeometry = new THREE.BoxGeometry(8, 3, 3);
        // var edgesGeometry = new THREE.EdgesGeometry(boxGeometry);
        // var lines = new THREE.LineSegments(edgesGeometry, new THREE.LineBasicMaterial({ color: 0x000000 }));
        var material = new THREE.MeshLambertMaterial( {color: 0xffff00, transparent: true, opacity: 0.75} );
        var box = new THREE.Mesh(boxGeometry, material);
        // box.add(lines);
        var radians = ((edge.rotation || 60)* Math.PI) / 180;
        box.rotateY(radians);
        box.visible = false;
        var position = boardRenderer.edgeToPixel(edge);
        box.position.set(position.x, position.y, position.z);
        this.mesh = box;
        this.mesh.userData.structure = this;
    }
}