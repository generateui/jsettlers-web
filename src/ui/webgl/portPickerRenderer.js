/** Renders a hex over a hovered hex to have user select one of six triangles */
class PortPickerRenderer extends Renderer {
    constructor(boardRenderer) {
        super();
        
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