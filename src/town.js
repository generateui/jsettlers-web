import { jsettlers as pb } from "../src/generated/data";
import { ResourceList } from "./resource";
import { Node } from "./node";

export class Town {
    constructor(player, node) {
        this.node = node;
        this.player = player;
        this.victoryPoints = 1;
        this.name = "Town";
    }
    get data() {
        return pb.Town.create({
            node: this.node.data
        });
    }
    static fromData(data) {
        const node = Node.fromData(data.node);
        return new Town(null, node);
    }
    produce(hex) {
        return hex.resourceType == undefined ? [] : [hex.resourceType];
    }
    static get cost() {
        return new ResourceList([
            pb.ResourceType.Timber,
            pb.ResourceType.Wheat,
            pb.ResourceType.Sheep,
            pb.ResourceType.Brick,
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