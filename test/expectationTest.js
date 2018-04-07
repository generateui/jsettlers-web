import { jsettlers as pb } from "../src/generated/data"
import * as assert from "assert";
import { PortList, Any4To1Port, Timber2To1Port, Any3To1Port, 
    Wheat2To1Port, Sheep2To1Port, Clay2To1Port} from "../src/port";
import { Timber, ResourceList, Wheat, Brick, Ore, Sheep } from '../src/resource';
import { PlaySoldierOrRollDice, MoveRobberThenRobPlayer, PlayTurnActions, 
    LooseResourcesMoveRobberRobPlayer, BuildTownThenBuildRoad, 
    Expectation } from '../src/expectation';
import { Player } from '../src/player';
import { BuildRoad } from '../src/actions/buildRoad';
import { BuildTown } from '../src/actions/buildTown';
import { BuildCity } from '../src/actions/buildCity';
import { PlayDevelopmentCard } from '../src/actions/playDevelopmentCard';
import { Soldier } from '../src/developmentCard';
import { RollDice } from '../src/actions/rollDice';
import { Game } from '../src/game';
import { RobPlayer } from '../src/actions/robPlayer';
import { MoveRobber } from '../src/actions/moveRobber';
import { pseudoRandomBytes } from 'crypto';
import { TradeBank } from '../src/actions/tradeBank';
import { OfferTrade } from '../src/actions/offerTrade';
import { EndTurn } from '../src/actions/endTurn';
import { BuyDevelopmentCard } from '../src/actions/buyDevelopmentCard';
import { TradePlayer } from '../src/actions/tradePlayer';
import { CounterOffer } from '../src/actions/counterOffer';
import { AcceptOffer } from '../src/actions/acceptOffer';
import { RejectOffer } from '../src/actions/rejectOffer';
import { LooseResources } from '../src/actions/looseResources';

describe("PlaySoldierOrRollDice", () => {
    it("serializes", () => {
        const game = new Game();
        const player = new Player();
        game.playerOnTurn = player;
        const psord = new PlaySoldierOrRollDice(game);
        const playSoldier = new PlayDevelopmentCard({
            developmentCard: new Soldier(),
            player: player,
        });

        psord.meet(playSoldier);
        const buffer = pb.Expectation.encode(psord.data).finish();
        const revived = pb.Expectation.decode(buffer);
        const copy = Expectation.fromData(revived, game);

        assert.ok(copy.hasPlayedSoldier === true);
    });
    it("succeeds when only RollDice", () => {
        const game = new Game();
        const player = new Player();
        game.playerOnTurn = player;
        const playSoldierOrRollDice = new PlaySoldierOrRollDice(game);
        const rollDice = new RollDice({ player: player });

        assert.ok(playSoldierOrRollDice.matches(rollDice) === true);
        
        playSoldierOrRollDice.meet(rollDice);
        
        assert.ok(playSoldierOrRollDice.met === true);
    });
    it("suceeds when play soldier then RollDice", () => {
        const game = new Game();
        const player = new Player();
        game.playerOnTurn = player;
        const playSoldierOrRollDice = new PlaySoldierOrRollDice(game);
        const playSoldier = new PlayDevelopmentCard({
            developmentCard: new Soldier(),
            player: player,
        });
        const rollDice = new RollDice({ player: player });

        assert.ok(playSoldierOrRollDice.matches(playSoldier) === true);

        playSoldierOrRollDice.meet(playSoldier);

        assert.ok(playSoldierOrRollDice.matches(rollDice) === true);
        
        playSoldierOrRollDice.meet(rollDice);

        assert.ok(playSoldierOrRollDice.met === true);
    });
    describe("meets", () => {
        it("fails for many actions", () => {
            const game = new Game();
            game.playerOnTurn = new Player();
            const playSoldierOrRollDice = new PlaySoldierOrRollDice(game);

            assert.ok(playSoldierOrRollDice.matches(new BuildRoad()) === false);
            assert.ok(playSoldierOrRollDice.matches(new BuildTown()) === false);
            assert.ok(playSoldierOrRollDice.matches(new BuildCity()) === false);
            assert.ok(playSoldierOrRollDice.matches(new PlayDevelopmentCard()) === false);
        });
        it("fails with RollDice from other player", () => {
            const game = new Game();
            const player = new Player();
            const otherPlayer = new Player();
            game.playerOnTurn = player;
            const playSoldierOrRollDice = new PlaySoldierOrRollDice(game);

            assert.ok(playSoldierOrRollDice.matches(new RollDice({ player: otherPlayer })) === false);
        });
        it("fails with play soldier by other player", () => {
            const game = new Game();
            const player = new Player();
            const otherPlayer = new Player();
            game.playerOnTurn = player;
            const playSoldierOrRollDice = new PlaySoldierOrRollDice(game);
            const playSoldier = new PlayDevelopmentCard({
                developmentCard: new Soldier(),
                player: otherPlayer,
            });

            assert.ok(playSoldierOrRollDice.matches(playSoldier) === false);
        });
        it("fails when play soldier then RollDice by other player", () => {
            const game = new Game();
            const player = new Player();
            const otherPlayer = new Player();
            game.playerOnTurn = player;
            const playSoldierOrRollDice = new PlaySoldierOrRollDice(game);
            const playSoldier = new PlayDevelopmentCard({
                developmentCard: new Soldier(),
                player: player,
            });

            assert.ok(playSoldierOrRollDice.matches(playSoldier) === true);
            assert.ok(playSoldierOrRollDice.matches(new RollDice({ player: otherPlayer })) === false);
        });
    });
});

