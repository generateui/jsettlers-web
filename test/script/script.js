import { Parser } from "../../src/parser";
import { From2DBoard } from "../../src/board";
import { ResourceList } from "../../src/resource";
import { Player } from "../../src/player";
import { Stock } from "../../src/stock";
import { Monopoly, VictoryPoint, RoadBuilding, YearOfPlenty, Soldier, DevelopmentCard } from "../../src/developmentCard";
import { Node } from "../../src/node";
import { notEqual } from "assert";
import { Town } from "../../src/town";
import { Edge } from "../../src/edge";
import { Port } from "../../src/port";
import { Road } from "../../src/road";
import { City } from "../../src/city";
import { BuildCity } from "../../src/actions/buildCity";
import { BuildTown } from "../../src/actions/buildTown";
import { BuildRoad } from "../../src/actions/buildRoad";
import { Game, GameOptions } from "../../src/game";
import { HasRoadAt, HasTownAt, Matcher, HasAmountPiecesInStock } from "../../src/matcher";
import { GameAction } from "../../src/actions/gameAction";

export class Script {
    constructor() {
        this.actionsOrChecks = [];
        this.stepIndex = 0;
        this.game = null;
    }
    get hasStepsLeft() {
        return this.stepIndex < this.actionsOrChecks.length;
    }
    parse(scriptName) {
        var parser = Parser.parseFile("test/script/game1");
        var scriptExpression = parser.script();
        var gameExpression = scriptExpression.game();
        var boardExpression = gameExpression.board();
        var board = new From2DBoard(boardExpression);

        var gameOptions = new GameOptions();
        for (let gameOption of gameExpression.gameOptions().gameOption()) {
            if (gameOption.stockCities() !== null) {
                let amount = parseInt(gameOption.stockCities().NUMBER());
                gameOptions.stockCities.cities = amount;
            }
            if (gameOption.stockTowns() !== null) {
                let amount = parseInt(gameOption.stockTowns().NUMBER());
                gameOptions.stockTowns.towns = amount;
            }
            if (gameOption.stockRoads() !== null) {
                let amount = parseInt(gameOption.stockRoads().NUMBER());
                gameOptions.stockRoads.roads = amount;
            }
        }
        this.gameOptions = gameOptions;

        var players = [];
        for (let playerExpression of gameExpression.players()) {
            var player = new Player();
            var playerId = parseInt(playerExpression.player().NUMBER());
            player.id = playerId;
            for (let spo of playerExpression.setupPlayerOption()) {
                if (spo.hand() !== null) {
                    var resources = ResourceList.parse(spo.hand().resourceSet());
                    player.resources = resources;
                }
                if (spo.stock() !== null) {
                    var stockExpression = spo.stock();
                    var stock = Stock.parse(stockExpression);
                    player.stock = stock;
                }
                if (spo.devCards() !== null) {
                    for (let dce of spo.devCards().devCard()) {
                        let developmentCard = DevelopmentCard.parse(dce);
                        developmentCard.player = player;
                        player.developmentCards.push(developmentCard);
                    }
                }
                if (spo.ports() !== null) {
                    for (let portExpression of spo.ports().port()) {
                        let port = Port.parse(portExpression);
                        player.ports.add(port);
                    }
                }
                // if (spo.victoryPoints() !== null) TODO
                if (spo.towns() !== null) {
                    for (let nodeExpression of spo.towns().node()) {
                        let node = Node.parse(nodeExpression);
                        const node3D = board.convertTo3D.convertNode(node);
                        let town = new Town(player, node3D);
                        town.addToPlayer(player);
                        town.addToBoard(board);
                    }
                }
                if (spo.cities() !== null) {
                    for (let nodeExpression of spo.cities().node()) {
                        let node = Node.parse(nodeExpression);
                        const node3D = board.convertTo3D.convertNode(node);
                        let city = new City(player, node3D);
                        city.addToPlayer(player);
                        city.addToBoard(board);
                    }
                }
                if (spo.roads() !== null) {
                    for (let edgeExpression of spo.roads().edge()) {
                        let edge = Edge.parse(edgeExpression);
                        const edge3D = board.convertTo3D.convertEdge(edge);
                        let road = new Road(player, edge3D);
                        road.addToPlayer(player);
                        road.addToBoard(board);
                    }
                }
            }
            players.push(player);
        }
        this.game = new Game();
        this.game.players = players;
        this.game.board = board;
        this.placementActionsWithChecks = [];
        for (let placementItem of scriptExpression.placements().placementItem()) {
            let buildAction = placementItem.buildAction();
            let checkItem = placementItem.checkItem();
            let check = checkItem === null ? null : checkItem.check();

            if (check !== null) {
                if (check.hasRoadAt() !== null) {
                    const playerId = parseInt(check.hasRoadAt().player().NUMBER());
                    const player = this.game.getPlayerById(playerId);
                    const edge = Edge.parse(check.hasRoadAt().edge());
                    const edge3D = board.convertTo3D.convertEdge(edge)
                    this.actionsOrChecks.push(new HasRoadAt(player, edge3D));
                }
                if (check.hasTownAt() !== null) {
                    const playerId = parseInt(check.hasTownAt().player().NUMBER());
                    const player = this.game.getPlayerById(playerId);
                    const node = Node.parse(check.hasTownAt().node());
                    const node3D = board.convertTo3D.convertNode(node);
                    this.actionsOrChecks.push(new HasTownAt(player, node3D));
                }
                if (check.hasAmountPiecesInStock() !== null) {
                    const playerId = parseInt(check.hasAmountPiecesInStock().player().NUMBER());
                    const player = this.game.getPlayerById(playerId);
                    const amount = parseInt(check.hasAmountPiecesInStock().NUMBER());
                    let piece = null;
                    if (check.hasAmountPiecesInStock().piece().town() !== null) {
                        piece = new Town();
                    }
                    if (check.hasAmountPiecesInStock().piece().city() !== null) {
                        piece = new City();
                    }
                    if (check.hasAmountPiecesInStock().piece().road() !== null) {
                        piece = new Road();
                    }
                    this.actionsOrChecks.push(new HasAmountPiecesInStock(player, amount, piece));
                }
            }
            
            if (buildAction !== null) {
                if (buildAction.buildCity() !== null) {
                    const playerId = parseInt(buildAction.buildCity().player().NUMBER());
                    const player = this.game.getPlayerById(playerId);
                    const action = new BuildCity({ player: player });
                    this.actionsOrChecks.push(action);
                }
                if (buildAction.buildTown() !== null) {
                    const playerId = parseInt(buildAction.buildTown().player().NUMBER());
                    const player = this.game.getPlayerById(playerId);
                    const node = Node.parse(buildAction.buildTown().node());
                    const node3D = board.convertTo3D.convertNode(node);
                    const action = new BuildTown({ player: player, node: node3D });
                    this.actionsOrChecks.push(action);
                }
                if (buildAction.buildRoad() !== null) {
                    const playerId = parseInt(buildAction.buildRoad().player().NUMBER());
                    const player = this.game.getPlayerById(playerId);
                    const edge = Edge.parse(buildAction.buildRoad().edge());
                    const edge3D = board.convertTo3D.convertEdge(edge)
                    const action = new BuildRoad({ player: player, edge: edge3D });
                    this.actionsOrChecks.push(action);
                }
            }
        }
    }
    start() {
        this.game.start(this.gameOptions);
        this.game.goToNextPhase();
    }
    executeStep() {
        const actionOrCheck = this.actionsOrChecks[this.stepIndex];
        if (actionOrCheck instanceof GameAction) {
            actionOrCheck.perform(this.game);
        }
        if (actionOrCheck instanceof Matcher) {
            let result = actionOrCheck.match();
            if (!result) {
                throw new Error(actionOrCheck.message);
            }
        }
        this.stepIndex += 1;
    }
}