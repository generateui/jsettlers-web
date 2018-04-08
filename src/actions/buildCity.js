import { jsettlers as pb } from "../../src/generated/data";
import { City } from "../city.js";
import { Town } from "../town.js";
import { GameAction } from "./gameAction.js";
import { Node } from "../node.js";

export class BuildCity extends GameAction {
    constructor(config) {
        super(config);

        config = config || {};
        this.node = config.node;
    }
    perform(game) {
        const town = game.board.towns.get(this.node);
        town.removeFromPlayer(this.player);
        town.removeFromBoard(game.board);
        const city = new City(this.player, this.node);
        city.addToPlayer(this.player);
        city.addToBoard(game.board);
        game.bank.resources.moveFrom(this.player.resources, City.cost);
    }
    static fromData(data, game) {
        const player = game.getPlayerById(data.playerId);
        return new BuildCity({
            player: player,
            node: Node.fromData(data.buildCity.node)
        });
    }
    get data() {
        return pb.GameAction.create({
            playerId: this.player.id,
            buildCity: {
                node: this.node.data
            }
        });
    }
    static parse(buildCityExpression, resolver) {
        const expression = buildCityExpression;
        const player = resolver.parsePlayer(expression.player());
        const node = resolver.parseNode(expression.node());
        return new BuildCity({ player: player, node: node });
    }
    static parse(buildCityExpression, resolver) {
        const expression = buildCityExpression;
        const player = resolver.parsePlayer(expression.player());
        const node = resolver.parseNode(expression.node());
        return new BuildCity({ player: player, node: node });
    }
}