describe("PlaySoldierOrRollDice", () => {
    it("succeeds when MoveRobber then RobPlayer", () => {
        const game = new Game();
        const player = new Player();
        game.playerOnTurn = player;
        const moveRobberThenRobPlayer = new MoveRobberThenRobPlayer(game);
        const moveRobber = new MoveRobber({ player: player });
        const robPlayer = new RobPlayer({ player: player });
       
        assert.ok(moveRobberThenRobPlayer.matches(moveRobber) === true);
        assert.ok(moveRobberThenRobPlayer.matches(robPlayer) === false);

        moveRobberThenRobPlayer.meet(moveRobber);

        assert.ok(moveRobberThenRobPlayer.matches(moveRobber) === false);
        assert.ok(moveRobberThenRobPlayer.matches(robPlayer) === true);

        moveRobberThenRobPlayer.meet(robPlayer);

        assert.ok(moveRobberThenRobPlayer.matches(moveRobber) === false);
        assert.ok(moveRobberThenRobPlayer.matches(robPlayer) === false);
        assert.ok(moveRobberThenRobPlayer.met === true);
    });
    describe("meets", () => {
        it("fails for many actions", () => {
            const game = new Game();
            const player = new Player();
            game.playerOnTurn = player;
            const moveRobberThenRobPlayer = new MoveRobberThenRobPlayer(game);
           
            assert.ok(moveRobberThenRobPlayer.matches(new BuildRoad()) === false);
            assert.ok(moveRobberThenRobPlayer.matches(new BuildTown()) === false);
            assert.ok(moveRobberThenRobPlayer.matches(new BuildCity()) === false);
            assert.ok(moveRobberThenRobPlayer.matches(new PlayDevelopmentCard()) === false);
        });
        it("fails when RobPlayer first", () => {
            const game = new Game();
            const player = new Player();
            game.playerOnTurn = player;
            const moveRobberThenRobPlayer = new MoveRobberThenRobPlayer(game);
            const robPlayer = new RobPlayer({
                player: player
            });
           
            assert.ok(moveRobberThenRobPlayer.matches(robPlayer) === false);
        });
    });
});
describe("PlayTurnActions", () => {
    it("succeeds with turn actions", () => {
        const game = new Game();
        const player = new Player();
        game.playerOnTurn = player;
        const playTurnActions = new PlayTurnActions(game);

        assert.ok(playTurnActions.matches(new BuildRoad({ player: player})) === true);
        assert.ok(playTurnActions.matches(new BuildTown({ player: player})) === true);
        assert.ok(playTurnActions.matches(new BuildCity({ player: player})) === true);
        assert.ok(playTurnActions.matches(new PlayDevelopmentCard({ player: player})) === true);
        assert.ok(playTurnActions.matches(new BuyDevelopmentCard({ player: player})) === true);
        assert.ok(playTurnActions.matches(new EndTurn({ player: player})) === true);
        assert.ok(playTurnActions.matches(new OfferTrade({ player: player})) === true);
        assert.ok(playTurnActions.matches(new TradeBank({ player: player})) === true);
        assert.ok(playTurnActions.matches(new TradePlayer({ player: player})) === true);
    });
    describe("matches", () => {
        it("fails for ok action types but with different player", () => {
            const game = new Game();
            const player = new Player();
            game.playerOnTurn = player;
            const otherPlayer = new Player();
            const playTurnActions = new PlayTurnActions(game);
    
            assert.ok(playTurnActions.matches(new BuildRoad({ player: otherPlayer})) === false);
            assert.ok(playTurnActions.matches(new BuildTown({ player: otherPlayer})) === false);
            assert.ok(playTurnActions.matches(new BuildCity({ player: otherPlayer})) === false);
            assert.ok(playTurnActions.matches(new PlayDevelopmentCard({ player: otherPlayer})) === false);
            assert.ok(playTurnActions.matches(new BuyDevelopmentCard({ player: otherPlayer})) === false);
            assert.ok(playTurnActions.matches(new EndTurn({ player: otherPlayer})) === false);
            assert.ok(playTurnActions.matches(new OfferTrade({ player: otherPlayer})) === false);
            assert.ok(playTurnActions.matches(new TradeBank({ player: otherPlayer})) === false);
            assert.ok(playTurnActions.matches(new TradePlayer({ player: otherPlayer})) === false);
        });
        it("fails for not ok action types with ok player", () => {
            const game = new Game();
            const player = new Player();
            game.playerOnTurn = player;
            const playTurnActions = new PlayTurnActions(game);

            assert.ok(playTurnActions.matches(new MoveRobber({ player: player})) === false);
            assert.ok(playTurnActions.matches(new RobPlayer({ player: player})) === false);
            assert.ok(playTurnActions.matches(new CounterOffer({ player: player})) === false);
            assert.ok(playTurnActions.matches(new AcceptOffer({ player: player})) === false);
            assert.ok(playTurnActions.matches(new RejectOffer({ player: player})) === false);
            assert.ok(playTurnActions.matches(new RollDice({ player: player})) === false);
            assert.ok(playTurnActions.matches(new LooseResources({ player: player})) === false);
        });
        it("fails for not ok action types with ok player", () => {
            const game = new Game();
            const player = new Player();
            const otherPlayer = new Player();
            game.playerOnTurn = player;
            const playTurnActions = new PlayTurnActions(game);

            assert.ok(playTurnActions.matches(new MoveRobber({ player: otherPlayer})) === false);
            assert.ok(playTurnActions.matches(new RobPlayer({ player: otherPlayer})) === false);
            assert.ok(playTurnActions.matches(new CounterOffer({ player: otherPlayer})) === false);
            assert.ok(playTurnActions.matches(new AcceptOffer({ player: otherPlayer})) === false);
            assert.ok(playTurnActions.matches(new RejectOffer({ player: otherPlayer})) === false);
            assert.ok(playTurnActions.matches(new RollDice({ player: otherPlayer})) === false);
            assert.ok(playTurnActions.matches(new LooseResources({ player: otherPlayer})) === false);
        });
    });
});
describe("MoveRobberThenRobPlayer", () => {
    it("succeeds MoveRobber then RobPlayer", () => {
        const game = new Game();
        const player = new Player();
        game.playerOnTurn = player;
        const moveRobberThenRobPlayer = new MoveRobberThenRobPlayer(game);
        const moveRobber = new MoveRobber({ player: player });
        const robPlayer = new RobPlayer({ player: player});

        assert.ok(moveRobberThenRobPlayer.matches(moveRobber) === true);
        assert.ok(moveRobberThenRobPlayer.matches(robPlayer) === false);
        assert.ok(moveRobberThenRobPlayer.met === false);

        moveRobberThenRobPlayer.meet(moveRobber);

        assert.ok(moveRobberThenRobPlayer.matches(moveRobber) === false);
        assert.ok(moveRobberThenRobPlayer.matches(robPlayer) === true);
        assert.ok(moveRobberThenRobPlayer.met === false);

        moveRobberThenRobPlayer.meet(robPlayer);
        
        assert.ok(moveRobberThenRobPlayer.matches(moveRobber) === false);
        assert.ok(moveRobberThenRobPlayer.matches(robPlayer) === false);
        assert.ok(moveRobberThenRobPlayer.met === true);
    });
    describe("matches", () => {
        it("fails for ok action types but with different player", () => {
            const game = new Game();
            const player = new Player();
            const otherPlayer = new Player();
            game.playerOnTurn = player;
            const moveRobberThenRobPlayer = new MoveRobberThenRobPlayer(game);
            const moveRobberOk = new MoveRobber({ player: player });
            const robPlayerOk = new RobPlayer({ player: player });
            const moveRobberNotOk = new MoveRobber({ player: otherPlayer });
            const robPlayerNotOk = new RobPlayer({ player: otherPlayer });
    
            assert.ok(moveRobberThenRobPlayer.matches(moveRobberOk) === true);
            assert.ok(moveRobberThenRobPlayer.matches(robPlayerOk) === false);
            assert.ok(moveRobberThenRobPlayer.matches(moveRobberNotOk) === false);
            assert.ok(moveRobberThenRobPlayer.matches(robPlayerNotOk) === false);
            assert.ok(moveRobberThenRobPlayer.met === false);
    
            moveRobberThenRobPlayer.meet(moveRobberOk);
    
            assert.ok(moveRobberThenRobPlayer.matches(moveRobberNotOk) === false);
            assert.ok(moveRobberThenRobPlayer.matches(robPlayerNotOk) === false);
            assert.ok(moveRobberThenRobPlayer.matches(moveRobberOk) === false);
            assert.ok(moveRobberThenRobPlayer.matches(robPlayerOk) === true);
            assert.ok(moveRobberThenRobPlayer.met === false);
    
            moveRobberThenRobPlayer.meet(robPlayerOk);
            
            assert.ok(moveRobberThenRobPlayer.matches(moveRobberNotOk) === false);
            assert.ok(moveRobberThenRobPlayer.matches(robPlayerNotOk) === false);
            assert.ok(moveRobberThenRobPlayer.matches(moveRobberOk) === false);
            assert.ok(moveRobberThenRobPlayer.matches(robPlayerOk) === false);
            assert.ok(moveRobberThenRobPlayer.met === true);
        });
        it("fails for not ok action types", () => {
            const game = new Game();
            const player = new Player();
            game.playerOnTurn = player;
            const moveRobberThenRobPlayer = new MoveRobberThenRobPlayer(game);
            const moveRobber = new MoveRobber({ player: player });
            const robPlayer = new RobPlayer({ player: player});
    
            assert.ok(moveRobberThenRobPlayer.matches(new BuildRoad({ player: player })) === false);
            assert.ok(moveRobberThenRobPlayer.matches(moveRobber) === true);
            assert.ok(moveRobberThenRobPlayer.matches(robPlayer) === false);
            assert.ok(moveRobberThenRobPlayer.met === false);
    
            moveRobberThenRobPlayer.meet(moveRobber);
    
            assert.ok(moveRobberThenRobPlayer.matches(new BuildRoad({ player: player })) === false);
            assert.ok(moveRobberThenRobPlayer.matches(moveRobber) === false);
            assert.ok(moveRobberThenRobPlayer.matches(robPlayer) === true);
            assert.ok(moveRobberThenRobPlayer.met === false);
    
            moveRobberThenRobPlayer.meet(robPlayer);
            
            assert.ok(moveRobberThenRobPlayer.matches(new BuildRoad({ player: player })) === false);
            assert.ok(moveRobberThenRobPlayer.matches(moveRobber) === false);
            assert.ok(moveRobberThenRobPlayer.matches(robPlayer) === false);
            assert.ok(moveRobberThenRobPlayer.met === true);
        });
    });
});
describe("LooseResourcesMoveRobberRobPlayer", () => {
    it("serializes", () => {
        const game = new Game();
        const player = new Player({ id: 1 });
        player.resources.addAmount(new Wheat(), 8);
        const otherPlayer = new Player({ id: 2 });
        otherPlayer.resources.addAmount(new Wheat(), 8);
        game.playerOnTurn = player;
        game.players.push(player);
        game.players.push(otherPlayer);
        const lrmrrp = new LooseResourcesMoveRobberRobPlayer(game);
        const looseResourcesPlayer = new LooseResources({ player: player });
        const looseResourcesOtherPlayer = new LooseResources({ player: otherPlayer });
        const moveRobber = new MoveRobber({ player: player });
        const robPlayer = new RobPlayer({ player: player });

        lrmrrp.meet(looseResourcesPlayer);
        const buffer1 = pb.Expectation.encode(lrmrrp.data).finish();
        const revived1 = pb.Expectation.decode(buffer1);
        const copy1 = Expectation.fromData(revived1, game);

        assert.ok(copy1.matches(looseResourcesPlayer) === false);
        assert.ok(copy1.matches(looseResourcesOtherPlayer) === true);
        assert.ok(copy1.matches(moveRobber) === false);
        assert.ok(copy1.matches(robPlayer) === false);

        lrmrrp.meet(looseResourcesOtherPlayer);
        const buffer2 = pb.Expectation.encode(lrmrrp.data).finish();
        const revived2 = pb.Expectation.decode(buffer2);
        const copy2 = Expectation.fromData(revived2, game);

        assert.ok(copy2.matches(looseResourcesPlayer) === false);
        assert.ok(copy2.matches(looseResourcesOtherPlayer) === false);
        assert.ok(copy2.matches(moveRobber) === true);
        assert.ok(copy2.matches(robPlayer) === false);

        lrmrrp.meet(moveRobber);
        const buffer3 = pb.Expectation.encode(lrmrrp.data).finish();
        const revived3 = pb.Expectation.decode(buffer3);
        const copy3 = Expectation.fromData(revived3, game);

        assert.ok(copy3.matches(looseResourcesPlayer) === false);
        assert.ok(copy3.matches(looseResourcesOtherPlayer) === false);
        assert.ok(copy3.matches(moveRobber) === false);
        assert.ok(copy3.matches(robPlayer) === true);

    });
    it("succeeds when LooseResources then MoveRobber then RobPlayer", () => {
        const game = new Game();
        const player = new Player();
        player.resources.addAmount(new Wheat(), 8);
        const otherPlayer = new Player();
        otherPlayer.resources.addAmount(new Wheat(), 8);
        game.playerOnTurn = player;
        game.players.push(player);
        game.players.push(otherPlayer);
        const lrmrrp = new LooseResourcesMoveRobberRobPlayer(game);
        const looseResourcesPlayer = new LooseResources({ player: player });
        const looseResourcesOtherPlayer = new LooseResources({ player: otherPlayer });
        const moveRobber = new MoveRobber({ player: player });
        const robPlayer = new RobPlayer({ player: player });

        assert.ok(lrmrrp.matches(looseResourcesPlayer) === true);
        assert.ok(lrmrrp.matches(looseResourcesOtherPlayer) === true);
        assert.ok(lrmrrp.matches(moveRobber) === false);
        assert.ok(lrmrrp.matches(robPlayer) === false);
        assert.ok(lrmrrp.met === false);

        lrmrrp.meet(looseResourcesPlayer);
        
        assert.ok(lrmrrp.matches(looseResourcesPlayer) === false);
        assert.ok(lrmrrp.matches(looseResourcesOtherPlayer) === true);
        assert.ok(lrmrrp.matches(moveRobber) === false);
        assert.ok(lrmrrp.matches(robPlayer) === false);
        assert.ok(lrmrrp.met === false);
        
        lrmrrp.meet(looseResourcesOtherPlayer);
        
        assert.ok(lrmrrp.matches(looseResourcesPlayer) === false);
        assert.ok(lrmrrp.matches(looseResourcesOtherPlayer) === false);
        assert.ok(lrmrrp.matches(moveRobber) === true);
        assert.ok(lrmrrp.matches(robPlayer) === false);
        assert.ok(lrmrrp.met === false);
        
        lrmrrp.meet(moveRobber);
        
        assert.ok(lrmrrp.matches(looseResourcesPlayer) === false);
        assert.ok(lrmrrp.matches(looseResourcesOtherPlayer) === false);
        assert.ok(lrmrrp.matches(moveRobber) === false);
        assert.ok(lrmrrp.matches(robPlayer) === true);
        assert.ok(lrmrrp.met === false);
        
        lrmrrp.meet(robPlayer);
        
        assert.ok(lrmrrp.matches(looseResourcesPlayer) === false);
        assert.ok(lrmrrp.matches(looseResourcesOtherPlayer) === false);
        assert.ok(lrmrrp.matches(moveRobber) === false);
        assert.ok(lrmrrp.matches(robPlayer) === false);
        assert.ok(lrmrrp.met === true);
    });
    describe("matches", () => {
        it("fails for ok action types but with different player", () => {
            const game = new Game();
            const player = new Player();
            player.resources.addAmount(new Wheat(), 8);
            const otherPlayer = new Player();
            otherPlayer.resources.addAmount(new Wheat(), 8);
            game.playerOnTurn = player;
            game.players.push(player);
            game.players.push(otherPlayer);
            const lrmrrp = new LooseResourcesMoveRobberRobPlayer(game);
            const looseResourcesPlayer = new LooseResources({ player: player });
            const looseResourcesOtherPlayer = new LooseResources({ player: otherPlayer });
            const moveRobber = new MoveRobber({ player: player });
            const robPlayer = new RobPlayer({ player: player });
            const moveRobberNotOk = new MoveRobber({ player: otherPlayer });
            const robPlayerNotOk = new RobPlayer({ player: otherPlayer });
    
            assert.ok(lrmrrp.matches(moveRobberNotOk) === false);
            assert.ok(lrmrrp.matches(robPlayerNotOk) === false);
    
            lrmrrp.meet(looseResourcesPlayer);
            
            assert.ok(lrmrrp.matches(moveRobberNotOk) === false);
            assert.ok(lrmrrp.matches(robPlayerNotOk) === false);
            
            lrmrrp.meet(looseResourcesOtherPlayer);
            
            assert.ok(lrmrrp.matches(moveRobberNotOk) === false);
            assert.ok(lrmrrp.matches(robPlayerNotOk) === false);
            
            lrmrrp.meet(moveRobber);
            
            assert.ok(lrmrrp.matches(moveRobberNotOk) === false);
            assert.ok(lrmrrp.matches(robPlayerNotOk) === false);
            
            lrmrrp.meet(robPlayer);
            
            assert.ok(lrmrrp.matches(moveRobberNotOk) === false);
            assert.ok(lrmrrp.matches(robPlayerNotOk) === false);
        });
    });
});
describe("BuildTownThenBuildRoad", () => {
    it("serializes", () => {
        const game = new Game();
        const player1 = new Player();
        const player2 = new Player();
        game.players.push(player1);
        game.players.push(player2);
        const bttbr = new BuildTownThenBuildRoad(game);

        const buildTown1 = new BuildTown({ player: player1 });
        bttbr.meet(buildTown1);
        bttbr.meet(new BuildRoad({ player: player1 }));
        const buffer = pb.Expectation.encode(bttbr.data).finish();
        const revived = pb.Expectation.decode(buffer);
        const copy = Expectation.fromData(revived, game);

        const buildTown2 = new BuildTown({ player: player2 });
        assert.ok(bttbr.matches(buildTown1) === false);
        assert.ok(bttbr.matches(buildTown2) === true);
    });
    it("succeeds with BuildTown then BuildRoad for 3 players", () => {
        const game = new Game();
        const player1 = new Player();
        const player2 = new Player();
        const player3 = new Player();
        game.players.push(player1);
        game.players.push(player2);
        game.players.push(player3);
        const buildTownThenBuildRoad = new BuildTownThenBuildRoad(game);
        const buildTown1 = new BuildTown({ player: player1 });
        const buildTown2 = new BuildTown({ player: player2 });
        const buildTown3 = new BuildTown({ player: player3 });
        const buildRoad1 = new BuildRoad({ player: player1 });
        const buildRoad2 = new BuildRoad({ player: player2 });
        const buildRoad3 = new BuildRoad({ player: player3 });

        assert.ok(buildTownThenBuildRoad.matches(buildTown1) === true);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad1) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildTown2) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad2) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildTown3) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad3) === false);
        assert.ok(buildTownThenBuildRoad.met === false);

        buildTownThenBuildRoad.meet(buildTown1);

        assert.ok(buildTownThenBuildRoad.matches(buildTown1) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad1) === true);
        assert.ok(buildTownThenBuildRoad.matches(buildTown2) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad2) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildTown3) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad3) === false);
        assert.ok(buildTownThenBuildRoad.met === false);

        buildTownThenBuildRoad.meet(buildRoad1);

        assert.ok(buildTownThenBuildRoad.matches(buildTown1) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad1) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildTown2) === true);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad2) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildTown3) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad3) === false);
        assert.ok(buildTownThenBuildRoad.met === false);

        buildTownThenBuildRoad.meet(buildTown2);

        assert.ok(buildTownThenBuildRoad.matches(buildTown1) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad1) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildTown2) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad2) === true);
        assert.ok(buildTownThenBuildRoad.matches(buildTown3) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad3) === false);
        assert.ok(buildTownThenBuildRoad.met === false);

        buildTownThenBuildRoad.meet(buildRoad2);

        assert.ok(buildTownThenBuildRoad.matches(buildTown1) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad1) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildTown2) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad2) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildTown3) === true);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad3) === false);
        assert.ok(buildTownThenBuildRoad.met === false);

        buildTownThenBuildRoad.meet(buildTown3);

        assert.ok(buildTownThenBuildRoad.matches(buildTown1) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad1) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildTown2) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad2) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildTown3) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad3) === true);
        assert.ok(buildTownThenBuildRoad.met === false);

        buildTownThenBuildRoad.meet(buildRoad3);

        assert.ok(buildTownThenBuildRoad.matches(buildTown3) === true);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad3) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildTown2) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad2) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildTown1) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad1) === false);
        assert.ok(buildTownThenBuildRoad.met === false);

        buildTownThenBuildRoad.meet(buildTown3);

        assert.ok(buildTownThenBuildRoad.matches(buildTown3) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad3) === true);
        assert.ok(buildTownThenBuildRoad.matches(buildTown2) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad2) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildTown1) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad1) === false);
        assert.ok(buildTownThenBuildRoad.met === false);

        buildTownThenBuildRoad.meet(buildRoad3);

        assert.ok(buildTownThenBuildRoad.matches(buildTown3) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad3) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildTown2) === true);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad2) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildTown1) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad1) === false);
        assert.ok(buildTownThenBuildRoad.met === false);

        buildTownThenBuildRoad.meet(buildTown2);

        assert.ok(buildTownThenBuildRoad.matches(buildTown3) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad3) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildTown2) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad2) === true);
        assert.ok(buildTownThenBuildRoad.matches(buildTown1) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad1) === false);
        assert.ok(buildTownThenBuildRoad.met === false);

        buildTownThenBuildRoad.meet(buildRoad2);

        assert.ok(buildTownThenBuildRoad.matches(buildTown3) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad3) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildTown2) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad2) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildTown1) === true);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad1) === false);
        assert.ok(buildTownThenBuildRoad.met === false);

        buildTownThenBuildRoad.meet(buildTown1);

        assert.ok(buildTownThenBuildRoad.matches(buildTown3) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad3) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildTown2) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad2) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildTown1) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad1) === true);
        assert.ok(buildTownThenBuildRoad.met === false);

        buildTownThenBuildRoad.meet(buildRoad1);

        assert.ok(buildTownThenBuildRoad.matches(buildTown3) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad3) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildTown2) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad2) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildTown1) === false);
        assert.ok(buildTownThenBuildRoad.matches(buildRoad1) === false);
        assert.ok(buildTownThenBuildRoad.met === true);

    });
});