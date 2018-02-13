export class City {
    constructor(player, node) {
        this.player = player;
        this.node = node;
    }
    addToPlayer(player) {
        player.cities.set(this.node, this);
        player.victoryPoints.push(this);
        player.nodePieces.set(this.node, this);
        player.stock.cities -= 1;
        player.producers.set(this.node, this);
    }
    removeFromPlayer(player) {
        player.cities.delete(this.node);
        player.victoryPoints.remove(this);
        player.nodePieces.delete(this.node);
        player.stock.cities += 1;
        player.producers.delete(this.node);
    }
    addToBoard(board) {
        board.cities.set(this.node, this);
        board.nodePieces.set(this.node, this);
        // remove from pieces list?
    }
    removeFromBoard(board) {
        board.cities.delete(this.node);
        board.nodePieces.delete(this.node);
    }
}