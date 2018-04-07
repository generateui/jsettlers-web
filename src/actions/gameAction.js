export class GameAction {
    constructor(config) {
        config = config || {};
        this.player = config.player || null;
        if (config.id !== undefined) {
            this.id = config.id;
        } else {
            this.id = null;
        }
    }
    /** set references of this action after deserialization */
    performServer(host) { }
}