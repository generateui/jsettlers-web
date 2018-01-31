/*
	Sets up and manages a THREEjs container, camera, and light, making it easy to get going.
	Also provides camera control.

 */
class vgScene {
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
		this.controls.minDistance = 100;
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

		this.attachTo(element);
	}

	attachTo(element) {
		element.style.width = this.width + 'px';
		element.style.height = this.height + 'px';
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(this.width, this.height);
		element.appendChild(this.renderer.domElement);
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
