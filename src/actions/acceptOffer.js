import { jsettlers as pb } from "../../src/generated/data";
import {GameAction} from "./gameAction.js";

export class AcceptOffer extends GameAction {
    constructor(config) {
        super(config);

        config = config || {};
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
        this.tradeOffer.responses.set(this.player, this);
        game.phase.acceptOffer(game, this);
    }
    get data() {
        return pb.GameAction.create({
            playerId: this.player.id,
            acceptOffer: {
                tradeOfferId: this.tradeOffer.id
            }
        });
    }
    static fromData(data, game) {
        const player = game.getPlayerById(data.playerId);
        const offer = game.getActionById(data.acceptOffer.tradeOfferId);
        return new AcceptOffer({
            player: player,
            tradeOffer: offer
        });
    }
}