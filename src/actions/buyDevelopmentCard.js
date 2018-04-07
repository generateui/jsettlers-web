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
    performAtHost(hostGame) {
        const index = hostGame.random.intFromZero(hostGame.game.developmentCards.length);
        const developmentCard = hostGame.game.developmentCards[index];
        developmentCard.turnBoughtIndex = hostGame.game.playTurns.turn.number;
        hostGame.game.developmentCards.remove(developmentCard);
        this.developmentCard = developmentCard;
    }
}