var proto = require("../../src/generated/data_pb");
import {GameAction} from "./gameAction.js";

export class AcceptOffer extends GameAction {
    constructor(config) {
        super();

        config = config || {};
        this.player = config.player;
        this.offerTradeId = null;
    }
    get isTradeResponse() {
        return true;
    }
    perform(game) {
        const offerTrade = game.getActionById(this.offerTradeId);
        offerTrade.responses.set(this.player, this);
        game.phase.acceptOffer(game, this);
    }
    static createData(player, offerTrade) {
        const acceptOffer = new proto.AcceptOffer();
        acceptOffer.setTradeOfferId(offerTrade.id);
        const action = new proto.GameAction();
        action.setPlayerId(player.id);
        action.setAcceptOffer(acceptOffer);
        return action;
    }
    static fromData(data) {
        const acceptOffer = new AcceptOffer();
        acceptOffer.offerTradeId = data.getTradeOfferId();
        return acceptOffer;
    }
}