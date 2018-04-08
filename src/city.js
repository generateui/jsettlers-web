import { jsettlers as pb } from "../src/generated/data";
import { ResourceList } from "./resource";
import { Node } from "./node";

export class City {
    constructor(player, node) {
        this.player = player;
        this.node = node;
        this.victoryPoints = 2;
        this.name = "City";
    }
    get data() {
        return pb.City.create({
            node: this.node.data
        });
    }
    static fromData(data) {
        const node = Node.fromData(data.node);
        return new City(null, node);
    }
    produce(hex) {
        return hex.resourceType == undefined ? [] : 
            [hex.resourceType, hex.resourceType];
    }
    static get cost() {
        return new ResourceList([
            pb.ResourceType.Wheat,
            pb.ResourceType.Wheat,
            pb.ResourceType.Ore,
            pb.ResourceType.Ore,
            pb.ResourceType.Ore,
        ]);
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
        board.producersByNode.set(this.node, this)
        // remove from pieces list?
    }
    removeFromBoard(board) {
        board.cities.delete(this.node);
        board.nodePieces.delete(this.node);
        board.producersByNode.delete(this.node, this)
    }
}