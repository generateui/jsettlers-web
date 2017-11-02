/* Behaviors dictate how a board should respond to user interaction
* This default behavior does nothing 
*/
class BoardBehavior {
    start(boardRenderer) {} // set the behavior as active behavior on the BoardRenderer
    click(boardRenderer, hex) { }
    stop(boardRenderer) {} // unset the behavior
}

/* Sets a hex to target clicked hexagon location */
class SetHex extends BoardBehavior {
    constructor() {
        super();
        // the hextype to use for the setted hex
        this.hexType = proto.carcattone_data.HexType.FOREST; 
    }
    click(boardRenderer, hex) {
        // create and set the new hex to the board
        var newHex = Hex.fromType(this.hexType)
        newHex.coord = hex.coord;
        boardRenderer.board.hexes.set(hex.coord, newHex);
        
        // update the hex renderer
        var hexRenderer = boardRenderer.hexRenderers.get(hex.coord);
        hexRenderer.hex = newHex;
        hexRenderer.render(boardRenderer.vgGrid);
    }
}
class ShowAllNodes extends BoardBehavior {
    constructor() {
        super();
    }
    start(boardRenderer) {
        var nodes = boardRenderer.board.getAllNodes();
        boardRenderer.showNodes(nodes);
    }
    stop(boardRenderer) {
        boardRenderer.hideAllNodes();
    }
}

class ShowNodesOfClickedHex extends BoardBehavior {
    constructor() {
        super();
    }
    start(boardRenderer) {
        boardRenderer.hideAllNodes();
    }
    click(boardRenderer, hex) {
        var nodes = hex.coord.nodes;
        boardRenderer.showNodes(nodes);
    }
    stop(boardRenderer) {
        boardRenderer.hideAllNodes();
    }
}