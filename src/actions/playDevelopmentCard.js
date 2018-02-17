var proto = require("../../data_pb");
import { GameAction } from "./gameAction";
import { DevelopmentCard } from "../developmentCard";

export class PlayDevelopmentCard extends GameAction {
    constructor() {
        super();
    }
    static fromData(data) {
        const playDevelopmentCard = new PlayDevelopmentCard();
        const developmentCard = DevelopmentCard.fromData(data.getDevelopmentCard());
        playDevelopmentCard.developmentCard = developmentCard;
        return playDevelopmentCard;
    }
    perform(game) {
        this.developmentCard.play(game, this.player);
        const toRemove = this.player.developmentCards
            .find(dc => dc.constructor.name === this.developmentCard.constructor.name)
        this.player.developmentCards.remove(toRemove);
        this.player.playedDevelopmentCards.push(this.developmentCard); // this instance retains the info
    }
    static createData(player, developmentCard) {
        const action = new proto.GameAction();
        const playDev = new proto.PlayDevelopmentCard();
        action.setPlayerId(player.id);
        playDev.setDevelopmentCard(developmentCard.data);
        action.setPlayDevelopmentCard(playDev);
        return action;
    }
}