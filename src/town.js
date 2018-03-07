var proto = require("../data_pb.js");
import { ResourceList } from "./resource";

export class Town {
    constructor(player, node) {
        this.node = node;
        this.player = player;
        this.victoryPoints = 1;
        this.name = "town";
    }
    produce(hex) {
        return [hex.resourceType];
    }
    static get cost() {
        return new ResourceList([
            proto.ResourceType.TIMBER,
            proto.ResourceType.WHEAT,
            proto.ResourceType.SHEEP,
            proto.ResourceType.BRICK,
        ]);
    }
    addToPlayer(player) {
        player.towns.set(this.node, this);
        player.victoryPoints.push(this);
        player.nodePieces.set(this.node, this);
        player.stock.towns -= 1;
        player.producers.set(this.node, this);
    }
    removeFromPlayer(player) {
        player.towns.delete(this.node);
        player.victoryPoints.remove(this);
        player.nodePieces.delete(this.node);
        player.stock.towns += 1;
        player.producers.delete(this.node);
    }
    addToBoard(board) {
        board.towns.set(this.node, this);
        board.nodePieces.set(this.node, this);
        board.producersByNode.set(this.node, this)
    }
    removeFromBoard(board) {
        board.towns.delete(this.node);
        board.nodePieces.delete(this.node);
        board.producersByNode.delete(this.node, this)
    }
}