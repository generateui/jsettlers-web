import {Renderer} from "./renderer.js";

export class CityRenderer extends Renderer {
    constructor(boardRenderer, city) {
        super();
        this.boardRenderer = boardRenderer;
        var loader = new THREE.STLLoader();
        const that = this;
        loader.load('models3D/city.stl', function (geometry) {
            console.log(geometry);
            that.material = new THREE.MeshPhongMaterial({color: city.player.color.integer});
            that.geometry = new THREE.EdgesGeometry(geometry);
            that.lines = new THREE.LineSegments(that.geometry, new THREE.LineBasicMaterial({ color: 0x000000 }));
            var mesh = new THREE.Mesh(that.geometry, that.material);
            mesh.add(that.lines);
            var p = that.boardRenderer.nodeToPixel(city.node);
            mesh.rotation.x = -0.5 * Math.PI;
            mesh.position.set(p.x, 2, p.z); // don't place it in the center on top of chit, add tile height
            mesh.scale.set(0.25, 0.25, 0.25);
            that.boardRenderer.addMesh(mesh);
            that.mesh = mesh;
        });
    }
    dispose() {
        this.geometry.dispose();
        this.material.dispose();
        this.lines.dispose();
        this.mesh = null;
    }
}