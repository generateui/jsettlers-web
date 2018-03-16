class Renderer {
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

/** Renderers can have a visualization emphasis
This communicates hints for the user to perform a certain task.
For instance, when the robber is moved all the hexes where the 
robber cannot be placed are darkened and the hex where the robber 
is currently located gets a red ovrlay (you can't place the robber 
there) */
const EMPHASIS = {
    normal: 0, // no special visualization
    red: 1, // shows a red glow/halftransparent overlay
    dark: 2, // show a dark overlay
    light: 3, // shows a lightened overlay
};
export {
    Renderer, EMPHASIS
};