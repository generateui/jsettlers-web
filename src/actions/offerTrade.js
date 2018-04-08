import { jsettlers as pb } from "../../src/generated/data";
import { GameAction } from "./gameAction";
import { ResourceList } from "../resource";

export class OfferTrade extends GameAction {
    constructor(config) {
        super(config);

        // TODO: put responses in pb data?
        config = config || {};
        this.responses = new Map(); // <Player, TradeResponse (RejectOffer|AcceptOffer|CounterOffer)>
        this.offered = config.offered; // ResourceList
        this.wanted = config.wanted; // ResourceList
    }
    perform(game) {
        game.phase.offerTrade(game, this);
    }
    get data() {
        return pb.GameAction.create({
            playerId: this.player.id,
            offerTrade: {
                wanted: this.wanted.toResourceTypeArray(),
                offered: this.offered.toResourceTypeArray()
            }
        });
    }
    static fromData(data, game) {
        const player = game.getPlayerById(data.playerId);
        return new OfferTrade({
            player: player,
            offered: new ResourceList(data.offerTrade.offered),
            wanted: new ResourceList(data.offerTrade.wanted)
        });
    }
}