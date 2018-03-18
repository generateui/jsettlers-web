require('babel-register')();
var proto = require("../data_pb")
var assert = require('assert');
require("../src/generic/shims");
import { PortList, Any4To1Port, Timber2To1Port, Any3To1Port, 
    Wheat2To1Port, Sheep2To1Port, Clay2To1Port} from "../src/port";
import { Timber, ResourceList, Wheat, Brick, Ore, Sheep } from '../src/resource';
import { Standard4pDesign } from '../src/board';
import { Road } from '../src/road';
import { Coord3D } from '../src/coord';
import { Game } from '../src/game';
import { Player } from '../src/player';
import { Town } from '../src/town';
import { City } from '../src/city';

describe("LongestRoad", () => {
    it("6 for a circle", () => {
        const game = new Game();
        const board = new Standard4pDesign();
        board.generateBoardForPlay();
        game.board = board;
        const player1 = new Player();
        game.players.push(player1);
        game.playerOnTurn = player1;
        const edges = Coord3D.center.edges;
        const first4Edges = [edges[0], edges[1], edges[2], edges[3]];

        for (let edge of first4Edges) {
            const road = new Road(player1, edge);
            road.addToPlayer(player1);
            road.addToBoard(game.board);
        }
        game.calculateLongestRoad();
        assert.ok(game.longestRoad.player === null);

        const road5 = new Road(player1, edges[4]);
        road5.addToPlayer(player1);
        road5.addToBoard(game.board);
        game.calculateLongestRoad();
        assert.ok(game.longestRoad.player === player1);
        assert.ok(game.longestRoad.edges.length === 5);

        const road6 = new Road(player1, edges[5]);
        road6.addToPlayer(player1);
        road6.addToBoard(game.board);
        game.calculateLongestRoad();
        assert.ok(game.longestRoad.player === player1);
        assert.ok(game.longestRoad.edges.length === 6);
    });
    it("6 for a circle with 3 Towns", () => {
        const game = new Game();
        const board = new Standard4pDesign();
        board.generateBoardForPlay();
        game.board = board;
        const player1 = new Player();
        game.players.push(player1);
        game.playerOnTurn = player1;
        const nodes = Coord3D.center.nodes;
        const edges = Coord3D.center.edges;
        for (let edge of edges) {
            const road = new Road(player1, edge);
            road.addToPlayer(player1);
            road.addToBoard(game.board);
        }
        for (let node of [nodes[0], nodes[2], nodes[4]]) {
            const town = new Town(player1, node);
            town.addToBoard(game.board);
            town.addToPlayer(player1);
        }

        game.calculateLongestRoad();

        assert.ok(game.longestRoad.player === player1);
        assert.ok(game.longestRoad.edges.length === 6);
    });
    it("6 for a circle with opponent Town", () => {
        const game = new Game();
        const board = new Standard4pDesign();
        board.generateBoardForPlay();
        game.board = board;
        const player1 = new Player();
        const player2 = new Player();
        game.players.push(player1);
        game.players.push(player2);
        game.playerOnTurn = player1;
        const edges = Coord3D.center.edges;

        for (let edge of edges) {
            const road = new Road(player1, edge);
            road.addToPlayer(player1);
            road.addToBoard(game.board);
        }
        const town = new Town(player2, Coord3D.center.nodes[0]);
        town.addToBoard(game.board);
        town.addToPlayer(player2);

        game.calculateLongestRoad();

        assert.ok(game.longestRoad.player === player1);
        assert.ok(game.longestRoad.edges.length === 6);
    });
    it("5 for a circle with two adjacent opponent towns", () => {
        const game = new Game();
        const board = new Standard4pDesign();
        board.generateBoardForPlay();
        game.board = board;
        const player1 = new Player();
        const player2 = new Player();
        game.players.push(player1);
        game.players.push(player2);
        game.playerOnTurn = player1;
        const edges = Coord3D.center.edges;

        for (let edge of edges) {
            const road = new Road(player1, edge);
            road.addToPlayer(player1);
            road.addToBoard(game.board);
        }
        const town1 = new Town(player2, Coord3D.center.nodes[0]);
        town1.addToBoard(game.board);
        town1.addToPlayer(player2);
        const town2 = new Town(player2, Coord3D.center.nodes[1]);
        town2.addToBoard(game.board);
        town2.addToPlayer(player2);

        game.calculateLongestRoad();

        assert.ok(game.longestRoad.player === player1);
        assert.ok(game.longestRoad.edges.length === 5);
    });
    it("5 for a circle with two adjacent opponent cities", () => {
        const game = new Game();
        const board = new Standard4pDesign();
        board.generateBoardForPlay();
        game.board = board;
        const player1 = new Player();
        const player2 = new Player();
        game.players.push(player1);
        game.players.push(player2);
        game.playerOnTurn = player1;
        const edges = Coord3D.center.edges;

        for (let edge of edges) {
            const road = new Road(player1, edge);
            road.addToPlayer(player1);
            road.addToBoard(game.board);
        }
        const town1 = new City(player2, Coord3D.center.nodes[0]);
        town1.addToBoard(game.board);
        town1.addToPlayer(player2);
        const town2 = new City(player2, Coord3D.center.nodes[1]);
        town2.addToBoard(game.board);
        town2.addToPlayer(player2);

        game.calculateLongestRoad();

        assert.ok(game.longestRoad.player === player1);
        assert.ok(game.longestRoad.edges.length === 5);
    });
    it("none for a circle with two opposite opponent towns", () => {
        const game = new Game();
        const board = new Standard4pDesign();
        board.generateBoardForPlay();
        game.board = board;
        const player1 = new Player();
        const player2 = new Player();
        game.players.push(player1);
        game.players.push(player2);
        game.playerOnTurn = player1;
        const edges = Coord3D.center.edges;

        for (let edge of edges) {
            const road = new Road(player1, edge);
            road.addToPlayer(player1);
            road.addToBoard(game.board);
        }
        const town1 = new Town(player2, Coord3D.center.nodes[0]);
        town1.addToBoard(game.board);
        town1.addToPlayer(player2);
        const town2 = new Town(player2, Coord3D.center.nodes[3]);
        town2.addToBoard(game.board);
        town2.addToPlayer(player2);

        game.calculateLongestRoad();

        assert.ok(game.longestRoad.player === null);
        assert.ok(game.longestRoad.edges === null);
    });
    it("none for a circle with two opposite opponent towns", () => {
        const game = new Game();
        const board = new Standard4pDesign();
        board.generateBoardForPlay();
        game.board = board;
        const player1 = new Player();
        const player2 = new Player();
        game.players.push(player1);
        game.players.push(player2);
        game.playerOnTurn = player1;
        const edges = Coord3D.center.edges;

        for (let edge of edges) {
            const road = new Road(player1, edge);
            road.addToPlayer(player1);
            road.addToBoard(game.board);
        }
        const town1 = new City(player2, Coord3D.center.nodes[0]);
        town1.addToBoard(game.board);
        town1.addToPlayer(player2);
        const town2 = new City(player2, Coord3D.center.nodes[3]);
        town2.addToBoard(game.board);
        town2.addToPlayer(player2);

        game.calculateLongestRoad();

        assert.ok(game.longestRoad.player === null);
        assert.ok(game.longestRoad.edges === null);
    });
    it("7 for a circle with 1-edge tail", () => {
        const game = new Game();
        const board = new Standard4pDesign();
        board.generateBoardForPlay();
        game.board = board;
        const player1 = new Player();
        game.players.push(player1);
        game.playerOnTurn = player1;
        const edges = Coord3D.center.edges;
        const first4Edges = [edges[0], edges[1], edges[2], edges[3]];

        for (let edge of first4Edges) {
            const road = new Road(player1, edge);
            road.addToPlayer(player1);
            road.addToBoard(game.board);
        }
        game.calculateLongestRoad();
        assert.ok(game.longestRoad.player === null);

        const road5 = new Road(player1, edges[4]);
        road5.addToPlayer(player1);
        road5.addToBoard(game.board);
        game.calculateLongestRoad();
        assert.ok(game.longestRoad.player === player1);
        assert.ok(game.longestRoad.edges.length === 5);

        const road6 = new Road(player1, edges[5]);
        road6.addToPlayer(player1);
        road6.addToBoard(game.board);
        game.calculateLongestRoad();
        assert.ok(game.longestRoad.player === player1);
        assert.ok(game.longestRoad.edges.length === 6);

        const edgesSet = new Set(edges);
        const otherEdges = edges[0].node1.otherEdges(edges[0]);
        const tailEdge = edgesSet.has(otherEdges[0]) ? otherEdges[1] : otherEdges[0];
        const road7 = new Road(player1, tailEdge);
        road7.addToPlayer(player1);
        road7.addToBoard(game.board);
        game.calculateLongestRoad();

        assert.ok(game.longestRoad.player === player1);
        assert.ok(game.longestRoad.edges.length === 7);
    });
    it("11 for 2 adjacent circles", () => {
        const game = new Game();
        const board = new Standard4pDesign();
        board.generateBoardForPlay();
        game.board = board;
        const player1 = new Player();
        game.players.push(player1);
        game.playerOnTurn = player1;
        const edges = Coord3D.center.edges;
        const edges2 = Coord3D.center.neighbors[0].edges;
        const edgesSet = new Set([...edges, ...edges2]);

        for (let edge of edgesSet) {
            const road = new Road(player1, edge);
            road.addToPlayer(player1);
            road.addToBoard(game.board);
        }
        game.calculateLongestRoad();
        assert.ok(game.longestRoad.player === player1);
        assert.ok(game.longestRoad.edges.length === 11);
    });
    it("14 for 3 adjacent circles like ꕢ", () => {
        const game = new Game();
        const board = new Standard4pDesign();
        board.generateBoardForPlay();
        game.board = board;
        const player1 = new Player();
        game.players.push(player1);
        game.playerOnTurn = player1;
        const edges = Coord3D.center.edges;
        const edges2 = Coord3D.center.neighbors[0].edges;
        const edges3 = Coord3D.center.neighbors[1].edges;
        const edgesSet = new Set([...edges, ...edges2, ...edges3]);

        for (let edge of edgesSet) {
            const road = new Road(player1, edge);
            road.addToPlayer(player1);
            road.addToBoard(game.board);
        }
        game.calculateLongestRoad();
        assert.ok(game.longestRoad.player === player1);
        assert.ok(game.longestRoad.edges.length === 14);
    });
});