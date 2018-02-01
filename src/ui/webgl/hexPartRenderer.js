class HexPartRenderer {
    constructor(boardRenderer, partIndex) {
        this.partIndex = partIndex;
        const scale = 1.05;
        const cellSize = 10;

        const partIndexAngle = (vg.TAU / 6) * partIndex;
        const partIndexX = cellSize * Math.cos(partIndexAngle);
        const partIndexY = cellSize * Math.sin(partIndexAngle);

        const nextPartIndex = partIndex == 5 ? 0 : partIndex + 1;
        const nextPartIndexAngle = (vg.TAU / 6) * nextPartIndex;
        const nextPartIndexX = cellSize * Math.cos(nextPartIndexAngle);
        const nextPartIndexY = cellSize * Math.sin(nextPartIndexAngle);

        var material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(0x0000ff)
        });
        const triangleShape = new THREE.Shape();
        triangleShape.moveTo(0, 0);
        triangleShape.lineTo(partIndexX, partIndexY);
        triangleShape.lineTo(nextPartIndexX, nextPartIndexY);
        triangleShape.lineTo(0, 0);
        triangleShape.autoClose = true;

        var texture = new THREE.TextureLoader().load("doc/images/Wheat2To1Port.png");
        const shapeGeometry = new THREE.ShapeGeometry(triangleShape);
        shapeGeometry.faceVertexUvs[0][0][0].x = 1
        shapeGeometry.faceVertexUvs[0][0][0].y = 0;
        shapeGeometry.faceVertexUvs[0][0][1].x = 0.5;
        shapeGeometry.faceVertexUvs[0][0][1].y = 1;
        shapeGeometry.faceVertexUvs[0][0][2].x = 0;
        shapeGeometry.faceVertexUvs[0][0][2].y = 0;
        material = new THREE.MeshBasicMaterial( {map: texture} );
        this.mesh = new THREE.Mesh(shapeGeometry, material);
        this.mesh.rotation.x = -90 * vg.DEG_TO_RAD;
        this.mesh.position.y = 1.01;
        this.mesh.scale.set(scale, scale, 1);
        this.mesh.userData.structure = this;
    }
    get visible() {
        return this.mesh.visible;
    }
    set visible(visible) {
        this.mesh.visible = visible;
    }
    get hovered() {
        return this._hovered;
    }
    set hovered(hovered) {
        this._hovered = hovered;
        this.mesh.material.color = hovered ? new THREE.Color(0xaaaaaa) : new THREE.Color(0xffffff);
    }
    set portType(portType) {
        var portName = Util.getEnumName(proto.carcattonne_data.PortType, portType);
        var humanName = Util.getPascalCasedName(portName);
        var fileName = `doc/images/${humanName}port.png`;
        var texture = new THREE.TextureLoader().load(fileName);
        this.mesh.material.map = texture;
        this.mesh.material.needsUpdate = true;
    }
}