var proto = require("../data_pb");
// var pbjs = require("protobufjs");
import {GameAction} from "./actions/gameAction.js";
import {BuildTown} from "./actions/buildTown.js";
import {BuildRoad} from "./actions/buildRoad.js";
import {BuildCity} from "./actions/buildCity.js";
import {BuyDevelopmentCard} from "./actions/buyDevelopmentCard.js";
import {Node} from "./node.js";

export class HostAtClient {
    constructor(receiver, game) {
        this.receiver = receiver;
        this.game = game;
    }
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
        //
        // this.receiver.receive(action);
        return new Promise((ok, fail) => {
            // const random = Math.random();
            // if (random > 0.5) {
                // fail(new Error(`random: ${random.toString()}`))
            // } else {
                GameAction.setReferences(action, this.game);
                action.perform(this.game);
                this.game.actions.push(action);
                ok();
            // }
        });
    }
    createAction(actionMessage) {
        const a = actionMessage;
        if (a.hasBuildTown()) { return BuildTown.fromData(a.getBuildTown()); }
        if (a.hasBuildRoad()) { return BuildRoad.fromData(a.getBuildRoad()); }
        if (a.hasBuildCity()) { return BuildCity.fromData(a.getBuildCity()); }
        if (a.hasBuyDevelopmentCard()) { return BuyDevelopmentCard.fromData(a.getBuyDevelopmentCard()); }
        throw new Error("Unsupported action in HostAtClient");
    }
}