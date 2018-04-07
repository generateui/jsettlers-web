import * as assert from "assert";
import { Soldier, DevelopmentCard, YearOfPlenty, Monopoly, RoadBuilding, VictoryPoint } from "../src/developmentCard";
import { Player } from "../src/player";
import { jsettlers as pb } from "../src/generated/data"
import { PlayerResolver } from "../src/actions/gameActionHelper";

const serializeThenDeserialize = function(developmentCard, resolver) {
    const dc = developmentCard;
    const buffer = pb.DevelopmentCard.encode(dc.data).finish();
    const revived = pb.DevelopmentCard.decode(buffer);
    const copy = DevelopmentCard.fromData(revived, resolver);
    return copy;
}

describe("Soldier", () => {
    it("serializes", () => {
        var player = new Player({ id: 1 });
        var resolver = new PlayerResolver(player);
        var soldier = new Soldier({ player: player });
        soldier.turnBoughtIndex = 3;
        soldier.turnPlayedIndex = 4;

        const copy = serializeThenDeserialize(soldier, resolver);

        assert.ok(copy instanceof Soldier);
        assert.equal(1, copy.player.id);
        assert.equal(3, copy.turnBoughtIndex);
        assert.equal(4, copy.turnPlayedIndex);
    });
});
describe("YearOfPlenty", () => {
    it("serializes", () => {
        var player = new Player({ id: 2 });
        var resolver = new PlayerResolver(player);
        var yop = new YearOfPlenty({ 
            player: player,
            resourceType1: pb.ResourceType.Wheat,
            resourceType2: pb.ResourceType.Timber,
        });
        yop.turnBoughtIndex = 4;
        yop.turnPlayedIndex = 5;

        const copy = serializeThenDeserialize(yop, resolver);

        assert.ok(copy instanceof YearOfPlenty);
        assert.equal(2, copy.player.id);
        assert.equal(4, copy.turnBoughtIndex);
        assert.equal(5, copy.turnPlayedIndex);
        assert.equal(pb.ResourceType.Wheat, copy.resourceType1);
        assert.equal(pb.ResourceType.Timber, copy.resourceType2);
    });
});
describe("Monopoly", () => {
    it("serializes", () => {
        var player = new Player({ id: 3 });
        var resolver = new PlayerResolver(player);
        var monopoly = new Monopoly({ 
            player: player,
            resourceType: pb.ResourceType.Ore
        });
        monopoly.turnBoughtIndex = 9;
        monopoly.turnPlayedIndex = 8;

        const copy = serializeThenDeserialize(monopoly, resolver);

        assert.ok(copy instanceof Monopoly);
        assert.equal(3, copy.player.id);
        assert.equal(9, copy.turnBoughtIndex);
        assert.equal(8, copy.turnPlayedIndex);
        assert.equal(pb.ResourceType.Ore, copy.resourceType);
    });
});
describe("RoadBuilding", () => {
    it("serializes", () => {
        var player = new Player({ id: 4 });
        var resolver = new PlayerResolver(player);
        var roadBuilding = new RoadBuilding({ player: player });
        roadBuilding.turnBoughtIndex = 2;
        roadBuilding.turnPlayedIndex = 7;

        const copy = serializeThenDeserialize(roadBuilding, resolver);

        assert.ok(copy instanceof RoadBuilding);
        assert.equal(4, copy.player.id);
        assert.equal(2, copy.turnBoughtIndex);
        assert.equal(7, copy.turnPlayedIndex);
    });
});
describe("VictoryPoint", () => {
    it("serializes", () => {
        var player = new Player({ id: 5 });
        var resolver = new PlayerResolver(player);
        var victoryPoint = new VictoryPoint({ player: player });
        victoryPoint.turnBoughtIndex = 11;
        victoryPoint.turnPlayedIndex = 17;

        const copy = serializeThenDeserialize(victoryPoint, resolver);

        assert.ok(copy instanceof VictoryPoint);
        assert.equal(5, copy.player.id);
        assert.equal(11, copy.turnBoughtIndex);
        assert.equal(17, copy.turnPlayedIndex);
    });
});