var proto = require("../../data_pb");
import {Town} from "../town.js";
import {GameAction} from "./gameAction.js";
import {Node} from "../node.js";

export class BuildTown extends GameAction {
    constructor(node) {
        super();
        this.node = node;
    }
    perform(game) {
        const town = new Town(this.player, this.node);
        if (game.board.portsByNode.has(town.node)) {
            const port = game.board.portsByNode.get(town.node);
            this.player.ports.add(port);
        }
        town.addToPlayer(this.player);
        town.addToBoard(game.board);
        const edges = town.node.edges;
        const edgePieces = game.board.edgePieces;
        const opponentHasSidePieceAtNode = 
            (edgePieces.has(edges[0]) && edgePieces.get(edges[0]).player !== this.player) ||
            (edgePieces.has(edges[1]) && edgePieces.get(edges[1]).player !== this.player) ||
            (edgePieces.has(edges[2]) && edgePieces.get(edges[2]).player !== this.player);
        if (opponentHasSidePieceAtNode) {
            game.calculateLongestRoad();
        }
        game.phase.buildTown(game, this);
    }
    static fromData(data) {
        const node = Node.fromData(data.getNode());
        return new BuildTown(node);
    }
    static createData(player, node) {
        const action = new proto.GameAction();
        action.setPlayerId(player.id);
        var bt = new proto.BuildTown();
        bt.setNode(node.data);
        action.setBuildTown(bt);
        return action;
    }
}