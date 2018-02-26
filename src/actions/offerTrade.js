var proto = require("../../data_pb");
import {GameAction} from "./gameAction.js";

export class OfferTrade extends GameAction {
    constructor() {
        super();

        this.responses = new Map(); // <Player, TradeResponse (RejectOffer|AcceptOffer|CounterOffer)>
    }
    perform(game) {
    }
    static createData(player, offered, wanted) {
        const offerTrade = new proto.OfferTrade();
        offerTrade.setOfferedList(offered);
        offerTrade.setWantedList(wanted);
        const action = new proto.GameAction();
        action.setPlayerId(player.id);
        action.setOfferTrade(offerTrade);
        return action;
    }
    static fromData(data) {
        const offerTrade = new OfferTrade();
        offerTrade.offered = data.getOfferedList();
        offerTrade.wanted = data.getWantedList();
        return offerTrade;
    }
}