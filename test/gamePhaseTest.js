import { assert } from "chai";
import { jsettlers as pb } from "../src/generated/data";
import { ResourceList } from "../src/resource";
import { InitialPlacement, GamePhase, Turn } from "../src/gamePhase";
import { BuildTownThenBuildRoad } from "../src/expectation";
import { Player } from "../src/player";
import { Game } from "../src/game";
import { BuildTown } from "../src/actions/buildTown";

describe("InitialPlacement", () => {
    it("serializes", () => {
        var initialPlacement = new InitialPlacement();
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

        initialPlacement.start(game);
        
        const buffer = pb.GamePhase.encode(initialPlacement.data).finish();
        const revived = pb.GamePhase.decode(buffer);
        const copy = GamePhase.fromData(revived, game);

        assert.ok(copy.expectation instanceof BuildTownThenBuildRoad);

        game.expectation.meet(buildTown1);
        const buffer1 = pb.GamePhase.encode(initialPlacement.data).finish();
        const revived1 = pb.GamePhase.decode(buffer1);
        const copy1 = GamePhase.fromData(revived1, game);

        assert.strictEqual(1, copy1.expectation.index);
    });
});
describe("PlayTurns", () => {
    it("serializes", () => {
        const game = new Game();
        const player1 = new Player();
        const player2 = new Player();
        const player3 = new Player();
        game.players.push(player1);
        game.players.push(player2);
        game.players.push(player3);
        var turns = [
            new Turn({ player: player1, number: 1 }),
            new Turn({ player: player2, number: 2 }),
            new Turn({ player: player3, number: 3 }),
            new Turn({ player: player1, number: 4, hasPlayedDevelopmentCard: true }),
        ]
        game.playTurns.turns = turns;

        const buffer = pb.GamePhase.encode(game.playTurns.data).finish();
        const revived = pb.GamePhase.decode(buffer);
        const copy = GamePhase.fromData(revived, game);

        assert.strictEqual(4, copy.turns.length);
        assert.ok(copy.turns[0].hasPlayedDevelopmentCard === false);
        assert.ok(copy.turns[1].hasPlayedDevelopmentCard === false);
        assert.ok(copy.turns[2].hasPlayedDevelopmentCard === false);
        assert.ok(copy.turns[3].hasPlayedDevelopmentCard === true);
        assert.strictEqual(1, copy.turns[0].number);
        assert.strictEqual(2, copy.turns[1].number);
        assert.strictEqual(3, copy.turns[2].number);
        assert.strictEqual(4, copy.turns[3].number);
        assert.strictEqual(null, copy.turn);
    });
});