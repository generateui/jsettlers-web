require('babel-register')();
require("../data_pb.js")
var assert = require('assert');
import {ResourceList, Timber, Wheat} from "../src/resource";

describe("ResourceList", () => {
    it("adds a Resource instance", () => {
        var resourceList = new ResourceList();
        resourceList.add(new Wheat());

        assert.ok(resourceList.length === 1);
    });
    it("adds multiple Resource instances of same type", () => {
        var resourceList = new ResourceList();
        var w = new Wheat();
        resourceList.add(new Wheat());
        resourceList.add(w);

        assert.ok(resourceList.length === 2);
        assert.ok(resourceList.of(w.type).length === 2);
    });
    it("adds multiple Resource instances of multiple types", () => {
        var resourceList = new ResourceList();
        var w = new Wheat();
        resourceList.add(new Wheat());
        resourceList.add(w);
        var t = new Timber();
        resourceList.add(t);

        assert.ok(resourceList.length === 3);
        assert.ok(resourceList.of(w.type).length === 2);
        assert.ok(resourceList.of(t.type).length === 1);
    });
});