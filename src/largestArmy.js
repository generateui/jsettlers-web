import { jsettlers as pb } from "../src/generated/data"
import { Observable } from "./generic/observable";

export class LargestArmy extends Observable {
    constructor(player) {
        super();

        this.name = "LargestArmy";
        this.victoryPoints = 2;
        this.player = player || null;

        super.makeObservable(["player"]);
    }
    static fromData(data, game) {
        let player = null;
        if (data.playerId !== undefined) {
            player = game.getPlayerById(data.playerId);
        }
        return new LargestArmy(player);
    }
    get data() {
        const data = pb.LargestArmy.create({ });
        if (this.player !== null) {
            data.playerId = this.player.id;
        }
        return data;
    }
}