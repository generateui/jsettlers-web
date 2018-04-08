import { jsettlers as pb } from "../src/generated/data"
import * as assert from "assert";
import { PortList, Any4To1Port, Timber2To1Port, Any3To1Port, Wheat2To1Port, 
    Sheep2To1Port, Clay2To1Port, Port } from "../src/port";
import { Timber, ResourceList, Wheat, Brick, Ore, Sheep } from '../src/resource';
import { Coord3D } from "../src/coord";

describe("Port", () => {
    it("serializes empty port", () => {
        const port = new Any3To1Port();

        const buffer = pb.Port.encode(port.data).finish();
        const revived = pb.Port.decode(buffer);
        const copy = Port.fromData(revived);

        assert.strictEqual(null, port.seaCoord);
        assert.strictEqual(null, port.partIndex);
        assert.strictEqual(pb.PortType.Any3To1, port.type);
    });
    it("serializes port with seaCoord and partIndex", () => {
        const port = new Any4To1Port(2, Coord3D.center.neighbors[1]);

        const buffer = pb.Port.encode(port.data).finish();
        const revived = pb.Port.decode(buffer);
        const copy = Port.fromData(revived);

        assert.strictEqual(Coord3D.center.neighbors[1], port.seaCoord);
        assert.strictEqual(2, port.partIndex);
        assert.strictEqual(pb.PortType.Any4To1, port.type);
    });
});
describe("PortList", () => {
    describe("bestPortForResourceType", () => {
        it("timberport when having timber", () => {
            const portList = new PortList();
            var timberPort = new Timber2To1Port();
            portList.add(timberPort);
            portList.add(new Any4To1Port());
            portList.add(new Any3To1Port());

            assert.ok(portList.bestPortForResourceType(pb.ResourceType.Timber) === timberPort);
        });
        it("any 3:1 when having port of other types", () => {
            const portList = new PortList();
            const any31port = new Any3To1Port();
            portList.add(any31port);
            portList.add(new Any4To1Port());
            portList.add(new Wheat2To1Port());
            portList.add(new Sheep2To1Port());

            assert.ok(portList.bestPortForResourceType(pb.ResourceType.Timber) === any31port);
            assert.ok(portList.bestPortForResourceType(pb.ResourceType.Ore) === any31port);
            assert.ok(portList.bestPortForResourceType(pb.ResourceType.Brick) === any31port);
        });
    });
    describe("amountGold", () => {
        it("1 with only 4 Resources of one type having any4:1 port", () => {
            const portList = new PortList();
            portList.add(new Any4To1Port());
            const resourceList = new ResourceList();
            resourceList.addAmount(new Wheat(), 4);

            assert.ok(portList.amountGold(resourceList) === 1);
        });
        it("1 with 5, 6 or 7 Resources of one type having any4:1 port", () => {
            const portList = new PortList();
            portList.add(new Any4To1Port());
            const resourceList = new ResourceList();
            resourceList.addAmount(new Wheat(), 4);

            assert.ok(portList.amountGold(resourceList) === 1);

            resourceList.add(new Wheat()); //5
            assert.ok(portList.amountGold(resourceList) === 1);

            resourceList.add(new Wheat()); //6
            assert.ok(portList.amountGold(resourceList) === 1);

            resourceList.add(new Wheat()); //7
            assert.ok(portList.amountGold(resourceList) === 1);
        });
        it("2 with 8 Resources of one type and other Resources having any4:1 port", () => {
            const portList = new PortList();
            portList.add(new Any4To1Port());
            const resourceList = new ResourceList();
            resourceList.addAmount(new Wheat(), 8);
            resourceList.add(new Brick());
            resourceList.add(new Brick());
            resourceList.add(new Brick());
            resourceList.add(new Ore());
            resourceList.add(new Ore());
            resourceList.add(new Wheat());
            resourceList.add(new Sheep());
            resourceList.add(new Sheep());
            resourceList.add(new Sheep());
            
            assert.ok(portList.amountGold(resourceList) === 2);
        });
        it("2 with 8 Resources of one type and other Resources having any3:1 port", () => {
            const portList = new PortList();
            portList.add(new Any4To1Port());
            const resourceList = new ResourceList();
            resourceList.addAmount(new Wheat(), 8);
            resourceList.add(new Brick());
            resourceList.add(new Brick());
            resourceList.add(new Ore());
            resourceList.add(new Ore());
            resourceList.add(new Timber());
            resourceList.add(new Sheep());
            resourceList.add(new Sheep());

            assert.ok(portList.amountGold(resourceList) === 2);
        });
        it("4 with many ports and resources", () => {
            const portList = new PortList();
            portList.add(new Any4To1Port());
            portList.add(new Any3To1Port());
            portList.add(new Clay2To1Port());
            const resourceList = new ResourceList();
            resourceList.addAmount(new Wheat(), 8);
            resourceList.add(new Brick());
            resourceList.add(new Brick());
            resourceList.add(new Ore());
            resourceList.add(new Ore());
            resourceList.add(new Timber());
            resourceList.add(new Sheep());
            resourceList.add(new Sheep());
            resourceList.add(new Sheep());

            assert.ok(portList.amountGold(resourceList) === 4);
        });
    });
});