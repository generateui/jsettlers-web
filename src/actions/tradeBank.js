import { jsettlers as pb } from "../../src/generated/data";
import { ResourceList } from "../resource";
import { GameAction } from "./gameAction";

export class TradeBank extends GameAction {
    constructor(config) {
        super();

        config = config || {};
        this.playerId = config.playerId;
        this.player = config.player;
        this.offered = config.offered; // ResourceList
        this.wanted = config.wanted; // ResourceList
    }
    perform(game) {
        game.bank.resources.moveFrom(this.player.resources, this.offered);
        this.player.resources.moveFrom(game.bank.resources, this.wanted);
    }
    static fromData(data) {
        return new TradeBank({
            playerId: data.playerId,
            wanted: new ResourceList(data.tradeBank.wanted),
            offered: new ResourceList(data.tradeBank.offered)
        });
    }
    get data() {
        return pb.GameAction.create({
            playerId: this.player.id,
            tradeBank: {
                offered: this.offered.toResourceTypeArray(),
                wanted: this.wanted.toResourceTypeArray()
            }
        });
    }
}