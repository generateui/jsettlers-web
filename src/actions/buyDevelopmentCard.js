var proto = require("../../src/generated/data_pb");

import {GameAction} from "./gameAction.js";
import { DevelopmentCard, VictoryPoint, YearOfPlenty, RoadBuilding, 
    Monopoly, Soldier} from "../developmentCard.js";

export class BuyDevelopmentCard extends GameAction {
    constructor(config) {
        super();

        config = config || {};
        this.player = config.player;
        this.developmentCard = null;
    }
    static fromData(data) {
        const buyDev = new BuyDevelopmentCard();
        if (data.hasDevelopmentCard()) {
            buyDev.developmentCard = DevelopmentCard.fromData(
                data.getDevelopmentCard());
        }
        return buyDev;
    }
    static createData(player, developmentCard) {
        const action = new proto.GameAction();
        action.setPlayerId(player.id);
        const buyDev = new proto.BuyDevelopmentCard();
        if (developmentCard instanceof VictoryPoint) {
            buyDev.setVictoryPoint(developmentCard.data);
        } else if(developmentCard instanceof Soldier) {
            buyDev.setSoldier(developmentCard.data);
        } else if(developmentCard instanceof RoadBuilding) {
            buyDev.setRoadBuilding(developmentCard.data);
        } else if(developmentCard instanceof YearOfPlenty) {
            buyDev.setYearOfPlenty(developmentCard.data);
        } else if(developmentCard instanceof Monopoly) {
            buyDev.setMonopoly(developmentCard.data);
        }
        action.setBuyDevelopmentCard(buyDev);
        return action;
    }
    static parse(buyDevelopmentCardExpression, resolver) {
        const expr = buyDevelopmentCardExpression;
        const player = resolver.parsePlayer(expr.player());
        let developmentCard = null;
        if (expr.developmentCard() !== null) {
            developmentCard = DevelopmentCard.parse(expr.developmentCard());
        }
        return new BuyDevelopmentCard({ 
            player: player, 
            developmentCard: developmentCard
        });
    }
    perform(game) {
        this.player.developmentCards.push(this.developmentCard);
    }
    performServer(host) {
        const index = host.random.intFromZero(host.developmentCards.length);
        const developmentCard = host.developmentCards[index];
        host.developmentCards.remove(developmentCard);
        this.developmentCard = developmentCard;
    }
}