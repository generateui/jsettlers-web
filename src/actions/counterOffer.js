var proto = require("../../data_pb");
import {GameAction} from "./gameAction.js";

export class CounterOffer extends GameAction {
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
    static createData(player, tradeOffer, offered, wanted) {
        const counterOffer = new proto.CounterOffer();
        counterOffer.setOfferedList(offered);
        counterOffer.setWantedList(wanted);
        counterOffer.setTradeOfferId(tradeOffer.id);
        const action = new proto.GameAction();
        action.setPlayerId(player.id);
        action.setCounterOffer(counterOffer);
        return action;
    }
    static fromData(data) {
        const counterOffer = new CounterOffer();
        counterOffer.offered = data.getOfferedList();
        counterOffer.wanted = data.getWantedList();
        counterOffer.tradeOfferId = data.getTradeOfferId();
        return counterOffer;
    }
}