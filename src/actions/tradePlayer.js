var proto = require("../../data_pb");
import { GameAction } from "./gameAction.js";
import { AcceptOffer } from "./acceptOffer.js";
import { CounterOffer } from "./counterOffer.js";
import { ResourceList } from "../resource.js";

/** Trade with a player
 *  1. Player on turn offers a trade (TradeOffer)
 *  2. Opponents respond: Accept | Reject | Counter
 *  3. Player chooses an Accept or Counter
 *  4. TradePlayer is send with TradeOffer and Response (Accept|Counter) */
export class TradePlayer extends GameAction {
    constructor(config) {
        super();

        config = config || {};
        this.player = config.player;
        this.tradeOfferId = null;
        this.tradeResponseId = null;

        this.tradeOffer = null; // OfferTrade
        this.tradeResponse = null; // <AcceptOffer | CounterOffer>
        this.opponent = null; // Player
        this.offered = null; // ResourceList
        this.wanted = null; // ResourceList
    }
    perform(game) {
        this.opponent.resources.moveFrom(this.player.resources, this.offered);
        this.player.resources.moveFrom(this.opponent.resources, this.wanted);
    }
    setReferences(game) {
        this.tradeOffer = game.getActionById(this.tradeOfferId);
        this.tradeResponse = game.getActionById(this.tradeResponseId);
        this.opponent = this.tradeResponse.player;

        if (this.tradeResponse instanceof AcceptOffer) {
            this.offered = new ResourceList(this.tradeOffer.offered);
            this.wanted = new ResourceList(this.tradeOffer.wanted);
        } else if (this.tradeResponse instanceof CounterOffer) {
            // CounterOffer is from the perspective of the opponent, so swap
            this.offered = new ResourceList(this.tradeResponse.wanted);
            this.wanted = new ResourceList(this.tradeResponse.offered);
        }
    }
    static createData(player, tradeOffer, tradeResponse) {
        const tradePlayer = new proto.TradePlayer();
        tradePlayer.setTradeOfferId(tradeOffer.id);
        tradePlayer.setTradeResponseId(tradeResponse.id);
        const action = new proto.GameAction();
        action.setPlayerId(player.id);
        action.setTradePlayer(tradePlayer);
        return action;
    }
    static fromData(data) {
        const tradePlayer = new TradePlayer();
        tradePlayer.tradeOfferId = data.getTradeOfferId();
        tradePlayer.tradeResponseId = data.getTradeResponseId();
        return tradePlayer;
    }
}