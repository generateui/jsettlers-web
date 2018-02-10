import {BoardRenderer} from "./boardRenderer.js";
import {RobberRenderer} from "./robberRenderer.js";
import {TownRenderer} from "./townRenderer.js";
import {RoadRenderer} from "./roadRenderer.js";
import {CityRenderer} from "./cityRenderer.js";
import {Game} from "../../game.js";

export class GameBoardRenderer extends BoardRenderer {
    constructor(game, gameBoardBehavior) {
        super();

        // TODO: override behavior too?
        this.gameBoardBehavior = gameBoardBehavior;
        this._game = game;

        this.townRenderers = new Map(); // <Node, Town>
        this.cityRenderers = new Map(); // <Node, City>
        this.roadRenderers = new Map(); // <Edge, Road>
        this.robberRenderer = new RobberRenderer(this, board.robber);
    }
    initialize() {
        super.initialize();
        this.removeTownAddedSubscription = this.board.towns.added((key, value) => {
            var townRenderer = new TownRenderer(this, value);
            this.townRenderers.set(value, townRenderer);
        });
        this.removeCityAddedSubscription = this.board.cities.added((key, value) => {
            var cityRenderer = new CityRenderer(this, value);
            this.cityRenderers.set(value, cityRenderer);
        });
        this.removeRoadAddedSubscription = this.board.roads.added((key, value) => {
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
        super.reset();
    }
}