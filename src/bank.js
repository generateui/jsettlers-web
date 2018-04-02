import { jsettlers as pb } from "./generated/data";
import {ResourceList} from "./resource.js";

export class Bank {
    constructor() {
        this.resources = ResourceList.onlyWithTypes([
            pb.ResourceType.Timber,
            pb.ResourceType.Wheat,
            pb.ResourceType.Ore,
            pb.ResourceType.Sheep,
            pb.ResourceType.Brick,
        ]);
        this.resources.addAmount(pb.ResourceType.Timber, 19);
        this.resources.addAmount(pb.ResourceType.Wheat, 19);
        this.resources.addAmount(pb.ResourceType.Ore, 19);
        this.resources.addAmount(pb.ResourceType.Sheep, 19);
        this.resources.addAmount(pb.ResourceType.Brick, 19);
        this.developmentCards = [];
    }
}