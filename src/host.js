var proto = require("../data_pb");
// var pbjs = require("protobufjs");
import {BuildTown} from "./actions/buildTown.js";
import {Node} from "./node.js";

export class HostAtClient {
    constructor(receiver) {
        this.receiver = receiver;
    }
    send(actionMessage) {
        const binary = actionMessage.serializeBinary();
        // here, we send the message to the server
        // ... and receive it back
        const revived = proto.GameAction.deserializeBinary(binary);
        // instantiate action instance
        const action = this.createAction(revived);
        // send it to the game controller
        this.receiver.receive(action);
    }
    createAction(actionMessage) {
        const a = actionMessage;
        if (a.hasBuildtown()) {
            const btData = a.getBuildtown();
            return BuildTown.fromData(btData);
        }
    }
}