var proto = require("../../src/generated/data_pb");
import { GameAction } from "./gameAction";
import { ResourceList } from "../resource";

export class RobPlayer extends GameAction {
    constructor(config) {
        super();

        config = config || {};
        this.opponentId = config.opponent || null;
        this.player = config.player;

        this.opponent = null; // can be null to rob no one
        this.resourceType = null; // can be null when opponent is null
        this.resourceList = null;
    }
    perform(game) {
        if (this.opponent !== null) {
            const stolen = new ResourceList();
            stolen.add(this.resourceType);
            this.player.resources.moveFrom(this.opponent.resources, stolen);
        }
        game.phase.robPlayer(game, this);
    }
    performServer(host) {
        if (this.opponent !== null) {
            const index = host.random.intFromZero(this.opponent.resources.length - 1);
            const resource = this.opponent.resources.toArray()[index];
            this.resourceType = resource.type;
        }
    }
    setReferences(game) {
        if (this.opponentId !== null) {
            this.opponent = game.getPlayerById(this.opponentId);
        }
        if (this.resourceType !== null) {
            this.resourceList = new ResourceList(this.resourceType);
        }
    }
    static fromData(data) {
        const robPlayer = new RobPlayer();
        if (data.hasOpponentId()) {
            robPlayer.opponentId = data.getOpponentId();
        }
        if (data.hasResourceType()) {
            robPlayer.resourceType = data.getResourceType();
        }
        return robPlayer;
    }
    static createData(player, opponent) {
        const robPlayer = new proto.RobPlayer();
        if (opponent !== null) {
            robPlayer.setOpponentId(opponent.id);
        }
        const action = new proto.GameAction();
        action.setPlayerId(player.id);
        action.setRobPlayer(robPlayer);
        return action;
    }
}