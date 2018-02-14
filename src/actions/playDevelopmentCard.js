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
        const toRemove = player.developmentCards.find(dc => typeof(dc) === typeof(this.developmentCard))
        player.developmentCards.remove(toRemove);
        player.playedDevelopmentCards.push(this.developmentCard); // this instance retains the info
    }
}