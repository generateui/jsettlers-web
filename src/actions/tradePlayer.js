import { jsettlers as pb } from "../../src/generated/data";
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
        this.playerId = config.playerId;
        this.player = config.player;
        this.tradeOfferId = config.tradeOfferId || null;
        this.tradeResponseId = config.tradeResponseId || null;

        this.tradeOffer = config.tradeOffer; // OfferTrade
        this.tradeResponse = config.tradeResponse; // <AcceptOffer | CounterOffer>
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
            this.offered = this.tradeOffer.offered;
            this.wanted = this.tradeOffer.wanted;
        } else if (this.tradeResponse instanceof CounterOffer) {
            // CounterOffer is from the perspective of the opponent, so swap
            this.offered = this.tradeResponse.wanted;
            this.wanted = this.tradeResponse.offered;
        }
    }
    get data() {
        return pb.GameAction.create({
            playerId: this.player.id,
            tradePlayer: {
                tradeOfferId: this.tradeOffer.id,
                tradeResponseId: this.tradeResponse.id
            }
        });
    }
    static fromData(data) {
        return new TradePlayer({
            playerId: data.playerId,
            tradeOfferId: data.tradePlayer.tradeOfferId,
            tradeResponseId: data.tradePlayer.tradeResponseId
        });
    }
}