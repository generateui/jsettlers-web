import { jsettlers as pb } from "../../src/generated/data";
import { GameAction } from "./gameAction";
import { ResourceList } from "../resource";

export class RobPlayer extends GameAction {
    constructor(config) {
        super(config);

        config = config || {};
        this.opponent = config.opponent || null; // can be null to rob no one
        this.resources = config.resources || null; // can be null when opponent is null
    }
    perform(game) {
        if (this.opponent !== null) {
            this.player.resources.moveFrom(this.opponent.resources, this.resources);
        }
        game.phase.robPlayer(game, this);
    }
    performAtHost(hostGame) {
        if (this.opponent !== null) {
            const index = hostGame.random.intFromZero(this.opponent.resources.length - 1);
            const resource = this.opponent.resources.toArray()[index];
            this.resources = new ResourceList(resource);
        }
    }
    static fromData(data, game) {
        const player = game.getPlayerById(data.playerId);
        let opponent = null;
        if (data.robPlayer.opponentId !== undefined) {
            opponent = game.getPlayerById(data.robPlayer.opponentId);
        }
        let resources = null;
        if (data.robPlayer.resourceType) {
            resources = new ResourceList(data.robPlayer.resourceType);
        }
        return new RobPlayer({
            player: player,
            opponent: opponent,
            resources: resources
        });
    }
    get data() {
        const data = pb.GameAction.create({
            playerId: this.player.id,
            robPlayer: { }
        });
        if (this.opponent !== null) {
            data.robPlayer.opponentId = this.opponent.id;
        }
        if (this.resources !== null) {
            data.robPlayer.resourceType = this.resources.toResourceTypeArray()[0];
        }
        return data;
    }
}