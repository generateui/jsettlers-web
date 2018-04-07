import { jsettlers as pb } from "../../src/generated/data";
import {Town} from "../town.js";
import {GameAction} from "./gameAction.js";
import {Node} from "../node.js";

export class BuildTown extends GameAction {
    constructor(config) {
        super(config);

        config = config || {};
        this.node = config.node;
        this.portAdded = null; // when the player built on a port
        this.resourcesGained = null; // in initialplacement phase
    }
    perform(game) {
        const town = new Town(this.player, this.node);
        if (game.board.portsByNode.has(town.node)) {
            const port = game.board.portsByNode.get(town.node);
            this.player.ports.add(port);
            this.portAdded = true;
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
    static fromData(data, game) {
        const player = game.getPlayerById(data.playerId);
        const node = Node.fromData(data.buildTown.node);
        return new BuildTown({
            player: player,
            node: node
        });
    }
    get data() {
        return pb.GameAction.create({
            playerId: this.player.id,
            buildTown: {
                node: this.node.data
            }
        });
    }
    static parse(buildTownExpression, resolver) {
        const expr = buildTownExpression;
        const player = resolver.parsePlayer(expr.player());
        const node = resolver.parseNode(expr.node());
        return new BuildTown({ player: player, node: node });
    }
}