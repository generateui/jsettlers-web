import { jsettlers as pb } from "./generated/data";
import {ResourceList} from "./resource.js";
import { DevelopmentCard } from "./developmentCard";

export class Bank {
    constructor(config) {
        config = config || {};
        if (config.resources === undefined) {
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
        } else {
            this.resources = config.resources;
        }
        this.developmentCards = config.developmentCards || [];
    }
    static fromData(data, game) {
        const resources = new ResourceList(data.resources);
        const developmentCards = data.developmentCards
            .map(dcd => DevelopmentCard.fromData(dcd, game));
        return new Bank({
            resources: resources,
            developmentCards: developmentCards
        });
    }
    get data() {
        return pb.Bank.create({
            resources: this.resources.toResourceTypeArray(),
            developmentCards: this.developmentCards.map(dc => dc.data)
        });
    }
}