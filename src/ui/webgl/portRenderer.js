/** Renders a port on a hexagon using a triangle and a cylinder */
class PortRenderer {
    constructor(boardRenderer, port) {
        this.port = port;
        const scale = 1.05;
        const cellSize = 10;

        const partIndexAngle = (Math.TAU / 6) * port.partIndex;
        const partIndexX = cellSize * Math.cos(partIndexAngle);
        const partIndexY = cellSize * Math.sin(partIndexAngle);

        const nextPartIndex = port.partIndex == 5 ? 0 : port.partIndex + 1;
        const nextPartIndexAngle = (Math.TAU / 6) * nextPartIndex;
        const nextPartIndexX = cellSize * Math.cos(nextPartIndexAngle);
        const nextPartIndexY = cellSize * Math.sin(nextPartIndexAngle);

        const triangleShape = new THREE.Shape();
        triangleShape.moveTo(0, 0);
        triangleShape.lineTo(partIndexX, partIndexY);
        triangleShape.lineTo(nextPartIndexX, nextPartIndexY);
        triangleShape.lineTo(0, 0);
        triangleShape.autoClose = true;

        var texture = this._getTexture(port.type);
        const shapeGeometry = new THREE.ShapeGeometry(triangleShape);
        shapeGeometry.faceVertexUvs[0][0][0].x = 1
        shapeGeometry.faceVertexUvs[0][0][0].y = 0;
        shapeGeometry.faceVertexUvs[0][0][1].x = 0.5;
        shapeGeometry.faceVertexUvs[0][0][1].y = 1;
        shapeGeometry.faceVertexUvs[0][0][2].x = 0;
        shapeGeometry.faceVertexUvs[0][0][2].y = 0;
        var material = new THREE.MeshBasicMaterial( {color: 0xffffff, map: texture} );
        this.mesh = new THREE.Mesh(shapeGeometry, material);
        var position = boardRenderer.coordToPixel(port.seaCoord);
        this.mesh.position.set(position.x, 2, position.z);
        this.mesh.rotation.x = -90 * Math.DEG_TO_RAD;
        this.mesh.scale.set(scale, scale, 1);
        this.mesh.userData.structure = this;
        boardRenderer.group.add(this.mesh);
    }
    _getTexture(portType) {
        var portName = Util.getEnumName(PortType, portType);
        var humanName = Util.getPascalCasedName(portName);
        var fileName = `doc/images/${humanName}port.png`;
        var texture = new THREE.TextureLoader().load(fileName);
        texture.mapping = THREE.EquirectangularReflectionMapping;
        return texture;
    }
}