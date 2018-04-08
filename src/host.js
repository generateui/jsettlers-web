import { jsettlers as pb } from "../src/generated/data";
import { GameAction } from "./actions/gameAction.js";
import { BuildTown } from "./actions/buildTown.js";
import { BuildRoad } from "./actions/buildRoad.js";
import { BuildCity } from "./actions/buildCity.js";
import { BuyDevelopmentCard } from "./actions/buyDevelopmentCard.js";
import { PlayDevelopmentCard } from "./actions/playDevelopmentCard.js";
import { RollDice } from "./actions/rollDice.js";
import { Node } from "./node.js";
import { YearOfPlenty, Soldier, Monopoly, RoadBuilding, VictoryPoint } from "./developmentCard";
import { ClientRandom } from "./random";
import { TradeBank } from "./actions/tradeBank";
import { OfferTrade } from "./actions/offerTrade";
import { RejectOffer } from "./actions/rejectOffer";
import { CounterOffer } from "./actions/counterOffer";
import { TradePlayer } from "./actions/tradePlayer";
import { AcceptOffer } from "./actions/acceptOffer";
import { MoveRobber } from "./actions/moveRobber";
import { RobPlayer } from "./actions/robPlayer";
import { LooseResources } from "./actions/looseResources";
import { StartGame } from "./actions/startGame";
import { EndTurn } from "./actions/endTurn";
import { ClaimVictory } from "./actions/claimVictory";
import { GameActionHelper } from "./actions/gameActionHelper";

/** wraps a Game instance and provides additional state known to the host only */
export class HostGame {
    constructor(game) {
        this.game = game;
        this.random = new ClientRandom();
        this.currentId = 0;
    }
    performAtHost(action) {
        this.setId(action);
        action.performAtHost(this);
        if (!this.game.expectation.matches(action)) {
            // what to do here?
        }
        this.game.expectation.meet(action);
        action.perform(this.game);
        this.game.actions.push(action);
    }
    setId(obj) {
        this.currentId += 1;
        obj.id = this.currentId;
    }
}
/** authority to receive and send messages */
export class HostAtClient {
    constructor(game) {
        this.hostGame = new HostGame(game);
        this.bots = [];
    }
    addBot(bot) {
        this.bots.push(bot);
    }
    // TODO: keep separate instance of game to ensure serialization works properly
    send(gameAction) {
        const binary = pb.GameAction.encode(gameAction.data).finish();
        // here, we send the message to the server
        // ... and receive it back
        const revived = pb.GameAction.decode(binary);
        
        // instantiate action instance
        const action = GameActionHelper.fromData(revived, this.hostGame.game);

        // send it to the game controller
        return new Promise((ok, fail) => {
            const game = this.hostGame.game;
            this.hostGame.performAtHost(action);
            ok();
        });
    }
}
export class HostAtClientWithWorkers {

}