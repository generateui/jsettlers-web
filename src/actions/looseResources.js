var proto = require("../../data_pb");
import { GameAction } from "./gameAction";
import { ResourceList } from "../resource";

export class LooseResources extends GameAction {
    constructor() {
        super();

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
    get youShouldMessage() {
        const amount = this.player.resources.halfCount;
        return `you should discard ${amount} resources`;
    }
    get opponentShouldMessage() {
        const amount = this.player.resources.halfCount;
        const player = `player ${this.player.id}`;
        const user = this.player.user.name;
        return `${user} (${player}) should discard ${amount} resources`;
    }
}