var proto = require("../../../data_pb");
import {Renderer} from "./renderer.js";
import {Util} from "../../util.js";

/** Renders a port on a hexagon using a triangle and a cylinder */
export class PortRenderer extends Renderer {
    constructor(boardRenderer, port) {
        super();
        
        this.port = port;
        const scale = 1.05;

        if (PortRenderer.geometries === undefined) {
            PortRenderer.geometries = [];
        }
        if (PortRenderer.geometries[port.partIndex] === undefined) {
            const cellSize = 10;
            let pi = port.partIndex;
            pi = 5 - pi;
            
            const partIndexAngle = (Math.TAU / 6) * pi;
            const partIndexX = cellSize * Math.cos(partIndexAngle);
            const partIndexY = cellSize * Math.sin(partIndexAngle);
    
            const nextPartIndex = pi == 5 ? 0 : pi + 1;
            const nextPartIndexAngle = (Math.TAU / 6) * nextPartIndex;
            const nextPartIndexX = cellSize * Math.cos(nextPartIndexAngle);
            const nextPartIndexY = cellSize * Math.sin(nextPartIndexAngle);
    
            const triangleShape = new THREE.Shape();
            triangleShape.moveTo(0, 0);
            triangleShape.lineTo(partIndexX, partIndexY);
            triangleShape.lineTo(nextPartIndexX, nextPartIndexY);
            triangleShape.lineTo(0, 0);
            triangleShape.autoClose = true;
    
            const shapeGeometry = new THREE.ShapeGeometry(triangleShape);
            shapeGeometry.faceVertexUvs[0][0][0].x = 1
            shapeGeometry.faceVertexUvs[0][0][0].y = 0;
            shapeGeometry.faceVertexUvs[0][0][1].x = 0.5;
            shapeGeometry.faceVertexUvs[0][0][1].y = 1;
            shapeGeometry.faceVertexUvs[0][0][2].x = 0;
            shapeGeometry.faceVertexUvs[0][0][2].y = 0;
            
            PortRenderer.geometries[port.partIndex] = shapeGeometry;
        }

        this.texture = this._getTexture(port.type);
        this.texture.minFilter = THREE.LinearFilter;
        this.material = new THREE.MeshLambertMaterial( {color: 0xdddddd, map: this.texture} );
        this.mesh = new THREE.Mesh(PortRenderer.geometries[port.partIndex], this.material);
        var position = boardRenderer.coordToPixel(port.seaCoord);
        this.mesh.position.set(position.x, 2, position.z);
        this.mesh.rotation.x = -90 * Math.DEG_TO_RAD;
        this.mesh.scale.set(scale, scale, 1);
        this.mesh.userData.structure = this;
        boardRenderer.group.add(this.mesh);
    }
    _getTexture(portType) {
        var portName = Util.getEnumName(proto.PortType, portType);
        var humanName = Util.getPascalCasedName(portName);
        var fileName = `doc/images/${humanName}port.png`;
        var texture = new THREE.TextureLoader().load(fileName);
        return texture;
    }
    dispose() {
        this.texture.dispose();
        this.mesh.userData.structure = null;
        this.mesh = null;
        this.material.dispose();
        this.material = null;
    }
}