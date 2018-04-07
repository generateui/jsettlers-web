import { BuildTown } from "./buildTown";
import { BuildRoad } from "./buildRoad";
import { BuildCity } from "./buildCity";
import { TradeBank } from "./tradeBank";
import { BuyDevelopmentCard } from "./buyDevelopmentCard";
import { PlayDevelopmentCard } from "./playDevelopmentCard";
import { RollDice } from "./rollDice";
import { OfferTrade } from "./offerTrade";
import { AcceptOffer } from "./acceptOffer";
import { RejectOffer } from "./rejectOffer";
import { CounterOffer } from "./counterOffer";
import { TradePlayer } from "./tradePlayer";
import { MoveRobber } from "./moveRobber";
import { RobPlayer } from "./robPlayer";
import { LooseResources } from "./looseResources";
import { EndTurn } from "./endTurn";
import { ClaimVictory } from "./claimVictory";
import { StartGame } from "./startGame";

/** Circular references are not supported yet in babel, so deserializing a
derived GameAction instance *in* GameAction itself fails to compile. Until the 
time circular references are supported in babel (or babel is not needed anymore)
this separate class is required. */
export class GameActionHelper {
    static fromData(data, game) {
        if (data.buildTown) { return BuildTown.fromData(data, game); }
        if (data.buildRoad) { return BuildRoad.fromData(data, game); }
        if (data.buildCity) { return BuildCity.fromData(data, game); }
        if (data.tradeBank) { return TradeBank.fromData(data, game); }
        if (data.buyDevelopmentCard) { return BuyDevelopmentCard.fromData(data, game); }
        if (data.playDevelopmentCard) { return PlayDevelopmentCard.fromData(data, game); }
        if (data.rollDice) { return RollDice.fromData(data, game); }
        if (data.offerTrade) { return OfferTrade.fromData(data, game); }
        if (data.acceptOffer) { return AcceptOffer.fromData(data, game); }
        if (data.rejectOffer) { return RejectOffer.fromData(data, game); }
        if (data.counterOffer) { return CounterOffer.fromData(data, game); }
        if (data.tradePlayer) { return TradePlayer.fromData(data, game); }
        if (data.moveRobber) { return MoveRobber.fromData(data, game); }
        if (data.robPlayer) { return RobPlayer.fromData(data, game); }
        if (data.looseResources) { return LooseResources.fromData(data, game); }
        if (data.endTurn) { return EndTurn.fromData(data, game); }
        if (data.startGame) { return StartGame.fromData(data, game); }
        if (data.claimVictory) { return ClaimVictory.fromData(data, game); }
        throw new Error("Unsupported action in GameActionHelper");
    }
}
export class PlayerResolver {
    constructor(player) {
        this.player = player;
    }
    getPlayerById(id) {
        return this.player;
    }
}