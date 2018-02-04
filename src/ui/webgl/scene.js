import {MouseCaster} from "../../../von-grid/MouseCaster.js";
// import {OrbitControls} from "../../../von-grid/OrbitControls.js";
// var OrbitControls = require("../../../von-grid/OrbitControls.js")(THREE);

/*
	Sets up and manages a THREEjs container, camera, and light, making it easy to get going.
	Also provides camera control.

 */
export class Scene {
	constructor(element) {
		this.renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true
		});
		this.renderer.setClearColor('#fff', 0);
		this.renderer.sortObjects = false;

		this.width = element.clientWidth;
		this.height = element.clientHeight;

		this.orthoZoom = 4;

		this.scene = new THREE.Scene();
		this.scene.add(new THREE.AmbientLight(0xdddddd));

		var light = new THREE.DirectionalLight(0xffffff)
		light.position.set(-1, 1, -1).normalize();
		this.scene.add(light);

		this.camera = new THREE.PerspectiveCamera(50, this.width / this.height, 1, 5000);

		this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
		this.controls.minDistance = 10;
		this.controls.maxDistance = 1000;
		this.controls.zoomSpeed = 2;
		this.controls.noZoom = false;

		this.camera.position.copy({ x:-150, y:150, z:0 });

		window.addEventListener('resize', function onWindowResize() {
			this.width = element.clientWidth;
			this.height = element.clientHeight;
			this.camera.aspect = this.width / this.height;

			this.camera.updateProjectionMatrix();
			this.renderer.setSize(this.width, this.height);
		}.bind(this), false);

		element.style.width = this.width + 'px';
		element.style.height = this.height + 'px';
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(this.width, this.height);
		element.appendChild(this.renderer.domElement);

		this.mouse = new MouseCaster(this.scene, this.camera, element);

        this.fpsInterval = 0;
        this.now = null;
        this.then = null;
        this.elapsed = null;
	}
    
    startAnimating(fps) {
        this.fpsInterval = 1000 / fps;
        this.then = window.performance.now();
        this.animate();
    }

    animate(newtime) {
        window.requestAnimationFrame(this.animate.bind(this));
        this.now = newtime;
        this.elapsed = this.now - this.then;
    
        if (this.elapsed > this.fpsInterval) {
            // Get ready for next frame by setting then=now, but...
            // Also, adjust for fpsInterval not being multiple of 16.67
            this.then = this.now - (this.elapsed % this.fpsInterval);
    
            this.mouse.update();
            this.render();
        }
	}
	
	add(mesh) {
		this.scene.add(mesh);
	}

	remove(mesh) {
		this.scene.remove(mesh);
	}

	render() {
		this.controls.update();
		this.renderer.render(this.scene, this.camera);
	}

	focusOn(obj) {
		this.camera.lookAt(obj.position);
	}
}
