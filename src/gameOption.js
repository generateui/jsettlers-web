import { Stock } from "./stock";
import { Coord } from "./coord";

export class GameOptions {
    constructor() {
        this.stock = new StockOption();
        this.robber = new RobberOption();
        this.victoryPointsToWin = new VictoryPointsToWin();
    }
    set(game) {
        this.stock.set(game);
        this.robber.set(game);
        this.victoryPointsToWin.set(game);
    }
    static parse(gameOptionsExpression, resolver) {
        for (let gameOption of gameOptionsExpression.gameOption()) {
            let stockOptionExpr = gameOption.stock();
            if (stockOptionExpr !== null) {
                this.stockOption = StockOption.parse(stockOptionExpr);
            }
            let robberOptionExpr = gameOption.robber();
            if (robberOptionExpr !== null) {
                this.robberOption = RobberOption.parse(robberOptionExpr, resolver);
            }
        }
    }
}
/** Something the user can change before starting the game */
export class GameOption {
    constructor() { }
    // changes the state of Game
    set(game) { }
}
export class StockOption extends GameOption {
    constructor() {
        super();
        this.stock = new Stock();
    }
    set(game) {
        for (let player of game.players) {
            player.stock.towns = this.stock.towns;
            player.stock.roads = this.stock.roads;
            player.stock.cities = this.stock.cities;
        }
    }
    static parse(stockOptionExpression) {
        this.stock = Stock.parse(stockOptionExpression);
    }
}
// TODO: add a parameter to determine robber starting position? E.g. 
// Desert | Random | Sea
export class RobberOption extends GameOption {
    constructor(coord, enabled) {
        super();
        this.coord = coord;
        this.enabled = enabled;
    }
    set(game) {
        // TODO: switch on/off?
        game.board.robber.coord = this.coord;
    }
    static parse(robberOptionExpression, resolver) {
        const expr = robberOptionExpression;
        const coord3D = resolver.parseCoord(expr.coord());
        return new RobberOption(coord3D, true);
    }
}
export class VictoryPointsToWin extends GameOption {
    constructor(points) {
        super();
        this.points = points || 10;
    }
    set(game) {
        game.victoryPointsToWin = this.points;
    }
    static parse(victoryPointsToWinExpression) {
        const expr = victoryPointsToWinExpression;
        const points = parseInt(expr.NUMBER());
        return new VictoryPointsToWin(points);
    }
}