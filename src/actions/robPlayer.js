var proto = require("../../data_pb");
import { GameAction } from "./gameAction";
import { ResourceList } from "../resource";

export class RobPlayer extends GameAction {
    constructor() {
        super();

        this.opponentId = null;
        this.opponent = null;
        this.resourceType = null;
    }
    perform(game) {
        const stolen = new ResourceList();
        stolen.add(this.resourceType);
        this.player.resources.moveFrom(this.opponent.resources, stolen);
    }
    performServer(host) {
        const index = host.random.intFromZero(this.opponent.resources.length - 1);
        const resource = this.opponent.resources.toArray()[index];
        this.resourceType = resource.type;
    }
    setReferences(game) {
        this.opponent = game.getPlayerById(this.opponentId);
    }
    static fromData(data) {
        const robPlayer = new RobPlayer();
        robPlayer.opponentId = data.getOpponentId();
        robPlayer.resourceType = data.getResourceType();
        return robPlayer;
    }
    static createData(player, opponent) {
        const robPlayer = new proto.RobPlayer();
        robPlayer.setOpponentId(opponent.id);
        const action = new proto.GameAction();
        action.setPlayerId(player.id);
        action.setRobPlayer(robPlayer);
        return action;
    }
}