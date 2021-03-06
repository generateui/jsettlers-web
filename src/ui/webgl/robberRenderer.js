import {Renderer} from "./renderer.js";

export class RobberRenderer extends Renderer {
    constructor(boardRenderer, robber) {
        super();
        
        this.boardRenderer = boardRenderer;
        var loader = new THREE.STLLoader();
        const that = this;
        loader.load('models3D/robber.stl', function (geometry) {
            that.material = new THREE.MeshPhongMaterial({color: 0x222222});
            var group = new THREE.Mesh(geometry, that.material);
            group.rotation.x = -0.5 * Math.PI;
            group.position.set(6, 2, 0); // don't place it in the center on top of chit, add tile height
            group.scale.set(0.4, 0.4, 0.4);
            that.boardRenderer.addMesh(group);
            that.group = group;
        });

        //TODO: unsubscribe
        this.removeChangedSubscription = robber.coordChanged((oldValue, newValue) => {
            const p = that.boardRenderer.coordToPixel(newValue);
            that.group.position.set(p.x + 6, p.y + 2, p.z);
        });
    }
    dispose() {
        this.boardRenderer.removeMesh(this.group);
        this.group = null;
        this.boardRenderer = null;
        this.material = null;
    }
}