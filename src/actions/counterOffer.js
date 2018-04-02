import { jsettlers as pb } from "../../src/generated/data";
import {GameAction} from "./gameAction.js";
import { ResourceList } from "../resource.js";

export class CounterOffer extends GameAction {
    constructor(config) {
        super();

        config = config || {};
        this.playerId = config.playerId;
        this.player = config.player;
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
    setReferences(game) {
        this.offeredResourceList = new ResourceList(this.offered);
        this.wantedResourceList = new ResourceList(this.wanted);
    }
    get data() {
        return pb.GameAction.create({
            playerId: this.player.id,
            counterOffer: {
                offered: this.offered.toResourceTypeArray(),
                wanted: this.wanted.toResourceTypeArray(),
                tradeOfferId: this.tradeOfferId,
            }
        });
    }
    static fromData(data) {
        return new CounterOffer({
            playerId: data.playerId,
            offered: new ResourceList(data.counterOffer.offered),
            wanted: new ResourceList(data.counterOffer.wanted),
            tradeOfferId: data.counterOffer.tradeOfferId
        });
    }
}