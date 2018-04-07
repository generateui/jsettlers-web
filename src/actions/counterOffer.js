import { jsettlers as pb } from "../../src/generated/data";
import {GameAction} from "./gameAction.js";
import { ResourceList } from "../resource.js";

export class CounterOffer extends GameAction {
    constructor(config) {
        super(config);

        config = config || {};
        this.offered = config.offered; // ResourceList
        this.wanted = config.wanted; // ResourceList
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
        const tradeOffer = game.getActionById(this.tradeOfferId);
        tradeOffer.responses.set(this.player, this);
        game.phase.counterOffer(game, this);
    }
    get data() {
        return pb.GameAction.create({
            playerId: this.player.id,
            counterOffer: {
                offered: this.offered.toResourceTypeArray(),
                wanted: this.wanted.toResourceTypeArray(),
                tradeOfferId: this.tradeOffer.id,
            }
        });
    }
    static fromData(data, game) {
        const player = game.getPlayerById(data.playerId);
        const offer = game.getActionById(data.counterOffer.tradeOfferId);
        return new CounterOffer({
            player: player,
            offered: new ResourceList(data.counterOffer.offered),
            wanted: new ResourceList(data.counterOffer.wanted),
            tradeOffer: offer
        });
    }
}