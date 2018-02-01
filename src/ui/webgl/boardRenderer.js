/* Renders a 3D hexagon board using von-grid */
class BoardRenderer {
    constructor(element, board, behavior) {
        this.board = board || new Standard4pDesign();
        this._behavior = behavior || new SetHex();

        this.removeChangedSubscription = this.board.hexes.changed((key, oldValue, newValue) => {
            var hexRenderer = this.hexRenderers.get(oldValue.coord);
            hexRenderer.hex = newValue;
        });

        this.removeTownAddedSubscription = this.board.towns.added((key, value) => {
            var townRenderer = new TownRenderer(this, value);
            this.townRenderers.set(value, townRenderer);
        })
        this.removeCityAddedSubscription = this.board.cities.added((key, value) => {
            var cityRenderer = new CityRenderer(this, value);
            this.cityRenderers.set(value, cityRenderer);
        })
        this.removeRoadAddedSubscription = this.board.roads.added((key, value) => {
            var roadRenderer = new RoadRenderer(this, value);
            this.roadRenderers.set(value, roadRenderer);
        })

        this.nodesGroup = new THREE.Group();
        this.edgesGroup = new THREE.Group();
        this.group = new THREE.Group();
        this.hexRenderers = new Map(); // <Coord, HexRenderer>
        this.nodeRenderers = new Map(); // <Node, NodeRenderer>
        this.edgeRenderers = new Map(); // <Edge, EdgeRenderer>
        this.townRenderers = new Map(); // <Node, Town>
        this.cityRenderers = new Map(); // <Node, City>
        this.roadRenderers = new Map(); // <Edge, Road>
        this.robberRenderer = new RobberRenderer(this, board.robber);
        this.portPickerRenderer = new PortPickerRenderer(this);
        this.group.add(this.portPickerRenderer.group);
        
        this.scene = new vgScene(element);
        this.vgGrid = new vgHexGrid();
        this.vgGrid.generate(3);
        this.vgGrid.generateTilemap();
        
        this.scene.add(this.vgGrid.group);
        this.scene.focusOn(this.vgGrid.group);

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

        this.vgGrid.group.add(this.nodesGroup);
        this.vgGrid.group.add(this.edgesGroup);
        this.vgGrid.group.add(this.group);

        this.mouse = new vg.MouseCaster(this.scene.scene, this.scene.camera, element);

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
        var coord1Position = this.coordToPixel(node.coord1);
        var coord2Position = this.coordToPixel(node.coord2);
        var coord3Position = this.coordToPixel(node.coord3);
        // coordPosition is the center of a hex in world coordinates
        // the center of three world positions is the position of the node
        var centroidX = (coord1Position.x + coord2Position.x + coord3Position.x) / 3;
        var centroidZ = (coord1Position.z + coord2Position.z + coord3Position.z) / 3;
        return new THREE.Vector3(centroidX, 2, centroidZ);
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