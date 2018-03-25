require('babel-register')();
var proto = require("../src/generated/data_pb")
var assert = require('assert');
require("../src/generic/shims");
import {PortList, Any4To1Port, Timber2To1Port, Any3To1Port, Wheat2To1Port, Sheep2To1Port, Clay2To1Port} from "../src/port";
import { Timber, ResourceList, Wheat, Brick, Ore, Sheep } from '../src/resource';

describe("PortList", () => {
    describe("bestPortForResourceType", () => {
        it("timberport when having timber", () => {
            const portList = new PortList();
            var timberPort = new Timber2To1Port();
            portList.add(timberPort);
            portList.add(new Any4To1Port());
            portList.add(new Any3To1Port());

            assert.ok(portList.bestPortForResourceType(proto.ResourceType.TIMBER) === timberPort);
        });
        it("any 3:1 when having port of other types", () => {
            const portList = new PortList();
            const any31port = new Any3To1Port();
            portList.add(any31port);
            portList.add(new Any4To1Port());
            portList.add(new Wheat2To1Port());
            portList.add(new Sheep2To1Port());

            assert.ok(portList.bestPortForResourceType(proto.ResourceType.TIMBER) === any31port);
            assert.ok(portList.bestPortForResourceType(proto.ResourceType.ORE) === any31port);
            assert.ok(portList.bestPortForResourceType(proto.ResourceType.BRICK) === any31port);
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