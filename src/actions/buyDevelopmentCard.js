import { jsettlers as pb } from "../../src/generated/data";

import {GameAction} from "./gameAction.js";
import { DevelopmentCard, VictoryPoint, YearOfPlenty, RoadBuilding, 
    Monopoly, Soldier} from "../developmentCard.js";

export class BuyDevelopmentCard extends GameAction {
    constructor(config) {
        super(config);

        config = config || {};
        this.developmentCard = config.developmentCard || null;
    }
    static fromData(data, game) {
        const player = game.getPlayerById(data.playerId);
        let developmentCard = null;
        if (data.buyDevelopmentCard.developmentCard) {
            developmentCard = DevelopmentCard.fromData(
                data.buyDevelopmentCard.developmentCard, game);
        }
        return new BuyDevelopmentCard({
            player: player,
            developmentCard: developmentCard
        });
    }
    get data() {
        const dc = this.developmentCard;
        const action = new pb.GameAction.create({
            playerId: this.player.id
        });
        const buyDev = {};
        if (dc !== null) {
            buyDev.developmentCard = dc.data;
            // if (dc instanceof VictoryPoint) {
            //     buyDev.victoryPoint = dc.data;
            // } else if(dc instanceof Soldier) {
            //     buyDev.soldier = dc.data;
            // } else if(dc instanceof RoadBuilding) {
            //     buyDev.roadBuilding = dc.data;
            // } else if(dc instanceof YearOfPlenty) {
            //     buyDev.yearOfPlenty = dc.data;
            // } else if(dc instanceof Monopoly) {
            //     buyDev.monopoly = dc.data;
            // }
        }
        action.buyDevelopmentCard = buyDev;
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
        game.bank.resources.moveFrom(this.player.resources, DevelopmentCard.cost);
    }
    performServer(host) {
        const index = host.random.intFromZero(host.developmentCards.length);
        const developmentCard = host.developmentCards[index];
        developmentCard.turnBoughtIndex = host.game.playTurns.turn.number;
        host.developmentCards.remove(developmentCard);
        this.developmentCard = developmentCard;
    }
}