/* Behaviors dictate how a board should respond to user interaction
* This default behavior does nothing 
*/
class BoardBehavior {
    click(br, hex) { }
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
        boardRenderer.board.hexes[hex.coord.hash] = newHex;
        
        // update the hex renderer
        var hexRenderer = boardRenderer.hexRenderers.get(hex.coord.hash);
        hexRenderer.hex = newHex;
        hexRenderer.render(boardRenderer.vgGrid);
    }
}