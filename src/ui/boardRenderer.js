/** Renders a Hex onto a von-grid tile */
class HexRenderer {
    constructor(hex) {
        this._hex = hex;
        this.portRenderer = null;
        this.chitRenderer = null;

        this.removePortChangedSubscription = hex.portChanged(this.portChanged.bind(this));
        this.removeChitChangedSubscription = hex.chitChanged(this.chitChanged.bind(this));
    }
    portChanged(oldPort, newPort) {
        if (this.portRenderer !== null) {
            this.boardRenderer.group.remove(this.portRenderer.mesh);
        }
        if (newPort !== null) {
            this.portRenderer = new PortRenderer(this.boardRenderer, newPort);
        }
    }
    chitChanged(oldChit, newChit) {
        if (this.chitRenderer !== null) {
            this.boardRenderer.group.remove(this.chitRenderer.mesh);
        }
        if (newChit !== null) {
            this.chitRenderer = new ChitRenderer(this.hex, this.boardRenderer);
            this.boardRenderer.group.add(this.chitRenderer.mesh);
        }
    }
    render(grid, boardRenderer) {
        this.grid = grid;
        this.boardRenderer = boardRenderer;
        const coord = this.hex.coord;
        const cell = new vg.Cell(coord.x, coord.y, coord.z);
        const color = new THREE.Color(this.hex.color);
        const hash = grid.cellToHash(cell);
        grid.cells[hash].tile.material.color = color;
        grid.cells[hash].tile.mesh.userData.structure = this;
        this.mesh = grid.cells[hash].tile.mesh;
        if (this.chitRenderer === null) {
            this.chitRenderer = new ChitRenderer(this.hex, boardRenderer);
            boardRenderer.group.add(this.chitRenderer.mesh);
        }
        if (this.hex.port !== null) {
            this.portRenderer = new PortRenderer(boardRenderer, this.hex.port);
        }
    }
    dispose() {
        this.removeChitChangedSubscription();
        this.removePortChangedSubscription();
    }
    get hex() { return this._hex; }
    set hex(hex) {
        this._hex = hex;
        const color = new THREE.Color(this.hex.color);
        const coord = this.hex.coord;
        const cell = new vg.Cell(coord.x, coord.y, coord.z);
        const hash = this.grid.cellToHash(cell);
        this.grid.cells[hash].tile.material.color = color;
        this.removeChitChangedSubscription();
        this.removePortChangedSubscription();
        this.removePortChangedSubscription = this.hex.portChanged(this.portChanged);
        this.removeChitChangedSubscription = this.hex.chitChanged(this.chitChanged);
    }
}

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

        const show = this.chit.chitType !== proto.carcattonne_data.ChitType.NONE;
        cilinder.visible = show;
    }
    _getTexture(chit) {
        if (chit.chitType === proto.carcattonne_data.ChitType.NONE) {
            return null;
        }
        var imageFileName = "doc/images/Chit";
        // TODO: simplify this. we want to set the texture based on the name only, no
        // special cases please :). 
        if (chit.number !== null) {
            imageFileName = imageFileName + chit.number.toString();
        } else if (chit.chitType === proto.carcattonne_data.ChitType.CHITFROMBAG) {
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
/** Renders a hex over a hovered hex to have user select one of six triangles */
class PortPickerRenderer {
    constructor(boardRenderer) {
        this._hex = null;
        this.boardRenderer = boardRenderer;

        this.group = new THREE.Group();
        this.group.visible = false;
        this.hexPart0 = new HexPartRenderer(boardRenderer, 0);
        this.hexPart1 = new HexPartRenderer(boardRenderer, 1);
        this.hexPart2 = new HexPartRenderer(boardRenderer, 2);
        this.hexPart3 = new HexPartRenderer(boardRenderer, 3);
        this.hexPart4 = new HexPartRenderer(boardRenderer, 4);
        this.hexPart5 = new HexPartRenderer(boardRenderer, 5);
        this.group.add(this.hexPart0.mesh);
        this.group.add(this.hexPart1.mesh);
        this.group.add(this.hexPart2.mesh);
        this.group.add(this.hexPart3.mesh);
        this.group.add(this.hexPart4.mesh);
        this.group.add(this.hexPart5.mesh);
        this.mesh = this.group;
        this.mesh.userData.structure = this;
    }
    get hexPartRenderer() {
        return this._hexPartRenderer;
    }
    set hex(hex) {
        this._hex = hex;
        var position = this.boardRenderer.coordToPixel(hex.coord);
        this.mesh.position.set(position.x, 1.01, position.z);
    }
    set portType(portType) {
        this.hexPart0.portType = portType;
        this.hexPart1.portType = portType;
        this.hexPart2.portType = portType;
        this.hexPart3.portType = portType;
        this.hexPart4.portType = portType;
        this.hexPart5.portType = portType;
    }
    set visible(visible) {
        this.group.visible = visible;
    }
}

class HexPartRenderer {
    constructor(boardRenderer, partIndex) {
        this.partIndex = partIndex;
        const cell = null;
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
        shapeGeometry.faceVertexUvs[0][0][0].x = 0.5
        shapeGeometry.faceVertexUvs[0][0][0].y = 1;
        shapeGeometry.faceVertexUvs[0][0][1].x = 0;
        shapeGeometry.faceVertexUvs[0][0][1].y = 0;
        shapeGeometry.faceVertexUvs[0][0][2].x = 1;
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
/** Renders a port on a hexagon using a triangle and a cylinder */
class PortRenderer {
    constructor(boardRenderer, port) {
        this.port = port;
        const cell = null;
        const scale = 1.05;
        const cellSize = 10;

        const partIndexAngle = (vg.TAU / 6) * port.partIndex;
        const partIndexX = cellSize * Math.cos(partIndexAngle);
        const partIndexY = cellSize * Math.sin(partIndexAngle);

        const nextPartIndex = port.partIndex == 5 ? 0 : port.partIndex + 1;
        const nextPartIndexAngle = (vg.TAU / 6) * nextPartIndex;
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
        shapeGeometry.faceVertexUvs[0][0][0].x = 0.5
        shapeGeometry.faceVertexUvs[0][0][0].y = 1;
        shapeGeometry.faceVertexUvs[0][0][1].x = 0;
        shapeGeometry.faceVertexUvs[0][0][1].y = 0;
        shapeGeometry.faceVertexUvs[0][0][2].x = 1;
        shapeGeometry.faceVertexUvs[0][0][2].y = 0;
        var material = new THREE.MeshBasicMaterial( {color: 0xffffff, map: texture} );
        this.mesh = new THREE.Mesh(shapeGeometry, material);
        var position = boardRenderer.coordToPixel(port.seaCoord);
        this.mesh.position.set(position.x, 2, position.z);
        this.mesh.rotation.x = -90 * vg.DEG_TO_RAD;
        this.mesh.scale.set(scale, scale, 1);
        this.mesh.userData.structure = this;
        boardRenderer.group.add(this.mesh);
    }
    _getTexture(portType) {
        var portName = Util.getEnumName(proto.carcattonne_data.PortType, portType);
        var humanName = Util.getPascalCasedName(portName);
        var fileName = `doc/images/${humanName}port.png`;
        var texture = new THREE.TextureLoader().load(fileName);
        texture.mapping = THREE.EquirectangularReflectionMapping;
        return texture;
    }
}

/** Renders a Node as a large yellow cilinder positioned at the Node
 * This renderer enables user selection of a node.
 */
class NodeRenderer {
    constructor(node, boardRenderer) {
        this.node = node;
        this.mesh = null;

        var cilinderGeometry = new THREE.CylinderGeometry(3, 3, 1, 16);
        var edges = new THREE.EdgesGeometry(cilinderGeometry);
        var lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
        var material = new THREE.MeshBasicMaterial({color: 0xffff00});
        var cilinder = new THREE.Mesh(cilinderGeometry, material);
        cilinder.visible = false;
        cilinder.add(lines);
        var position = boardRenderer.nodeToPixel(node);
        cilinder.position.set(position.x, position.y, position.z);
        this.mesh = cilinder;
        this.mesh.userData.structure = this;
    }
}

/** Renders a Node as a large yellow rectangular box positioned at given Edge */
class EdgeRenderer {
    constructor(edge, boardRenderer) {
        this.edge = edge;

        var boxGeometry = new THREE.BoxGeometry(8, 3, 3);
        var edgesGeometry = new THREE.EdgesGeometry(boxGeometry);
        var lines = new THREE.LineSegments(edgesGeometry, new THREE.LineBasicMaterial({ color: 0x000000 }));
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        var box = new THREE.Mesh(boxGeometry, material);
        box.add(lines);
        var radians = ((edge.rotation || 60)* Math.PI) / 180;
        box.rotateY(radians);
        box.visible = false;
        var position = boardRenderer.edgeToPixel(edge);
        box.position.set(position.x, position.y, position.z);
        this.mesh = box;
        this.mesh.userData.structure = this;
    }
}

class RobberRenderer {
    constructor(boardRenderer, robber) {
        this.boardRenderer = boardRenderer;
        var loader = new THREE.STLLoader();
        const that = this;
        loader.load('models3D/robber.stl', function (geometry) {
            console.log(geometry);
            var material = new THREE.MeshPhongMaterial({color: 0x222222});
            var group = new THREE.Mesh(geometry, material);
            group.rotation.x = -0.5 * Math.PI;
            group.position.set(6, 2, 0); // don't place it in the center on top of chit, add tile height
            group.scale.set(0.4, 0.4, 0.4);
            that.boardRenderer.scene.add(group);
            that.group = group;
        });

        //TODO: unsubscribe
        this.removeChangedSubscription = robber.coordChanged((oldValue, newValue) => {
            const p = that.boardRenderer.coordToPixel(newValue);
            that.group.position.set(p.x + 6, p.y + 2, p.z);
        });
    }
}
/* Renders a 3D hexagon board using von-grid */
class BoardRenderer {
    constructor(element, board, behavior) {
        this.board = board || new Standard4pDesign();
        this._behavior = behavior || new SetHex();

        this.removeChangedSubscription = this.board.hexes.changed((key, oldValue, newValue) => {
            var hexRenderer = this.hexRenderers.get(oldValue.coord);
            hexRenderer.hex = newValue;
        });

        this.nodesGroup = new THREE.Group();
        this.edgesGroup = new THREE.Group();
        this.group = new THREE.Group();
        this.hexRenderers = new Map(); // <Coord, HexRenderer>
        this.nodeRenderers = new Map(); // <Node, NodeRenderer>
        this.edgeRenderers = new Map(); // <Edge, EdgeRenderer>
        this.robberRenderer = new RobberRenderer(this, board.robber);
        
        this.scene = new vg.Scene(element);

        // TODO: use sparse maps instead
        // this constructs the cells in grid coordinate space
        this.vgGrid = new vg.HexGrid({
            cellSize: 11 // size of individual cells
        });
        this.vgGrid.generate({
            size: 3 // size of the board
        });

        this.portPickerRenderer = new PortPickerRenderer(this);
        this.group.add(this.portPickerRenderer.group);

        this.vgBoard = new vg.Board(this.vgGrid);

        // this will generate extruded hexagonal tiles
        this.vgBoard.generateTilemap({
            tileScale: 0.96 // you might have to scale the tile so the extruded geometry fits the cell size perfectly
        });
        this.scene.add(this.vgBoard.group);
        this.scene.focusOn(this.vgBoard.group);

        for (var [coord, hex] of this.board.hexes) {
            var hexRenderer = new HexRenderer(hex, this)
            hexRenderer.render(this.vgGrid, this);
            this.hexRenderers.set(hex.coord, hexRenderer);
        }
        // TODO: we probably want to make this lazy
        for (var node of this.board.getAllNodes()) {
            var nodeRenderer = new NodeRenderer(node, this);
            this.nodesGroup.add(nodeRenderer.mesh);
            this.nodeRenderers.set(node, nodeRenderer)
        }
        // TODO: we probably want to make this lazy
        for (var edge of this.board.getAllEdges()) {
            var edgeRenderer = new EdgeRenderer(edge, this);
            this.edgesGroup.add(edgeRenderer.mesh);
            this.edgeRenderers.set(edge, edgeRenderer);
        }

        this.vgBoard.group.add(this.nodesGroup);
        this.vgBoard.group.add(this.edgesGroup);
        this.vgBoard.group.add(this.group);

        this.mouse = new vg.MouseCaster(this.scene.container, this.scene.camera, element);

        // target: Renderer
        this.mouse.signal.add(function(event, target) {
            // target here is the userData supplied object set in Renderers
            if (target === null || target === undefined) {
                return;
            }
            if (event === vg.MouseCaster.CLICK) {
                this.behavior.click(this, target);
            }
            if (event === vg.MouseCaster.OVER) {
                this.behavior.enter(this, target);
            }
            if (event === vg.MouseCaster.OUT) {
                this.behavior.leave(this, target);
            }
        }, this);

        // this.update();
        this.frameCount = 0;
        this.fpsInterval = 0;
        this.startTime = null;
        this.now = null;
        this.then = null;
        this.elapsed = null;
        this.startAnimating(30);
    }
    
    startAnimating(fps) {
        this.fpsInterval = 1000 / fps;
        this.then = window.performance.now();
        this.startTime = this.then;
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
            this.scene.render();
        }
    }

    // TODO: don't hog resources by RAF-ing when dirty only
    // update(timestamp) {
    //     window.requestAnimationFrame(this.update.bind(this));
    //     this.mouse.update();
    //     this.scene.render();
    // }

    get behavior() { return this._behavior; }
    set behavior(newBehavior) {
        this._behavior.stop(this);
        this._behavior = newBehavior;
        this._behavior.start(this);
    }

    hideAllNodes() {
        this.nodesGroup.visible = false;
    }
    showNodes(nodes) {
        this.nodesGroup.visible = true;
        for (var [node, nodeRenderer] of this.nodeRenderers) {
            nodeRenderer.mesh.visible = false;
        }
        for (var node of nodes) {
            var nodeRenderer = this.nodeRenderers.get(node);
            nodeRenderer.mesh.visible = true;
        }
    }

    hideAllEdges() {
        this.edgesGroup.visible = false;
    }
    showEdges(edges) {
        this.edgesGroup.visible = true;
        for (var [edge, edgeRenderer] of this.edgeRenderers) {
            edgeRenderer.mesh.visible = false;
        }
        for (var edge of edges) {
            var edgeRenderer = this.edgeRenderers.get(edge);
            edgeRenderer.mesh.visible = true;
        }
    }

    nodeToPixel(node) {
        // TODO: this code is a bit barfy.
        // TODO: cache
        var cell1 = new vg.Cell(node.coord1.x, node.coord1.y, node.coord1.z);
        var coord1Position = this.cellToPixel(cell1);

        var cell2 = new vg.Cell(node.coord2.x, node.coord2.y, node.coord2.z);
        var coord2Position = this.cellToPixel(cell2);

        var cell3 = new vg.Cell(node.coord3.x, node.coord3.y, node.coord3.z);
        var coord3Position = this.cellToPixel(cell3);
        // coordPosition is the center of a hex in world coordinates
        // the center of three world positions is the position of the node
        var centroidX = (coord1Position.x + coord2Position.x + coord3Position.x) / 3;
        var centroidZ = (coord1Position.z + coord2Position.z + coord3Position.z) / 3;
        return new THREE.Vector3(centroidX, 2, centroidZ);
    }

	cellToPixel(cell) {
        return new THREE.Vector3(
            cell.q * this.vgGrid._cellWidth * 0.75,
            cell.h,
            -((cell.s - cell.r) * this.vgGrid._cellLength * 0.5)
        );
    }
    coordToPixel(coord) {
        return new THREE.Vector3(
            coord.x * this.vgGrid._cellWidth * 0.75,
            1,
            -((coord.z - coord.y) * this.vgGrid._cellLength * 0.5)
        );
    }
    edgeToPixel(edge) {
        var edge1Position = this.nodeToPixel(edge.node1);
        var edge2Position = this.nodeToPixel(edge.node2);
        var centroidX = (edge1Position.x + edge2Position.x) / 2;
        var centroidZ = (edge1Position.z + edge2Position.z) / 2;
        return new THREE.Vector3(centroidX, 3, centroidZ);
    }
}