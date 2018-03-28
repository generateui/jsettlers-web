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
import { GameOptions } from "../../src/gameOption";
import { Game, StockOption, RobberOption } from "../../src/game";
import { HasRoadAt, HasTownAt, Matcher, HasAmountPiecesInStock } from "../../src/matcher";
import { GameAction } from "../../src/actions/gameAction";
import { LooseResources } from "../../src/actions/looseResources";
import { Coord } from "../../src/coord";

/** Resolves instances when the class itself cannot.
For instance, an Edge can parse its child coords. However, it cannot convert
from Edge1D or Edge2D into an Edge3D. */
export class Resolver {
    constructor(convertTo3D) {
        this.convertTo3D = convertTo3D;
        this.players = null; // []
    }
    /** player instance can be of several game instances, which classes should 
    not be concerned about */
    parsePlayer(playerExpression) {
        // TODO: support client/server
        var playerId = parseInt(playerExpression.NUMBER());
        return this.players.find(p => p.id === playerId);
    }
    parseNode(nodeExpression) {
        let node = Node.parse(nodeExpression);
        return this.convertTo3D.convertNode(node);
    }
    parseEdge(edgeExpression) {
        let edge = Edge.parse(edgeExpression);
        return this.convertTo3D.convertEdge(edge);
    }
    parseCoord(coordExpression) {
        let coord = Coord.parse(coordExpression);
        return this.convertTo3D.convertCoord(coord);
    }
}
export class ScriptExecutor {
    constructor(script) {
        this.script = script;
    }
}
export class Script {
    constructor() {
        this.actionsOrChecks = [];
        this.turnActionsOrChecks = [];
        this.stepIndex = 0;
        this.game = null;
        this.turnIndex = 0;
    }
    get hasStepsLeft() {
        if (this.game.phase === this.game.initialPlacement) {
            return this.stepIndex < this.actionsOrChecks.length;
        }
        if (this.game.phase === this.game.playTurns) {
            if (this.turnIndex === this.turns.length) {
                return false;
            }
            return true;
        }
    }
    parse(scriptName) {
        var parser = Parser.parseFile("test/script/game1");
        var scriptExpression = parser.script();
        var gameExpression = scriptExpression.game();
        var boardExpression = gameExpression.board();
        var board = new From2DBoard(boardExpression);

        this.game = new Game();
        let resolver = new Resolver(board.convertTo3D);

        this.gameOptions = GameOptions.parse(gameExpression.gameOptions(), resolver);

        var players = [];
        for (let playerExpression of gameExpression.players()) {
            var player = new Player();
            var playerId = parseInt(playerExpression.player().NUMBER());
            player.id = playerId;
            for (let spo of playerExpression.setupPlayerOption()) {
                if (spo.hand() !== null) {
                    player.resources = ResourceList.parse(spo.hand().resourceSet());
                }
                if (spo.stock() !== null) {
                    player.stock = Stock.parse(spo.stock());
                }
                if (spo.devCards() !== null) {
                    for (let dce of spo.devCards().devCard()) {
                        let developmentCard = DevelopmentCard.parse(dce, resolver);
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
                        let node = resolver.parseNode(nodeExpression);
                        let town = new Town(player, node);
                        town.addToPlayer(player);
                        town.addToBoard(board);
                    }
                }
                if (spo.cities() !== null) {
                    for (let nodeExpression of spo.cities().node()) {
                        let node = resolver.parseNode(nodeExpression);
                        let city = new City(player, node);
                        city.addToPlayer(player);
                        city.addToBoard(board);
                    }
                }
                if (spo.roads() !== null) {
                    for (let edgeExpression of spo.roads().edge()) {
                        let edge = resolver.parseEdge(edgeExpression);
                        let road = new Road(player, edge);
                        road.addToPlayer(player);
                        road.addToBoard(board);
                    }
                }
            }
            players.push(player);
        }
        resolver.players = players;
        this.game.players = players;
        this.game.board = board;
        this.placementActionsWithChecks = [];
        for (let placementItem of scriptExpression.placements().placementItem()) {
            let buildAction = placementItem.buildAction();
            let checkItem = placementItem.checkItem();
            let checkExpression = checkItem === null ? null : checkItem.check();
            if (checkExpression !== null) {
                const check = Matcher.parse(checkExpression, resolver);
                this.actionsOrChecks.push(check);
            }
            if (buildAction !== null) {
                const action = this._parseAction(buildAction, resolver);
                this.actionsOrChecks.push(action);
            }
        }
        const turns = [];
        for (let turn of scriptExpression.turns().turn()) {
            // const turnNumber = parseInt(turn.NUMBER());
            const actionOrChecks = [];
            for (let turnItem of turn.turnItem()) {
                const actionExpression = turnItem.action();
                const checkItem = turnItem.checkItem();
                let checkExpression = checkItem === null ? null : checkItem.check();
                if (actionExpression !== null) {
                    const action = this._parseAction(actionExpression, resolver);
                    actionOrChecks.push(action);
                }
                if (checkExpression !== null) {
                    const check = Matcher.parse(checkExpression, resolver);
                    actionOrChecks.push(check);
                }
            }
            turns.push(actionOrChecks);
        }
        this.turns = turns;
    }
    // can't be moved to GameAction because it causes circular references which
    // are not supported by babel.js
    _parseAction(actionExpression, resolver) {
        const expr = actionExpression;
        let action = null;
        if (expr.buildCity() !== null) {
            return BuildCity.parse(expr.buildCity(), resolver);
        }
        if (expr.buildTown() !== null) {
            return BuildTown.parse(expr.buildTown(), resolver);
        }
        if (expr.buildRoad() !== null) {
            return BuildRoad.parse(expr.buildRoad(), resolver);
        }
        if (expr.looseResources() !== null) {
            return LooseResources.parse(expr.looseResources(), resolver);
        }
        return null;
    }
    start() {
        this.game.start(this.gameOptions);
        this.game.goToNextPhase();
    }
    executeStep() {
        if (this.game.phase === this.game.initialPlacement) {
            const actionOrCheck = this.actionsOrChecks[this.stepIndex];
            this.executeActionOrCheck(actionOrCheck);
            this.stepIndex += 1;
        }
        if (this.game.phase === this.game.playTurns) {
            const actionOrCheck = this.turnActionsOrChecks[this.stepIndex];
            this.executeActionOrCheck(actionOrCheck);
            this.stepIndex += 1;
            if (this.stepIndex === this.turnActionsOrChecks.length) {
                this.turnIndex += 1;
                if (this.turnIndex < this.turns.length) {
                    this.turnActionsOrChecks = this.turns[this.turnIndex];
                    this.stepIndex = 0;
                }
            }
        }
    }
    executeActionOrCheck(actionOrCheck) {
        if (actionOrCheck instanceof GameAction) {
            actionOrCheck.perform(this.game);
        }
        if (actionOrCheck instanceof Matcher) {
            let result = actionOrCheck.match();
            if (!result) {
                throw new Error(actionOrCheck.message);
            }
        }
    }
}