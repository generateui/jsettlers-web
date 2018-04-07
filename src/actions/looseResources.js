import { jsettlers as pb } from "../../src/generated/data";
import { GameAction } from "./gameAction";
import { ResourceList } from "../resource";

export class LooseResources extends GameAction {
    constructor(config) {
        super(config);

        config = config || {};
        this.resources = config.resources;
    }
    perform(game) {
        const lost = new ResourceList();
        lost.add(this.resources);
        game.bank.resources.moveFrom(this.player.resources, lost);
    }
    static fromData(data, game) {
        const player = game.getPlayerById(data.playerId);
        return new LooseResources({
            player: player,
            resources: new ResourceList(data.looseResources.resources) 
        });
    }
    get data() {
        return pb.GameAction.create({
            playerId: this.player.id,
            looseResources: {
                resources: this.resources.toResourceTypeArray()
            }
        });
    }
    static parse(looseResourcesExpression, resolver) {
        const expr = looseResourcesExpression;
        const player = resolver.parsePlayer(expr.player);
        const resources = ResourceList.parse(expr.resourceSet());
        return new LooseResources({ player: player, resources: resources });
    }
}