import * as assert from "assert";
import { jsettlers as pb } from "../src/generated/data";
import { Bank } from "../src/bank";
import { ResourceList } from "../src/resource";
import { YearOfPlenty, Soldier, Monopoly, VictoryPoint, RoadBuilding } from "../src/developmentCard";
import { Game } from "../src/game";

describe("Bank", () => {
    it("serializes", () => {
        const bank = new Bank({
            resources: new ResourceList([
                pb.ResourceType.Wheat,
                pb.ResourceType.Wheat,
                pb.ResourceType.Timber,
                pb.ResourceType.Ore,
                pb.ResourceType.Ore,
                pb.ResourceType.Sheep,
                pb.ResourceType.Sheep,
                pb.ResourceType.Brick,
                pb.ResourceType.Brick,
                pb.ResourceType.Brick,
            ]),
            developmentCards: [
                new Soldier(),
                new Soldier(),
                new YearOfPlenty(),
                new YearOfPlenty(),
                new YearOfPlenty(),
                new Monopoly(),
                new VictoryPoint(),
                new RoadBuilding(),
                new RoadBuilding(),
            ]
        });
        const game = new Game();

        const buffer = pb.Bank.encode(bank.data).finish();
        const revived = pb.Bank.decode(buffer);
        const copy = Bank.fromData(revived, game);
            
        assert.ok(copy instanceof Bank);
        assert.strictEqual(10, copy.resources.length);
        assert.strictEqual(2, copy.resources.of(pb.ResourceType.Wheat).length);
        assert.strictEqual(1, copy.resources.of(pb.ResourceType.Timber).length);
        assert.strictEqual(2, copy.resources.of(pb.ResourceType.Ore).length);
        assert.strictEqual(2, copy.resources.of(pb.ResourceType.Sheep).length);
        assert.strictEqual(3, copy.resources.of(pb.ResourceType.Brick).length);
        assert.strictEqual(9, copy.developmentCards.length);
        assert.strictEqual(2, copy.developmentCards.filter(dc => dc instanceof Soldier).length);
        assert.strictEqual(3, copy.developmentCards.filter(dc => dc instanceof YearOfPlenty).length);
        assert.strictEqual(1, copy.developmentCards.filter(dc => dc instanceof Monopoly).length);
        assert.strictEqual(1, copy.developmentCards.filter(dc => dc instanceof VictoryPoint).length);
        assert.strictEqual(2, copy.developmentCards.filter(dc => dc instanceof RoadBuilding).length);
    });
});