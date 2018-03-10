import { BuildTown } from "./actions/buildTown";

/** validates given state */
export class Matcher {
    constructor() { }
    get message() {
        "reason why it is invalid";
    }
    match() {
        return false;
    }
}
const match = function(matchers) {
    const result = [];
    for (let matcher of matchers) {
        if (!matcher.match()) {
            result.push(matcher.message);
        }
    }
    return result;
}

/** player should have a town in stock */
class HasTownInStock extends Matcher {
    constructor(stock) {
        super();
        this.stock = stock;
    }    
    match() {
        return this.stock.towns > 0;
    }
    get message() {
        return "no town in stock";
    }
}
/** player should have a town in stock */
class HasRoadInStock extends Matcher {
    constructor(stock) {
        super();
        this.stock = stock;
    }    
    match() {
        return this.stock.roads > 0;
    }
    get message() {
        return "no road in stock";
    }
}
/** player should have a town in stock */
class HasCityInStock extends Matcher {
    constructor(stock) {
        super();
        this.stock = stock;
    }    
    match() {
        return this.stock.cities > 0;
    }
    get message() {
        return "no city in stock";
    }
}
/** player must have the current turn */
class IsOnTurn extends Matcher {
    constructor(game, player) {
        super();

        this.game = game;
        this.player = player;
    }
    match() {
        return this.game.playerOnTurn !== this.player;
    }
    get message() {
        return `${this.player.user.name} is not on turn`;
    }
}
/** action should be allowed to play in current gamestate */
class IsExpected extends Matcher {
    constructor(game, action) {
        super();

        this.game = game;
        this.action = action;
    }
    match() {
        return this.game.expectation.matches(this.action);
    }
    get message() {
        return "game phase does not allow this action";
    }
}
/** A player must have suitable nodes to place a town at */
class CanPlaceTownOnBoard extends Matcher {
    constructor(game, player) {
        super();
        this.game = game;
        this.player = player;
    }
    match() {
        return this.game.board.townPossibilities(this.player).length > 0;
    }
    get message() {
        return "no suitable place";
    }
}
/** A player must have suitable nodes to place a road at
 * In practice, this situation will occur when:
 * - InitialPlacement gamephase causes the player not to have any towns
 * - A player is locked in a small area on the board where he can't get out
 */
class CanPlaceRoadOnBoard extends Matcher {
    constructor(game, player) {
        super();
        this.game = game;
        this.player = player;
    }
    match() {
        return this.game.board.roadPossibilities(this.player).length > 0;
    }
    get message() {
        return "no suitable place";
    }
}
/** A player must have a town on the board to replace a city with */
class CanPlaceCityOnBoard extends Matcher {
    constructor(player) {
        super();
        this.player = player;
    }
    match() {
        return this.player.towns.size > 0;
    }
    get message() {
        return "no suitable town";
    }
}
/** A player must be able to pay for a piece directly or indirectly (with bank trades) */
class CanPayPiece extends Matcher {
    constructor(player, cost) {
        super();
        this.player = player;
        this.cost = cost;
    }
    match() {
        return this.player.canPayWith(this.cost);
    }
    get message() {
        return "not enough resources";
    }
}
class NotYetPlayedDevelopmentCard extends Matcher {
    constructor(game) {
        super();
        this.game = game;
    }
    match() {
        return !this.game.playTurns.turn.hasDevelopmentCardPlayed;
    }
    get message() {
        return "max one development card per turn";
    }
}
const canPayPiece = (player, resourceList) => new CanPayPiece(player, resourceList);
const canPlaceCityOnBoard = (player) => new CanPlaceCityOnBoard(player);
const canPlaceTownOnBoard = (game, player) => new CanPlaceTownOnBoard(game, player);
const canPlaceRoadOnBoard = (game, player) => new CanPlaceRoadOnBoard(game, player);
const isExpected = (game, action) => new IsExpected(game, action);
const isOnTurn = (game, player) => new IsOnTurn(game, player);
const hasTownInStock = (stock) => new HasTownInStock(stock);
const hasRoadInStock = (stock) => new HasRoadInStock(stock);
const hasCityInStock = (stock) => new HasCityInStock(stock);
const notYetPlayedDevelopmentCard = (game) => new NotYetPlayedDevelopmentCard(game);

export { 
    match, hasTownInStock, isOnTurn, isExpected, canPlaceTownOnBoard, 
    canPlaceCityOnBoard, canPlaceRoadOnBoard, hasRoadInStock, hasCityInStock,
    notYetPlayedDevelopmentCard
};