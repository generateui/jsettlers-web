var proto = require("../../src/generated/data_pb");
import { GameAction } from "./gameAction";
import { ResourceList } from "../resource";

export class LooseResources extends GameAction {
    constructor(config) {
        super();

        config = config || {};
        this.player = config.player;
        this.resources = null;
    }
    perform(game) {
        const lost = new ResourceList();
        lost.add(this.resources);
        game.bank.resources.moveFrom(this.player.resources, lost);
    }
    static fromData(data) {
        const looseResources = new LooseResources();
        looseResources.resources = new ResourceList(data.getResourcesList());
        return looseResources;
    }
    static createData(player, resourceList) {
        const action = new proto.GameAction();
        action.setPlayerId(player.id);
        const looseResources = new proto.LooseResources();
        looseResources.setResourcesList(resourceList.toResourceTypeArray());
        action.setLooseResources(looseResources);
        return action;
    }
    static parse(looseResourcesExpression, resolver) {
        const expr = looseResourcesExpression;
        const player = resolver.parsePlayer(expr.player);
        const resources = ResourceList.parse(expr.resourceSet());
        return new LooseResources({ player: player, resources: resources });
    }
}