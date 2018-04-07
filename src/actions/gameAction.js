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
    /** sets state on the host, which knows about "secret stuff" like player
    resources and development cards. Any logic requiring the randomizer also
    needs to be performed at the host first, like randomly picking a resource of
    an opponent in RobPlayer.  */
    performAtHost(hostGame) { }
}