var proto = require("../data_pb");
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
        this.developmentCards = [];
    }
}