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

export class HostAtClient {
    constructor(game) {
        this.game = game;
        this.random = new ClientRandom();
        this.developmentCards = [
            new Soldier(), new Soldier(), new Soldier(), new Soldier(),
            new Soldier(), new Soldier(), new Soldier(), new Soldier(),
            new Soldier(), new Soldier(), new Soldier(), new Soldier(),
            new Soldier(), new Soldier(),
            new YearOfPlenty(), new YearOfPlenty(), 
            new Monopoly(), new Monopoly(),
            new RoadBuilding(), new RoadBuilding(),
            new VictoryPoint(), new VictoryPoint(), new VictoryPoint(), new VictoryPoint(), new VictoryPoint(),
        ];
        this.currentId = 0;
        this.bots = [];
    }
    addBot(bot) {
        this.bots.push(bot);
    }
    // TODO: keep separate instance of game to ensure serialization works properly
    send(gameAction) {
        if (!(gameAction instanceof GameAction)) {
            throw new Error("host.js: not game action instance");
        }
        const binary = pb.GameAction.encode(gameAction.data).finish();
        // here, we send the message to the server
        // ... and receive it back
        const revived = pb.GameAction.decode(binary);
        
        // instantiate action instance
        const action = GameActionHelper.fromData(revived, this.game);
        // set ids
        // GameAction.setIds(action, revived);
        // set references?

        // send it to the game controller
        return new Promise((ok, fail) => {
            // const random = Math.random();
            // if (random > 0.5) {
                // fail(new Error(`random: ${random.toString()}`))
            // } else {
                this.identify(action);
                action.performServer(this);
                if (!game.expectation.matches(action)) {
                    // what to do here?
                }
                game.expectation.meet(action);
                action.perform(this.game);
                this.game.actions.push(action);
                ok();
            // }
        });
    }
    identify(obj) {
        this.currentId += 1;
        obj.id = this.currentId;
    }
}