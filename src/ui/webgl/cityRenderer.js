import {Renderer} from "./renderer.js";

export class CityRenderer extends Renderer {
    constructor(boardRenderer, city) {
        super();
        this.city = city;
        this.boardRenderer = boardRenderer;
        var loader = new THREE.STLLoader();
        loader.load('models3D/city.stl', (geometry) => {
            this.material = new THREE.MeshPhongMaterial({color: city.player.color.integer});
            this.geometry = new THREE.EdgesGeometry(geometry);
            this.lines = new THREE.LineSegments(this.geometry, new THREE.LineBasicMaterial({ color: 0x000000 }));
            var mesh = new THREE.Mesh(this.geometry, this.material);
            mesh.add(this.lines);
            var p = this.boardRenderer.nodeToPixel(city.node);
            mesh.rotation.x = -0.5 * Math.PI;
            mesh.position.set(p.x, 2, p.z); // don't place it in the center on top of chit, add tile height
            mesh.scale.set(0.25, 0.25, 0.25);
            this.boardRenderer.addMesh(mesh);
            this.mesh = mesh;
            this.mesh.userData.structure = this;
        });
    }
    get player() {
        return this.city.player;
    }

    dispose() {
        this.geometry.dispose();
        this.material.dispose();
        this.lines = null;
        this.mesh = null;
    }
}