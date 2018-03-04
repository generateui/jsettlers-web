var proto = require("../../data_pb");
import {GameAction} from "./gameAction.js";

export class RejectOffer extends GameAction {
    constructor() {
        super();
    }
    get isTradeResponse() {
        return true;
    }
    perform(game) {
        const tradeOffer = game.getActionById(this.tradeOfferId);
        tradeOffer.responses.set(this.player, this);
    }
    static createData(player, tradeOffer, reason) {
        const rejectOffer = new proto.RejectOffer();
        rejectOffer.setTradeOfferId(tradeOffer.id);
        rejectOffer.setReason(reason);
        const action = new proto.GameAction();
        action.setPlayerId(player.id);
        action.setRejectOffer(rejectOffer);
        return action;
    }
    static fromData(data) {
        const rejectOffer = new RejectOffer();
        rejectOffer.reason = data.getReason();
        rejectOffer.tradeOfferId = data.getTradeOfferId();
        return rejectOffer;
    }
}