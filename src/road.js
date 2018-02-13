export class Road {
    constructor(player, edge) {
        this.player = player;
        this.edge = edge;
    }
    addToPlayer(player) {
        player.roads.set(this.edge, this);
        player.edgePieces.set(this.edge, this);
        player.stock.roads -= 1;
    }
    removeFromPlayer(player) {
        player.roads.delete(this.edge);
        player.edgePieces.delete(this.edge);
        player.stock.roads += 1;
    }
    addToBoard(board) {
        board.roads.set(this.edge, this);
        board.edgePieces.set(this.edge, this);
        // remove from pieces list?
    }
    removeFromBoard(board) {
        board.roads.delete(this.edge);
        board.edgePieces.delete(this.edge);
    }
}