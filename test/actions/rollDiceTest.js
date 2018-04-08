import * as assert from "assert";
import { jsettlers as pb } from "../../src/generated/data";
import { Player } from "../../src/player";
import { RollDice, Dice } from "../../src/actions/rollDice";
import { Town } from "../../src/town";
import { City } from "../../src/city";
import { Game } from "../../src/game";

describe("RollDice", () => {
    it("serializes with productionByPlayer", () => {
        const player1 = new Player({ id: 1 });
        const player2 = new Player({ id: 2 });
        const game = new Game();
        game.players.push(player1);
        game.players.push(player2);
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
        const copy = RollDice.fromData(revived, game);
            
        assert.ok(copy instanceof RollDice);
        assert.strictEqual(1, copy.player.id);
        assert.ok(copy.productionByPlayer.has(player1));
        assert.ok(copy.productionByPlayer.has(player2));
        assert.ok(Town.cost.equals(copy.productionByPlayer.get(player1)));
        assert.ok(City.cost.equals(copy.productionByPlayer.get(player2)));
        assert.strictEqual(2, copy.dice.die1);
        assert.strictEqual(3, copy.dice.die2);
    });
});