export class GameAction {
    constructor() {
        this.player = null;
        this.id = null;
    }
    static setIds(action, data) {
        action.playerId = data.getPlayerId();
        action.id = data.getId();
    }
    static setReferences(action, game) {
        action.player = game.getPlayerById(action.playerId);
    }
}