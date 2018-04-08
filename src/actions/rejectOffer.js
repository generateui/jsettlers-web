import { jsettlers as pb } from "../../src/generated/data";
import {GameAction} from "./gameAction.js";

export class RejectOffer extends GameAction {
    constructor(config) {
        super(config);

        config = config || {};
        this.reason = config.reason || pb.RejectOffer.Reason.NotGiven;
        this.tradeOffer = config.tradeOffer || null;
    }
    get isTradeResponse() {
        return true;
    }
    perform(game) {
        this.tradeOffer.responses.set(this.player, this);
        game.phase.rejectOffer(game, this);
    }
    get data() {
        return pb.GameAction.create({
            playerId: this.player.id,
            rejectOffer: {
                reason: this.reason,
                tradeOfferId: this.tradeOffer.id
            }
        });
    }
    static fromData(data, game) {
        const player = game.getPlayerById(data.playerId);
        const offer = game.getActionById(data.rejectOffer.tradeOfferId);
        return new RejectOffer({
            player: player,
            reason: data.rejectOffer.reason,
            tradeOffer: offer
        });
    }
}