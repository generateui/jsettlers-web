import { jsettlers as pb } from "../src/generated/data"
import * as assert from 'assert';
import { ResourceList } from "../src/resource";
import { Parser } from '../src/parser';
import { ErrorListener } from 'antlr4/error';
import { Script } from './script/script';

describe("Script", () => {
    it("parses the cheatsheet", () => {
        var errorListener = new ErrorListener();
        errorListener.syntaxError = function(recognizer, offendingSymbol, line, column, msg, e) {
            console.log(`line: ${line}, column: ${column}`);
            hasError = true;
        }
        var parser = Parser.parseFile("test/script/cheatSheet", errorListener);
        let hasError = false;

        let script = parser.script();
        
        assert.ok(hasError === false);
    });
    it("parses a resourceSet [🌲🌾🐑⛰⚌]", () => {
        var parser = Parser.parseString("[🌲🌾🐑⛰⚌]");
        var resourceListExpression = parser.resourceSet();
        var resourceList = ResourceList.parse(resourceListExpression);
        assert.ok(resourceList.of(pb.ResourceType.Timber).length === 1);
        assert.ok(resourceList.of(pb.ResourceType.Wheat).length === 1);
        assert.ok(resourceList.of(pb.ResourceType.Ore).length === 1);
        assert.ok(resourceList.of(pb.ResourceType.Sheep).length === 1);
        assert.ok(resourceList.of(pb.ResourceType.Brick).length === 1);
    });
    // it("parses a script", () => {
    //     var script = new Script();
    //     script.parse();
    //     console.log(script.actionsOrChecks.length);
    //     // assert.ok(script.actionsOrChecks.length === 19);
    //     // assert.equal(16, script.actionsOrChecks.length);
    //     script.start();
    //     while (script.hasStepsLeft) {
    //         script.executeStep();
    //     }
    // });
});