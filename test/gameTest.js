import { assert } from "chai";
import { jsettlers as pb } from "../src/generated/data";
import { Player, User } from "../src/player";
import { Soldier, YearOfPlenty, Monopoly, RoadBuilding, VictoryPoint } from "../src/developmentCard";
import { Stock } from "../src/stock";
import { PortList, Any4To1Port, Any3To1Port, Timber2To1Port, Sheep2To1Port, Ore2To1Port, Clay2To1Port, Wheat2To1Port } from "../src/port";
import { Coord3D } from "../src/coord";
import { Town } from "../src/town";
import { City } from "../src/city";
import { Road } from "../src/road";
import { ResourceList } from "../src/resource";
import { Game } from "../src/game";
import { Standard4pDesign } from "../src/board";
import { BuildTown } from "../src/actions/buildTown";
import { BuildRoad } from "../src/actions/buildRoad";
import { GameOptions } from "../src/gameOption";
import { Sea } from "../src/hex";

describe("Game", () => {
    it("serializes", () => {
        const game = new Game();
        const player1 = new Player({
            id: 1,
            user: new User({
                name: "p1",
                id: 11
            }),
            color: 0x00ff00
        });
        const player2 = new Player({
            id: 2,
            user: new User({
                name: "p2",
                id: 12
            }),
            color: 0xff0000
        });
        const player3 = new Player({
            id: 3,
            user: new User({
                name: "p3",
                id: 13
            }),
            color: 0x0000ff
        });
        game.players.push(player1);
        game.players.push(player2);
        game.players.push(player3);
        game.playerOnTurn = player1;
        const board = new Standard4pDesign();
        board.generateBoardForPlay();
        game.board = board;
        game.developmentCards = [
            new Soldier(),
            new Soldier(),
            new Soldier(),
            new Soldier(),
            new Soldier(),
            new YearOfPlenty(),
            new YearOfPlenty(),
            new YearOfPlenty(),
            new YearOfPlenty(),
            new VictoryPoint(),
            new VictoryPoint(),
            new VictoryPoint(),
            new RoadBuilding(),
            new RoadBuilding(),
            new Monopoly(),
        ];
        const buildTown1 = new BuildTown({
            player: player1,
            node: Coord3D.center.nodes[0]
        });
        const buildRoad1 = new BuildRoad({
            player: player2,
            edge: Coord3D.center.nodes[0].edges[0]
        });
        const gameOptions = new GameOptions();
        game.start(gameOptions);
        buildTown1.perform(game);
        buildRoad1.perform(game);
        game.actions.push(buildTown1);
        game.actions.push(buildRoad1);

        const buffer = pb.Game.encode(game.data).finish();
        const revived = pb.Game.decode(buffer);
        const copy = Game.fromData(revived);

        assert.ok(copy.victoryPointsToWin === 10);
        assert.strictEqual(1, copy.players[0].id);
        assert.strictEqual(2, copy.players[1].id);
        assert.strictEqual(3, copy.players[2].id);
        assert.strictEqual("p1", copy.players[0].user.name);
        assert.strictEqual("p2", copy.players[1].user.name);
        assert.strictEqual("p3", copy.players[2].user.name);
        assert.strictEqual(0x00ff00, copy.players[0].color);
        assert.strictEqual(0xff0000, copy.players[1].color);
        assert.strictEqual(0x0000ff, copy.players[2].color);
        const hexesArray = Array.from(copy.board.hexes.values());
        assert.strictEqual(18, hexesArray.filter(h => h instanceof Sea).length);
        assert.strictEqual(19, hexesArray.filter(h => !(h instanceof Sea)).length);
        assert.strictEqual(19, hexesArray.filter(h => !(h instanceof Sea)).length);
        const dcs = copy.developmentCards;
        assert.strictEqual(5, dcs.filter(dc => dc instanceof Soldier).length);
        assert.strictEqual(4, dcs.filter(dc => dc instanceof YearOfPlenty).length);
        assert.strictEqual(3, dcs.filter(dc => dc instanceof VictoryPoint).length);
        assert.strictEqual(2, dcs.filter(dc => dc instanceof RoadBuilding).length);
        assert.strictEqual(1, dcs.filter(dc => dc instanceof Monopoly).length);
        assert.ok(copy.actions.array[0] instanceof BuildTown);
        assert.ok(copy.actions.array[0].player.id === 1);
        assert.ok(copy.actions.array[0].node === Coord3D.center.nodes[0]);
        assert.ok(copy.actions.array[1] instanceof BuildRoad);
        assert.ok(copy.actions.array[1].player.id === 2);
        assert.ok(copy.actions.array[1].edge === Coord3D.center.nodes[0].edges[0]);
        assert.strictEqual(null, copy.longestRoad.edges);
        assert.strictEqual(null, copy.longestRoad.player);
        assert.strictEqual(null, copy.largestArmy.player);
    });
});