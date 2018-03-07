import {Renderer} from "./renderer.js";

export class TownRenderer extends Renderer {
    constructor(boardRenderer, town) {
        super();
        this.town = town;

        this.boardRenderer = boardRenderer;
        var loader = new THREE.STLLoader();
        loader.load('models3D/town.stl', (geometry) => {
            this.material = new THREE.MeshPhongMaterial({color: town.player.color.integer});
            var edges = new THREE.EdgesGeometry(geometry);
            var lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
            var mesh = new THREE.Mesh(geometry, this.material);
            mesh.add(lines);
            var p = this.boardRenderer.nodeToPixel(town.node);
            mesh.rotation.x = -0.5 * Math.PI;
            mesh.position.set(p.x, 2, p.z); // don't place it in the center on top of chit, add tile height
            // TODO: move town by half width/depth
            mesh.scale.set(0.25, 0.25, 0.25);
            this.boardRenderer.addMesh(mesh);
            this.mesh = mesh;
            this.mesh.userData.structure = this;
        });
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