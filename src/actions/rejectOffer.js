import { jsettlers as pb } from "../../src/generated/data";
import {GameAction} from "./gameAction.js";

export class RejectOffer extends GameAction {
    constructor(config) {
        super();

        config = config || {};
        this.playerId = config.playerId;
        this.player = config.player;
        this.reason = config.reason || pb.RejectOffer.Reason.NotGiven;
        this.tradeOffer = config.tradeOffer || null;
        if (config.tradeOfferId !== undefined) {
            this.tradeOfferId = config.tradeOfferId;
        } else if (config.tradeOffer !== undefined) {
            this.tradeOfferId = config.tradeOffer.id;
        }
    }
    get isTradeResponse() {
        return true;
    }
    perform(game) {
        const tradeOffer = game.getActionById(this.tradeOfferId);
        tradeOffer.responses.set(this.player, this);
        game.phase.rejectOffer(game, this);
    }
    get data() {
        return pb.GameAction.create({
            playerId: this.player.id,
            rejectOffer: {
                reason: this.reason,
                tradeOfferId: this.tradeOfferId
            }
        });
    }
    static fromData(data) {
        return new RejectOffer({
            playerId: data.playerId,
            reason: data.rejectOffer.reason,
            tradeOfferId: data.rejectOffer.tradeOfferId
        });
    }
}