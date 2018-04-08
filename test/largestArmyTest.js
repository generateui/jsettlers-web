import { jsettlers as pb } from "../src/generated/data"
import * as assert from "assert";
import { Standard4pDesign } from '../src/board';
import { Road } from '../src/road';
import { Coord3D } from '../src/coord';
import { Game } from '../src/game';
import { Player } from '../src/player';
import { Town } from '../src/town';
import { City } from '../src/city';
import { PlayDevelopmentCard } from '../src/actions/playDevelopmentCard';
import { Soldier } from '../src/developmentCard';
import { LargestArmy } from "../src/largestArmy";

describe("LargestArmy", () => {
    it("serializes without player", () => {
        const largestArmy = new LargestArmy();
        const game = new Game();

        assert.strictEqual(null, largestArmy.player);
        const buffer = pb.LargestArmy.encode(largestArmy.data).finish();
        const revived = pb.LargestArmy.decode(buffer);
        const copy = LargestArmy.fromData(revived, game);

        assert.strictEqual(null, copy.player);
    });
    it("serializes with player", () => {
        const game = new Game();
        const player = new Player({
            id: 23,
        });
        game.players.push(player);
        const largestArmy = new LargestArmy(player);

        const buffer = pb.LargestArmy.encode(largestArmy.data).finish();
        const revived = pb.LargestArmy.decode(buffer);
        const copy = LargestArmy.fromData(revived, game);

        assert.ok(copy.player !== null);
        assert.strictEqual(23, game.getPlayerById(23).id);
        assert.strictEqual(23, copy.player.id);
    });
    it("3 when 3 soldiers are played", () => {
        const game = new Game();
        const board = new Standard4pDesign();
        board.generateBoardForPlay();
        game.board = board;
        const player1 = new Player();
        game.players.push(player1);
        game.playerOnTurn = player1;
        for (let i = 0; i < 2; i++) {
            const soldier = new Soldier({ player: player1, coord: Coord3D.center });
            const playSoldier = new PlayDevelopmentCard({ player: player1, developmentCard: soldier });
            playSoldier.perform(game);
        }
        assert.ok(game.largestArmy.player === null);
        assert.ok(player1.soldiers.length === 2);
        assert.ok(player1.victoryPoints.length === 0);
        // TODO: assert on vp count

        const soldier = new Soldier({ player: player1, coord: Coord3D.center });
        const playSoldier = new PlayDevelopmentCard({ player: player1, developmentCard: soldier });
        playSoldier.perform(game);
        assert.ok(game.largestArmy.player === player1);
        assert.ok(player1.soldiers.length === 3);
        assert.ok(player1.victoryPoints.length === 1);
    });
    it("4 to player2 when 4 soldiers are played and player1 had it", () => {
        const game = new Game();
        const board = new Standard4pDesign();
        board.generateBoardForPlay();
        game.board = board;
        const player1 = new Player();
        const player2 = new Player();
        game.players.push(player1);
        game.players.push(player2);
        game.playerOnTurn = player1;
        for (let i = 0; i < 2; i++) {
            const soldier = new Soldier({ player: player1, coord: Coord3D.center });
            const playSoldier = new PlayDevelopmentCard({ player: player1, developmentCard: soldier });
            playSoldier.perform(game);
        }
        assert.ok(game.largestArmy.player === null);

        const soldier = new Soldier({ player: player1, coord: Coord3D.center });
        const playSoldier = new PlayDevelopmentCard({ player: player1, developmentCard: soldier });
        playSoldier.perform(game);
        assert.ok(game.largestArmy.player === player1);
        assert.ok(player1.victoryPoints.length === 1);
        assert.ok(player2.victoryPoints.length === 0);

        game.playerOnTurn = player2;
        for (let i = 0; i < 4; i++) {
            const soldier = new Soldier({ player: player2, coord: Coord3D.center });
            const playSoldier = new PlayDevelopmentCard({ player: player2, developmentCard: soldier });
            playSoldier.perform(game);
        }
        assert.ok(game.largestArmy.player === player2);
        assert.ok(player1.victoryPoints.length === 0);
        assert.ok(player2.victoryPoints.length === 1);
    });
    it("still 3 when 3 soldiers are played by player 1 & 2", () => {
        const game = new Game();
        const board = new Standard4pDesign();
        board.generateBoardForPlay();
        game.board = board;
        const player1 = new Player();
        const player2 = new Player();
        game.players.push(player1);
        game.players.push(player2);
        game.playerOnTurn = player1;
        for (let i = 0; i < 3; i++) {
            const soldier = new Soldier({ player: player1, coord: Coord3D.center });
            const playSoldier = new PlayDevelopmentCard({ player: player1, developmentCard: soldier });
            playSoldier.perform(game);
        }
        assert.ok(game.largestArmy.player === player1);
        assert.ok(player1.soldiers.length === 3);

        game.playerOnTurn = player2;
        for (let i = 0; i < 3; i++) {
            const soldier = new Soldier({ player: player2, coord: Coord3D.center });
            const playSoldier = new PlayDevelopmentCard({ player: player2, developmentCard: soldier });
            playSoldier.perform(game);
        }
        assert.ok(player1.soldiers.length === 3);
        assert.ok(player2.soldiers.length === 3);
        assert.ok(game.largestArmy.player === player1);
        assert.ok(player1.victoryPoints.length === 1);
        assert.ok(player2.victoryPoints.length === 0);
    });
});