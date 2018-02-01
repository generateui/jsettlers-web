class ChitRenderer {
    constructor(hex, boardRenderer) {
        this.hex = hex;
        this.chit = hex.chit;

        var texture = this._getTexture(this.chit);
        const radius =  3;
        var cilinderGeometry = new THREE.CylinderGeometry(radius, radius, 0.2, 16);
        // Apply material to top cap of cilinder and a different material
        // to the sides of the cilinder, so the texture is placed on top
        // and the sides have just a color
        var halfRadius = radius / 2;
        for (var z = 0; z < cilinderGeometry.faces.length; z++) {
            var face = cilinderGeometry.faces[z];
            if (face.normal.y !== 0) {
                cilinderGeometry.faceVertexUvs[0][z][0].u = (cilinderGeometry.vertices[face.a].x + halfRadius) / radius;
                cilinderGeometry.faceVertexUvs[0][z][0].v = (cilinderGeometry.vertices[face.a].z + halfRadius) / radius;
                cilinderGeometry.faceVertexUvs[0][z][1].u = (cilinderGeometry.vertices[face.b].x + halfRadius) / radius;
                cilinderGeometry.faceVertexUvs[0][z][1].v = (cilinderGeometry.vertices[face.b].z + halfRadius) / radius;
                cilinderGeometry.faceVertexUvs[0][z][2].u = (cilinderGeometry.vertices[face.c].x + halfRadius) / radius;
                cilinderGeometry.faceVertexUvs[0][z][2].v = (cilinderGeometry.vertices[face.c].z + halfRadius) / radius;
                face.materialIndex = 0;
            } else {
                face.materialIndex = 1;
            }
        }

        var edges = new THREE.EdgesGeometry(cilinderGeometry);
        this.topMaterial = new THREE.MeshBasicMaterial( {color: 0xf9f7b4, map: texture} ); //khaki
        var sideMaterial = new THREE.MeshBasicMaterial( {color: 0xc3b091} ); //khaki
        var cilinder = new THREE.Mesh(cilinderGeometry, [this.topMaterial, sideMaterial]);

        var position = boardRenderer.coordToPixel(hex.coord);
        cilinder.position.set(position.x, 2, position.z);
        this.mesh = cilinder;
        this.mesh.userData.structure = this;
        this.geometry = cilinderGeometry;

        const show = this.chit.type !== ChitType.NONE;
        cilinder.visible = show;
    }
    _getTexture(chit) {
        if (chit.type === ChitType.NONE) {
            return null;
        }
        var imageFileName = "doc/images/Chit";
        // TODO: simplify this. we want to set the texture based on the name only, no
        // special cases please :). 
        if (chit.number !== null) {
            imageFileName = imageFileName + chit.number.toString();
        } else if (chit.type === ChitType.CHITFROMBAG) {
            imageFileName = imageFileName + "frombag";
        } else {
            imageFileName = "Chit" + chit.number.toString();
        }
        imageFileName = imageFileName + ".png";
        var texture = new THREE.TextureLoader().load(imageFileName);
        texture.mapping = THREE.EquirectangularReflectionMapping;
        return texture;
    }
}