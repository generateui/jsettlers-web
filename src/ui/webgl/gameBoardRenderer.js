import {BoardRenderer} from "./boardRenderer.js";
import {RobberRenderer} from "./robberRenderer.js";
import {TownRenderer} from "./townRenderer.js";
import {RoadRenderer} from "./roadRenderer.js";
import {CityRenderer} from "./cityRenderer.js";
import {Game} from "../../game.js";
import { NoBehavior } from "../BoardBehavior";

export class GameBoardRenderer {
    constructor(element, game, gameBoardBehavior) {
        this.gameBoard = game.gameBoard;
        // TODO: override behavior too?
        this.gameBoardBehavior = gameBoardBehavior || new NoBehavior();
        this._game = game;
        this.boardRenderer = new BoardRenderer(element, game.gameBoard);

        this.townRenderers = new Map(); // <Node, Town>
        this.cityRenderers = new Map(); // <Node, City>
        this.roadRenderers = new Map(); // <Edge, Road>
        this.robberRenderer = new RobberRenderer(this, this.gameBoard.robber);

        this.initialize();
    }
    addMesh(mesh) {
        this.boardRenderer.addMesh(mesh);
    }
    initialize() {
        this.boardRenderer.initialize();
        this.removeTownAddedSubscription = this.gameBoard.towns.added((key, value) => {
            var townRenderer = new TownRenderer(this, value);
            this.townRenderers.set(value, townRenderer);
        });
        this.removeCityAddedSubscription = this.gameBoard.cities.added((key, value) => {
            var cityRenderer = new CityRenderer(this, value);
            this.cityRenderers.set(value, cityRenderer);
        });
        this.removeRoadAddedSubscription = this.gameBoard.roads.added((key, value) => {
            var roadRenderer = new RoadRenderer(this, value);
            this.roadRenderers.set(value, roadRenderer);
        });
    }
    reset() {
        this.disposeRenderers(this.townRenderers, this.scene.scene);
        this.disposeRenderers(this.cityRenderers, this.scene.scene);
        this.disposeRenderers(this.roadRenderers, this.scene.scene);
        this.removeTownAddedSubscription();
        this.removeCityAddedSubscription();
        this.removeRoadAddedSubscription();
        this.boardRenderer.reset();
    }
}