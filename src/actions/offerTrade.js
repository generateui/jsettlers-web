var proto = require("../../data_pb");
import {GameAction} from "./gameAction";
import {ResourceList} from "../resource";

export class OfferTrade extends GameAction {
    constructor() {
        super();

        this.responses = new Map(); // <Player, TradeResponse (RejectOffer|AcceptOffer|CounterOffer)>
        this.offered = null; // ResourceType[]
        this.wanted = null; // ResourceType[]
        this.offeredResourceList = null;
        this.wantedResourceList = null;
    }
    perform(game) {
        game.phase.offerTrade(game, this);
    }
    setReferences(game) {
        this.offeredResourceList = new ResourceList(this.offered);
        this.wantedResourceList = new ResourceList(this.wanted);
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