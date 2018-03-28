var proto = require("../../src/generated/data_pb");
import { GameAction } from "./gameAction";
import { DevelopmentCard } from "../developmentCard";

export class PlayDevelopmentCard extends GameAction {
    constructor(config) {
        super();
        
        config = config || {};
        this.player = config.player;
        this.developmentCard = config.developmentCard;
    }
    static fromData(data) {
        const developmentCard = DevelopmentCard.fromData(data.getDevelopmentCard());
        return new PlayDevelopmentCard({developmentCard: developmentCard});
    }
    setReferences(game) {
        if (this.developmentCard.setReferences !== undefined) {
            this.developmentCard.setReferences(game);
        }
    }
    perform(game) {
        this.developmentCard.play(game, this.player);
        const toRemove = this.player.developmentCards
            .find(dc => dc.constructor.name === this.developmentCard.constructor.name)
        this.player.developmentCards.remove(toRemove);
        this.player.playedDevelopmentCards.push(this.developmentCard); // this instance retains the info
        game.phase.playDevelopmentCard(game, this);
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