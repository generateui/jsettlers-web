export class Action {
    constructor() {
        this.player = null;
        this.id = null;
    }
    static setIds(action, data) {
        action.playerId = data.getPlayerid();
        action.id = data.getId();
    }
}