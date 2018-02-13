var proto = require("../../data_pb");

import {GameAction} from "./gameAction.js";
import { DevelopmentCard, VictoryPoint, YearOfPlenty, RoadBuilding, Monopoly, Soldier} from "../developmentCard.js";

export class BuyDevelopmentCard extends GameAction {
    constructor() {
        super();
    }
    static fromData(data) {
        const buyDev = new BuyDevelopmentCard();
        if (data.hasDevelopmentCard()) {
            buyDev.developmentCard = DevelopmentCard.fromData(data.getDevelopmentCard());
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
    perform(game) {
        this.player.developmentCards.push(this.developmentCard);
    }
}