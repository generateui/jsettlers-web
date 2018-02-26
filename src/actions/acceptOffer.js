var proto = require("../../data_pb");
import {GameAction} from "./gameAction.js";

export class AcceptOffer extends GameAction {
    constructor() {
        super();
    }
    perform(game) {
        const tradeOffer = game.getActionById(this.tradeOfferId);
        tradeOffer.responses.set(this.player, this);
    }
    static createData(player, tradeOffer) {
        const acceptOffer = new proto.AcceptOffer();
        acceptOffer.setTradeOfferId(tradeOffer.id);
        const action = new proto.GameAction();
        action.setPlayerId(player.id);
        action.setAcceptOffer(acceptOffer);
        return action;
    }
    static fromData(data) {
        const acceptOffer = new AcceptOffer();
        acceptOffer.tradeOfferId = data.getTradeOfferId();
        return acceptOffer;
    }
}