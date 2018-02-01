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
        const color = new THREE.Color(this.hex.color);
        const tile = boardRenderer.vgGrid.tilesByCoord.get(coord);
        tile.material.color = color;
        tile.mesh.userData.structure = this;
        this.mesh = tile.mesh;
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
        const tile = boardRenderer.vgGrid.tilesByCoord.get(coord);
        tile.material.color = color;
        this.removeChitChangedSubscription();
        this.removePortChangedSubscription();
        this.removePortChangedSubscription = this.hex.portChanged(this.portChanged);
        this.removeChitChangedSubscription = this.hex.chitChanged(this.chitChanged);
    }
}