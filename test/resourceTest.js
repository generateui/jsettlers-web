require('babel-register')();
var proto = require("../data_pb.js")
var assert = require('assert');
import {ResourceList, Timber, Wheat, Ore} from "../src/resource";
import {Town} from "../src/town";
import {City} from "../src/city";
import {Road} from "../src/road";
import { Parser } from '../src/parser.js';

describe("ResourceList", () => {
    describe("add", () => {
        it("a Resource instance", () => {
            const resourceList = new ResourceList();
            resourceList.add(new Wheat());

            assert.ok(resourceList.length === 1);
        });
        it("multiple Resource instances of same type", () => {
            const resourceList = new ResourceList();
            const w = new Wheat();
            resourceList.add(new Wheat());
            resourceList.add(w);

            assert.ok(resourceList.length === 2);
            assert.ok(resourceList.of(w.type).length === 2);
        });
        it("multiple Resource instances of multiple types", () => {
            const resourceList = new ResourceList();
            const w = new Wheat();
            resourceList.add(new Wheat());
            resourceList.add(w);
            const t = new Timber();
            resourceList.add(t);

            assert.ok(resourceList.length === 3);
            assert.ok(resourceList.of(w.type).length === 2);
            assert.ok(resourceList.of(t.type).length === 1);
        });
        it("multiple Resource instances of multiple types using array", () => {
            const resourceList = new ResourceList();
            const array = [
                new Wheat(), new Wheat(), new Timber()
            ]
            resourceList.add(array);

            assert.ok(resourceList.length === 3);
            assert.ok(resourceList.of(proto.ResourceType.WHEAT).length === 2);
            assert.ok(resourceList.of(proto.ResourceType.TIMBER).length === 1);
        });
        it("a ResourceList", () => {
            const resourceList = new ResourceList();
            resourceList.add(Town.cost);

            assert.ok(resourceList.length === 4);
            assert.ok(resourceList.of(proto.ResourceType.WHEAT).length === 1);
            assert.ok(resourceList.of(proto.ResourceType.TIMBER).length === 1);
            assert.ok(resourceList.of(proto.ResourceType.BRICK).length === 1);
            assert.ok(resourceList.of(proto.ResourceType.SHEEP).length === 1);
        });
    });
    describe("remove", () => {
        it("a Resource instance", () => {
            const resourceList = new ResourceList();
            const wheat = new Wheat();
            resourceList.add(wheat);

            assert.ok(resourceList.length === 1);
            assert.ok(resourceList.of(wheat.type).length === 1);

            resourceList.remove(wheat);
            assert.ok(resourceList.length === 0);
            assert.ok(resourceList.of(wheat.type).length === 0);
        });
        it("a ResourceType", () => {
            const resourceList = new ResourceList();
            resourceList.add(proto.ResourceType.WHEAT);

            assert.ok(resourceList.length === 1);
            assert.ok(resourceList.of(proto.ResourceType.WHEAT).length === 1);

            resourceList.remove(proto.ResourceType.WHEAT);
            assert.ok(resourceList.length === 0);
            assert.ok(resourceList.of(proto.ResourceType.WHEAT).length === 0);
        });
        it("multiple Resource instances", () => {
            const resourceList = new ResourceList();
            const wheat = new Wheat();
            resourceList.add(wheat);
            resourceList.add(new Wheat());

            assert.ok(resourceList.length === 2);
            assert.ok(resourceList.of(wheat.type).length === 2);

            resourceList.remove(wheat);
            resourceList.remove(new Wheat());
            assert.ok(resourceList.length === 0);
            assert.ok(resourceList.of(wheat.type).length === 0);
        });
        it("multiple ResourceTypes", () => {
            const resourceList = new ResourceList();
            const wheat = new Wheat();
            resourceList.add(proto.ResourceType.WHEAT);
            resourceList.add(proto.ResourceType.WHEAT);

            assert.ok(resourceList.length === 2);
            assert.ok(resourceList.of(wheat.type).length === 2);

            resourceList.remove(proto.ResourceType.WHEAT);
            resourceList.remove(proto.ResourceType.WHEAT);
            assert.ok(resourceList.length === 0);
            assert.ok(resourceList.of(wheat.type).length === 0);
        });
        it("multiple Resource instances of multiple types", () => {
            const resourceList = new ResourceList();
            const wheat = new Wheat();
            resourceList.add(wheat);
            resourceList.add(new Wheat());
            resourceList.add(new Timber());

            assert.ok(resourceList.length === 3);
            assert.ok(resourceList.of(wheat.type).length === 2);
            assert.ok(resourceList.of(proto.ResourceType.TIMBER).length === 1);

            resourceList.remove(wheat);
            resourceList.remove(new Wheat());
            resourceList.remove(new Timber());
            assert.ok(resourceList.length === 0);
            assert.ok(resourceList.of(wheat.type).length === 0);
        });
        it("multiple Resource instances of multiple types", () => {
            const resourceList = new ResourceList();
            const wheat = new Wheat();
            resourceList.add(proto.ResourceType.WHEAT);
            resourceList.add(proto.ResourceType.WHEAT);
            resourceList.add(proto.ResourceType.TIMBER);

            assert.ok(resourceList.length === 3);
            assert.ok(resourceList.of(proto.ResourceType.WHEAT).length === 2);
            assert.ok(resourceList.of(proto.ResourceType.TIMBER).length === 1);

            resourceList.remove(proto.ResourceType.WHEAT);
            resourceList.remove(proto.ResourceType.WHEAT);
            resourceList.remove(proto.ResourceType.TIMBER);
            assert.ok(resourceList.length === 0);
            assert.ok(resourceList.of(wheat.type).length === 0);
        });
        it("multiple Resource instances using instance array", () => {
            const resourceList = new ResourceList();
            const array = [
                new Wheat(), new Wheat, new Timber()
            ];
            resourceList.add(array);

            assert.ok(resourceList.length === 3);
            assert.ok(resourceList.of(proto.ResourceType.WHEAT).length === 2);
            assert.ok(resourceList.of(proto.ResourceType.TIMBER).length === 1);

            resourceList.remove(array);
            assert.ok(resourceList.length === 0);
            assert.ok(resourceList.of(proto.ResourceType.WHEAT).length === 0);
            assert.ok(resourceList.of(proto.ResourceType.TIMBER).length === 0);
        });
        it("multiple Resource instances using ResourceType array", () => {
            const resourceList = new ResourceList();
            const array = [
                proto.ResourceType.WHEAT,
                proto.ResourceType.WHEAT,
                proto.ResourceType.TIMBER
            ];
            resourceList.add(array);

            assert.ok(resourceList.length === 3);
            assert.ok(resourceList.of(proto.ResourceType.WHEAT).length === 2);
            assert.ok(resourceList.of(proto.ResourceType.TIMBER).length === 1);

            resourceList.remove(array);

            assert.ok(resourceList.length === 0);
            assert.ok(resourceList.of(proto.ResourceType.WHEAT).length === 0);
            assert.ok(resourceList.of(proto.ResourceType.TIMBER).length === 0);
        });
    });
    describe("hasAtLeast", () => {
        it("the same has the same", () => {
            const resourceList1 = new ResourceList(Town.cost);
            const resourceList2 = new ResourceList(Town.cost);

            assert.ok(resourceList1.hasAtLeast(resourceList2));
            assert.ok(resourceList2.hasAtLeast(resourceList1));
        });
        it("more has at least less", () => {
            const less = new ResourceList(Town.cost);
            const more = new ResourceList(Town.cost);
            more.add(new Wheat());
            more.add(new Timber());
            more.add(new Ore());

            assert.ok(more.hasAtLeast(less));
        });
        it("less does not have at least more", () => {
            const less = new ResourceList(Town.cost);
            const more = new ResourceList(Town.cost);
            more.add(new Wheat());
            more.add(new Timber());
            more.add(new Ore());

            assert.ok(less.hasAtLeast(more) === false);
        });
    });
    describe("hasOf", () => {
        it("has types of Town cost", () => {
            const resourceList = new ResourceList(Town.cost);
            
            assert.ok(resourceList.hasOf(proto.ResourceType.WHEAT));
            assert.ok(resourceList.hasOf(proto.ResourceType.TIMBER));
            assert.ok(resourceList.hasOf(proto.ResourceType.BRICK));
            assert.ok(resourceList.hasOf(proto.ResourceType.SHEEP));
            assert.ok(resourceList.hasOf(proto.ResourceType.ORE) === false);
        });
        it("nothing when empty", () => {
            const resourceList = new ResourceList();
            assert.ok(resourceList.hasOf(proto.ResourceType.WHEAT) === false);
            assert.ok(resourceList.hasOf(proto.ResourceType.TIMBER) === false);
            assert.ok(resourceList.hasOf(proto.ResourceType.BRICK) === false);
            assert.ok(resourceList.hasOf(proto.ResourceType.SHEEP) === false);
            assert.ok(resourceList.hasOf(proto.ResourceType.ORE) === false);
        });
    });
    describe("addAmount", () => {
        it("19 ResourceTypes", () => {
            const resourceList = new ResourceList();
            resourceList.addAmount(proto.ResourceType.WHEAT, 19);

            assert.ok(resourceList.of(proto.ResourceType.WHEAT).length === 19);
            assert.ok(resourceList.length === 19);
        });
        it("26 Resources", () => {
            const resourceList = new ResourceList();
            resourceList.addAmount(new Ore(), 26);

            assert.ok(resourceList.of(proto.ResourceType.ORE).length === 26);
            assert.ok(resourceList.length === 26);
        });
    });
    describe("amountTypes", () => {
        it("2 of City cost", () => {
            const resourceList = new ResourceList(City.cost);

            assert.ok(resourceList.amountTypes === 2);
        });
        it("4 of Town cost", () => {
            const resourceList = new ResourceList(Town.cost);

            assert.ok(resourceList.amountTypes === 4);
        });
    });
    describe("halfCount", () => {
        it("even length is exactly half", () => {
            const resourceList = new ResourceList(Town.cost);

            assert.ok(resourceList.halfCount === 2);
        });
        it("uneven length is half rounded down", () => {
            const resourceList = new ResourceList(Town.cost);
            resourceList.add(new Ore());

            assert.ok(resourceList.halfCount === 2);
        });
    });
    describe("toArray", () => {
        it("Town cost yields Town cost Resources", () => {
            const resourceList = new ResourceList(Town.cost);
            const array = resourceList.toArray();
            
            assert.ok(array.find(r => r.type === proto.ResourceType.WHEAT) !== null);
            assert.ok(array.find(r => r.type === proto.ResourceType.TIMBER) !== null);
            assert.ok(array.find(r => r.type === proto.ResourceType.BRICK) !== null);
            assert.ok(array.find(r => r.type === proto.ResourceType.SHEEP) !== null);
            assert.ok(array.length === 4);
        });
        it("empty when empty ResourceList", () => {
            const empty = ResourceList.empty;
            const array = empty.toArray();
            
            assert.ok(array.length === 0);
        });
    });
    describe("toResourceTypeArray", () => {
        it("Town cost yields Town cost ResourceTypes", () => {
            const resourceList = new ResourceList(Town.cost);
            const array = resourceList.toResourceTypeArray();
            
            assert.ok(array.find(rt => rt === proto.ResourceType.WHEAT) !== null);
            assert.ok(array.find(rt => rt === proto.ResourceType.TIMBER) !== null);
            assert.ok(array.find(rt => rt === proto.ResourceType.BRICK) !== null);
            assert.ok(array.find(rt => rt === proto.ResourceType.SHEEP) !== null);
            assert.ok(array.length === 4);
        });
        it("twice the Town cost yields twice Town cost", () => {
            const resourceList = new ResourceList([Town.cost, Town.cost]);
            const array = resourceList.toResourceTypeArray();
            
            assert.ok(array.filter(rt => rt === proto.ResourceType.WHEAT).length === 2);
            assert.ok(array.filter(rt => rt === proto.ResourceType.TIMBER).length === 2);
            assert.ok(array.filter(rt => rt === proto.ResourceType.BRICK).length === 2);
            assert.ok(array.filter(rt => rt === proto.ResourceType.SHEEP).length === 2);
            assert.ok(array.length === 8);
        });
    });
    describe("moveFrom", () => {
        it("moves only City cost from twice City cost", () => {
            const resourceList = new ResourceList([City.cost, City.cost]);
            const to = new ResourceList();
            to.moveFrom(resourceList, City.cost);

            assert.ok(resourceList.hasAtLeast(City.cost));
            assert.ok(to.hasAtLeast(City.cost));
            assert.ok(resourceList.length === 5);
            assert.ok(to.length === 5);
        });
    });
    describe("amountGoldNeeded", () => {
        it("wheat & timber needs 2 gold for Town cost", () => {
            const resourceList = new ResourceList([new Wheat(), new Timber()]);
            assert.ok(resourceList.amountGoldNeeded(Town.cost) === 2);
        });
        it("timber needs 1 gold for Road cost", () => {
            const resourceList = new ResourceList(new Timber());
            assert.ok(resourceList.amountGoldNeeded(Road.cost) === 1);
        });
        it("empty needs 5 gold for City cost", () => {
            const resourceList = ResourceList.empty;
            assert.ok(resourceList.amountGoldNeeded(City.cost) === 5);
        });
    });
    describe("parse", () => {
        it("parses a resourceSet [🌲🌾🐑⛰⚌]", () => {
            var parser = Parser.parseString("[🌲🌾🐑⛰⚌]");
            var resourceListExpression = parser.resourceSet();
            var resourceList = ResourceList.parse(resourceListExpression);
            assert.ok(resourceList.of(proto.ResourceType.TIMBER).length === 1);
            assert.ok(resourceList.of(proto.ResourceType.WHEAT).length === 1);
            assert.ok(resourceList.of(proto.ResourceType.ORE).length === 1);
            assert.ok(resourceList.of(proto.ResourceType.SHEEP).length === 1);
            assert.ok(resourceList.of(proto.ResourceType.BRICK).length === 1);
        });
    });
});