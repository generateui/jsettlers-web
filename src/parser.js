import { ErrorListener } from "antlr4/error/ErrorListener";
import "../src/generic/shims";
import { fs } from 'fs';
import { CharStreams } from 'antlr4/index';
import { InputStream } from "antlr4/InputStream";
import { CommonTokenStream } from "antlr4/CommonTokenStream";
import { jsettlersLexer } from "../src/generated/jsettlersLexer";
import { jsettlersListener } from "../src/generated/jsettlersListener";
import { jsettlersParser } from "../src/generated/jsettlersParser";

export class Parser {
    constructor() {}

    static parseString(text) {
        var lexer = null;
        var stream = new InputStream(text, "utf8");
        lexer = new jsettlersLexer(stream);
        var tokens  = new CommonTokenStream(lexer);
        var parser = new jsettlersParser(tokens);
        return parser;
    }
    static parseFileXhr(fileName) {
        fileName = fileName.endsWith(".jsettlers") ? fileName : `${fileName}.jsettlers`;
        var request = new XMLHttpRequest();
        request.open('GET', `test/script/${fileName}`, false);  // `false` makes the request synchronous
        request.send(null);
        var text = request.responseText;
        var stream = CharStreams.fromString(text);
        var lexer = new jsettlersLexer(stream);
        var tokens  = new CommonTokenStream(lexer);
        var parser = new jsettlersParser(tokens);
        return parser;
    }
    static parseFile(fileName, listener) {
        fileName = fileName.endsWith(".jsettlers") ? fileName : `${fileName}.jsettlers`;
        var stream = CharStreams.fromPathSync(fileName, "utf8");
        var lexer = new jsettlersLexer(stream);
        if (listener !== undefined) {
            lexer.addErrorListener(listener);
        }
        var tokens  = new CommonTokenStream(lexer);
        var parser = new jsettlersParser(tokens);
        if (listener !== undefined) {
            parser.addErrorListener(listener);
        }
        return parser;
    }
}