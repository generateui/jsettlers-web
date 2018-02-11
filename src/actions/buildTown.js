import {Town} from "../town.js";

export class BuildTown {
    constructor() {
        this.node = null;
    }
    perform(game) {
        const town = new Town(game.player, this.node);
        game.board.towns.set(this.node, town);
    }
}