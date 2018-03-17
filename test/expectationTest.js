require('babel-register')();
var proto = require("../data_pb")
var assert = require('assert');
require("../src/generic/shims");
import {PortList, Any4To1Port, Timber2To1Port, Any3To1Port, Wheat2To1Port, Sheep2To1Port, Clay2To1Port} from "../src/port";
import { Timber, ResourceList, Wheat, Brick, Ore, Sheep } from '../src/resource';
import { PlaySoldierOrRollDice } from '../src/expectation';
import { Player } from '../src/player';
import { BuildRoad } from '../src/actions/buildRoad';
import { BuildTown } from '../src/actions/buildTown';
import { BuildCity } from '../src/actions/buildCity';
import { PlayDevelopmentCard } from '../src/actions/playDevelopmentCard';
import { Soldier } from '../src/developmentCard';
import { RollDice } from '../src/actions/rollDice';
import { Game } from '../src/game';

describe("PlaySoldierOrRollDice", () => {
    describe("meets", () => {
        it("many actions fail", () => {
            const game = new Game();
            game.playerOnTurn = new Player();
            const playSoldierOrRollDice = new PlaySoldierOrRollDice(game);

            assert.ok(playSoldierOrRollDice.matches(new BuildRoad()) === false);
            assert.ok(playSoldierOrRollDice.matches(new BuildTown()) === false);
            assert.ok(playSoldierOrRollDice.matches(new BuildCity()) === false);
            assert.ok(playSoldierOrRollDice.matches(new PlayDevelopmentCard()) === false);
        });
        it("only rolldice", () => {
            const game = new Game();
            const player = new Player();
            game.playerOnTurn = player;
            const playSoldierOrRollDice = new PlaySoldierOrRollDice(game);

            assert.ok(playSoldierOrRollDice.matches(new RollDice({ player: player })) === true);
        });
        it("only rolldice from other player fails", () => {
            const game = new Game();
            const player = new Player();
            const otherPlayer = new Player();
            game.playerOnTurn = player;
            const playSoldierOrRollDice = new PlaySoldierOrRollDice(game);

            assert.ok(playSoldierOrRollDice.matches(new RollDice({ player: otherPlayer })) === false);
        });
        it("play soldier then rolldice", () => {
            const game = new Game();
            const player = new Player();
            game.playerOnTurn = player;
            const playSoldierOrRollDice = new PlaySoldierOrRollDice(game);
            const playSoldier = new PlayDevelopmentCard({
                developmentCard: new Soldier(),
                player: player,
            });

            playSoldierOrRollDice.meet(playSoldier);
            assert.ok(playSoldierOrRollDice.matches(new RollDice({ player: player })) === true);
        });
        it("play soldier by other player fails", () => {
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
        it("play soldier then rolldice by other player fails", () => {
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