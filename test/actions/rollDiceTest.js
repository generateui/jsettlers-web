import * as assert from "assert";
import { jsettlers as pb } from "../../src/generated/data";
import { Player } from "../../src/player";
import { RollDice, Dice } from "../../src/actions/rollDice";
import { Town } from "../../src/town";
import { City } from "../../src/city";

describe("RollDice", () => {
    it("serializes with productionByPlayerId", () => {
        const player1 = new Player({ id: 1 });
        const player2 = new Player({ id: 2 });
        const productionByPlayer = new Map();
        productionByPlayer.set(player1, Town.cost);
        productionByPlayer.set(player2, City.cost);
        const rollDice = new RollDice({ 
            player: player1,
            dice: new Dice(2, 3),
            productionByPlayer: productionByPlayer
        });

        const buffer = pb.GameAction.encode(rollDice.data).finish();
        const revived = pb.GameAction.decode(buffer);
        const copy = RollDice.fromData(revived);
            
        assert.ok(copy instanceof RollDice);
        assert.strictEqual(1, copy.playerId);
        assert.ok(copy.productionByPlayerId.has(1));
        assert.ok(copy.productionByPlayerId.has(2));
        assert.ok(Town.cost.equals(copy.productionByPlayerId.get(1)));
        assert.ok(City.cost.equals(copy.productionByPlayerId.get(2)));
        assert.strictEqual(2, copy.dice.die1);
        assert.strictEqual(3, copy.dice.die2);
    });
});