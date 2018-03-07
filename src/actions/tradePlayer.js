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
    constructor() {
        super();
        this.tradeOfferId = null;
        this.tradeResponseId = null;
    }
    perform(game) {
        const tradeOffer = game.getActionById(this.tradeOfferId);
        const tradeResponse = game.getActionById(this.tradeResponseId);
        let offered = null;
        let wanted = null;
        const opponent = tradeResponse.player;

        if (tradeResponse instanceof AcceptOffer) {
            offered = new ResourceList(tradeOffer.offered);
            wanted = new ResourceList(tradeOffer.wanted);
        } else if (tradeResponse instanceof CounterOffer) {
            // CounterOffer is from the perspective of the opponent, so swap
            offered = new ResourceList(tradeResponse.wanted);
            wanted = new ResourceList(tradeResponse.offered);
        }
        opponent.resources.moveFrom(this.player.resources, offered);
        this.player.resources.moveFrom(opponent.resources, wanted);
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