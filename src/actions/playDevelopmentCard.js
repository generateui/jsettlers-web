import { jsettlers as pb } from "../../src/generated/data";
import { GameAction } from "./gameAction";
import { DevelopmentCard } from "../developmentCard";

export class PlayDevelopmentCard extends GameAction {
    constructor(config) {
        super(config);
        
        config = config || {};
        this.developmentCard = config.developmentCard;
    }
    static fromData(data, game) {
        const player = game.getPlayerById(data.playerId);
        const developmentCard = DevelopmentCard.fromData(
            data.playDevelopmentCard.developmentCard, game);
        return new PlayDevelopmentCard({
            player: player,
            developmentCard: developmentCard
        });
    }
    perform(game) {
        this.developmentCard.play(game, this.player);
        const toRemove = this.player.developmentCards
            .find(dc => dc.constructor.name === this.developmentCard.constructor.name)
        this.player.developmentCards.remove(toRemove);
        this.player.playedDevelopmentCards.push(this.developmentCard); // this instance retains the info
        game.phase.playDevelopmentCard(game, this);
    }
    get data() {
        return pb.GameAction.create({
            playerId: this.player.id,
            playDevelopmentCard: {
                developmentCard: this.developmentCard.data
            }
        });
    }
}