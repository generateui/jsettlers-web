class RoadRenderer {
    constructor(boardRenderer, road) {
        this.boardRenderer = boardRenderer;

        var boxGeometry = new THREE.BoxGeometry(6, 2, 2);
        var edgesGeometry = new THREE.EdgesGeometry(boxGeometry);
        var lines = new THREE.LineSegments(edgesGeometry, new THREE.LineBasicMaterial({ color: 0x000000 }));
        var material = new THREE.MeshBasicMaterial( {color: road.player.color} );
        var box = new THREE.Mesh(boxGeometry, material);
        box.add(lines);
        var radians = ((road.edge.rotation || 60)* Math.PI) / 180;
        box.rotateY(radians);
        var position = boardRenderer.edgeToPixel(road.edge);
        box.position.set(position.x, position.y, position.z);
        this.mesh = box;
        this.mesh.userData.structure = this;
        this.boardRenderer.addMesh(box);
    }
}