import { jsettlers as pb } from "../../src/generated/data";
import {GameAction} from "./gameAction.js";

export class AcceptOffer extends GameAction {
    constructor(config) {
        super();

        config = config || {};
        this.playerId = config.playerId;
        this.player = config.player;
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
        const offerTrade = game.getActionById(this.offerTradeId);
        offerTrade.responses.set(this.player, this);
        game.phase.acceptOffer(game, this);
    }
    get data() {
        return pb.GameAction.create({
            playerId: this.player.id,
            acceptOffer: {
                tradeOfferId: this.offerTradeId
            }
        });
    }
    static fromData(data) {
        return new AcceptOffer({
            playerId: data.playerId,
            tradeOfferId: data.acceptOffer.tradeOfferId
        });
    }
}