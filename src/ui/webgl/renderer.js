export class Renderer {
    darken() {
        this.material.color = new THREE.Color(0x444444);
    }
    lighten() {
        this.material.color = new THREE.Color(0xffffff);
    }
    normalize() {
        this.material.color = new THREE.Color(0xdddddd);
    }
    redify() {
        this.material.color = new THREE.Color(0xff0000);
    }
}