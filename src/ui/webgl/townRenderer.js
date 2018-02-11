import {Renderer} from "./renderer.js";

export class TownRenderer extends Renderer {
    constructor(boardRenderer, town) {
        super();

        this.boardRenderer = boardRenderer;
        var loader = new THREE.STLLoader();
        const that = this;
        loader.load('models3D/town.stl', function (geometry) {
            that.material = new THREE.MeshPhongMaterial({color: town.player.color.integer});
            var edges = new THREE.EdgesGeometry(geometry);
            var lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
            var group = new THREE.Mesh(geometry, that.material);
            group.add(lines);
            var p = that.boardRenderer.nodeToPixel(town.node);
            group.rotation.x = -0.5 * Math.PI;
            group.position.set(p.x, 2, p.z); // don't place it in the center on top of chit, add tile height
            // TODO: move town by half width/depth
            group.scale.set(0.25, 0.25, 0.25);
            that.boardRenderer.addMesh(group);
            that.group = group;
        });
    }
    dispose() {
        // this.material = null;
    }
}