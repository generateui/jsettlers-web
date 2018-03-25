var proto = require("./generated/data_pb");
import {ResourceList} from "./resource.js";

export class Bank {
    constructor() {
        this.resources = ResourceList.onlyWithTypes([
            proto.ResourceType.TIMBER,
            proto.ResourceType.WHEAT,
            proto.ResourceType.ORE,
            proto.ResourceType.SHEEP,
            proto.ResourceType.BRICK,
        ]);
        this.resources.addAmount(proto.ResourceType.TIMBER, 19);
        this.resources.addAmount(proto.ResourceType.WHEAT, 19);
        this.resources.addAmount(proto.ResourceType.ORE, 19);
        this.resources.addAmount(proto.ResourceType.SHEEP, 19);
        this.resources.addAmount(proto.ResourceType.BRICK, 19);
        this.developmentCards = [];
    }
}