var proto = require("../data_pb");
// var pbjs = require("protobufjs");
import {GameAction} from "./actions/gameAction.js";
import {BuildTown} from "./actions/buildTown.js";
import {BuildRoad} from "./actions/buildRoad.js";
import {BuildCity} from "./actions/buildCity.js";
import {BuyDevelopmentCard} from "./actions/buyDevelopmentCard.js";
import {PlayDevelopmentCard} from "./actions/playDevelopmentCard.js";
import {RollDice} from "./actions/rollDice.js";
import {Node} from "./node.js";
import { YearOfPlenty, Soldier, Monopoly, RoadBuilding, VictoryPoint } from "./developmentCard";
import { ClientRandom } from "./random";
import { TradeBank } from "./actions/tradeBank";
import { OfferTrade } from "./actions/offerTrade";
import { RejectOffer } from "./actions/rejectOffer";
import { CounterOffer } from "./actions/counterOffer";
import { TradePlayer } from "./actions/tradePlayer";
import { AcceptOffer } from "./actions/acceptOffer";

export class HostAtClient {
    constructor(game) {
        this.game = game;
        this.random = new ClientRandom();
        this.developmentCards = [
            new Soldier(), new Soldier(), new Soldier(), new Soldier(),
            new Soldier(), new Soldier(), new Soldier(), new Soldier(),
            new Soldier(), new Soldier(), new Soldier(), new Soldier(),
            new Soldier(), new Soldier(),
            new YearOfPlenty(), new YearOfPlenty(), 
            new Monopoly(), new Monopoly(),
            new RoadBuilding(), new RoadBuilding(),
            new VictoryPoint(), new VictoryPoint(), new VictoryPoint(), new VictoryPoint(), new VictoryPoint(),
        ];
        this.currentId = 0;
    }
    // TODO: keep separate instance of game to ensure serialization works properly
    send(actionMessage) {
        const binary = actionMessage.serializeBinary();
        // here, we send the message to the server
        // ... and receive it back
        const revived = proto.GameAction.deserializeBinary(binary);
        
        // instantiate action instance
        const action = this.createAction(revived);
        // set ids
        GameAction.setIds(action, revived);
        // set references?

        // send it to the game controller
        return new Promise((ok, fail) => {
            // const random = Math.random();
            // if (random > 0.5) {
                // fail(new Error(`random: ${random.toString()}`))
            // } else {
                this.identify(action);
                GameAction.setReferences(action, this.game);
                if (action.setReferences !== undefined) {
                    action.setReferences(this.game);
                }
                action.performServer(this);
                action.perform(this.game);
                if (game.queue.matches(action)) {
                    game.queue.dequeue(action);
                }
                this.game.actions.push(action);
                ok();
            // }
        });
    }
    identify(obj) {
        this.currentId += 1;
        obj.id = this.currentId;
    }
    createAction(actionMessage) {
        const a = actionMessage;
        if (a.hasBuildTown()) { return BuildTown.fromData(a.getBuildTown()); }
        if (a.hasBuildRoad()) { return BuildRoad.fromData(a.getBuildRoad()); }
        if (a.hasBuildCity()) { return BuildCity.fromData(a.getBuildCity()); }
        if (a.hasTradeBank()) { return TradeBank.fromData(a.getTradeBank()); }
        if (a.hasBuyDevelopmentCard()) { return BuyDevelopmentCard.fromData(a.getBuyDevelopmentCard()); }
        if (a.hasPlayDevelopmentCard()) { return PlayDevelopmentCard.fromData(a.getPlayDevelopmentCard()); }
        if (a.hasRollDice()) { return RollDice.fromData(a.getRollDice()); }
        if (a.hasOfferTrade()) { return OfferTrade.fromData(a.getOfferTrade()); }
        if (a.hasAcceptOffer()) { return AcceptOffer.fromData(a.getAcceptOffer()); }
        if (a.hasRejectOffer()) { return RejectOffer.fromData(a.getRejectOffer()); }
        if (a.hasCounterOffer()) { return CounterOffer.fromData(a.getCounterOffer()); }
        if (a.hasTradePlayer()) { return TradePlayer.fromData(a.getTradePlayer()); }
        throw new Error("Unsupported action in HostAtClient");
    }
}