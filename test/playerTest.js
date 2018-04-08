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

describe("Player", () => {
    it("serializes", () => {
        const user = new User({
            id: 99,
            name: "test"
        });
        const game = new Game();
        game.board = new Standard4pDesign();

        const player = new Player({ id: 98 });
        player.color = 0xdeadbe;
        player.user = user;
        player.maxHandResources = 9;
        player.developmentCards = [
            new Soldier({ player: player }),
            new YearOfPlenty({ player: player }),
            new Monopoly({ player: player }),
            new RoadBuilding({ player: player }),
            new VictoryPoint({ player: player }),
        ];
        player.playedDevelopmentCards = [
            new Soldier({ player: player }),
            new Soldier({ player: player }),
            new YearOfPlenty({ player: player }),
            new Monopoly({ player: player }),
            new RoadBuilding({ player: player }),
            new VictoryPoint({ player: player }),
        ];
        player.roadBuildingTokens = 3;
        // player.vp
        player.soldiers = [
            new Soldier({ player: player }),
            new Soldier({ player: player }),
        ]
        player.routeLength = 7;
        player.stock = new Stock({
            roads: 2,
            cities: 3,
            towns: 4
        });
        player.ports = new PortList([
            new Any4To1Port(),
            new Any3To1Port(1, Coord3D.center),
            new Timber2To1Port(2, Coord3D.center),
            new Wheat2To1Port(2, Coord3D.center),
            new Clay2To1Port(2, Coord3D.center),
            new Ore2To1Port(2, Coord3D.center),
            new Sheep2To1Port(2, Coord3D.center),
        ]);
        player.towns = new Map();
        player.towns.set(Coord3D.center.nodes[0], new Town(player, Coord3D.center.nodes[0]));
        player.towns.set(Coord3D.center.nodes[1], new Town(player, Coord3D.center.nodes[1]));
        player.cities = new Map();
        player.cities.set(Coord3D.center.nodes[2], new City(player, Coord3D.center.nodes[2]));
        player.cities.set(Coord3D.center.nodes[3], new City(player, Coord3D.center.nodes[3]));
        player.roads = new Map();
        player.roads.set(Coord3D.center.edges[0], new Road(player, Coord3D.center.edges[0]));
        player.roads.set(Coord3D.center.edges[1], new Road(player, Coord3D.center.edges[1]));
        player.roads.set(Coord3D.center.edges[2], new Road(player, Coord3D.center.edges[2]));
        player.resources = new ResourceList([
            pb.ResourceType.Wheat,
            pb.ResourceType.Timber,
            pb.ResourceType.Ore,
            pb.ResourceType.Sheep,
            pb.ResourceType.Brick,
        ]);

        const buffer = pb.Player.encode(player.data).finish();
        const revived = pb.Player.decode(buffer);
        const copy = Player.fromData(revived, game);

        assert.strictEqual(98, copy.id);
        assert.strictEqual(0xdeadbe, copy.color);
        assert.strictEqual(99, copy.user.id);
        assert.strictEqual("test", copy.user.name);
        assert.strictEqual(9, copy.maxHandResources);
        assert.strictEqual(5, copy.developmentCards.length);
        assert(copy.developmentCards[0] instanceof Soldier);
        assert(copy.developmentCards[1] instanceof YearOfPlenty);
        assert(copy.developmentCards[2] instanceof Monopoly);
        assert(copy.developmentCards[3] instanceof RoadBuilding);
        assert(copy.developmentCards[4] instanceof VictoryPoint);
        assert.strictEqual(6, copy.playedDevelopmentCards.length);
        assert.strictEqual(3, copy.roadBuildingTokens);
        // assert.strictEqual(2, copy.soldiers.length);
        // assert.strictEqual(2, copy.soldiers[0].playerId === 98);
        assert.strictEqual(7, copy.routeLength);
        assert.strictEqual(2, copy.stock.roads);
        assert.strictEqual(3, copy.stock.cities);
        assert.strictEqual(4, copy.stock.towns);

        assert(copy.ports.items[0] instanceof Any4To1Port);
        assert(copy.ports.items[1] instanceof Any3To1Port);
        assert.strictEqual(1, copy.ports.items[1].partIndex);
        assert.strictEqual(Coord3D.center, copy.ports.items[1].seaCoord);
        assert(copy.ports.items[2] instanceof Timber2To1Port);
        assert(copy.ports.items[3] instanceof Wheat2To1Port);
        assert(copy.ports.items[4] instanceof Clay2To1Port);
        assert(copy.ports.items[5] instanceof Ore2To1Port);
        assert(copy.ports.items[6] instanceof Sheep2To1Port);
        assert.strictEqual(2, copy.towns.size);
        assert(Coord3D.center.nodes[0] === copy.towns.get(Coord3D.center.nodes[0]).node);
        assert(Coord3D.center.nodes[1] === copy.towns.get(Coord3D.center.nodes[1]).node);
        assert.strictEqual(2, copy.cities.size);
        assert.strictEqual(2 + 2, copy.nodePieces.size);
        assert(Coord3D.center.nodes[2] === copy.cities.get(Coord3D.center.nodes[2]).node);
        assert(Coord3D.center.nodes[3] === copy.cities.get(Coord3D.center.nodes[3]).node);
        assert.strictEqual(3, copy.roads.size);
        assert.strictEqual(3, copy.edgePieces.size);
        assert(Coord3D.center.edges[0] === copy.roads.get(Coord3D.center.edges[0]).edge);
        assert(Coord3D.center.edges[1] === copy.roads.get(Coord3D.center.edges[1]).edge);
        assert(Coord3D.center.edges[2] === copy.roads.get(Coord3D.center.edges[2]).edge);

        assert.strictEqual(1, copy.resources.of(pb.ResourceType.Wheat).length);
        assert.strictEqual(1, copy.resources.of(pb.ResourceType.Timber).length);
        assert.strictEqual(1, copy.resources.of(pb.ResourceType.Ore).length);
        assert.strictEqual(1, copy.resources.of(pb.ResourceType.Sheep).length);
        assert.strictEqual(1, copy.resources.of(pb.ResourceType.Brick).length);

        assert.strictEqual(2, copy.victoryPoints.filter(vp => vp instanceof Town).length);
        assert.strictEqual(2, copy.victoryPoints.filter(vp => vp instanceof City).length);
        assert.strictEqual(1, copy.victoryPoints.filter(vp => vp instanceof VictoryPoint).length);
        assert.strictEqual(2, game.board.towns.map.size);
        assert.strictEqual(2, game.board.cities.map.size);
        assert.strictEqual(3, game.board.roads.map.size);
        assert.strictEqual(4, game.board.nodePieces.map.size);
        assert.strictEqual(3, game.board.edgePieces.size);
        assert.strictEqual(4, game.board.producersByNode.size);
    });
    it("serializes without user", () => {
        const player = new Player();
        player.user = null;
        const game = new Game();

        const buffer = pb.Player.encode(player.data).finish();
        const revived = pb.Player.decode(buffer);
        const copy = Player.fromData(revived, game);

        assert.strictEqual(null, copy.user);
    });
});