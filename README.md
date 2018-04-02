# jsettlers-web

Build settlements, roads & cities on a hexagonal grid. Renders a 3D board of all
the items using three.js. Most of the UI is implemented using vue.js. A complete
and custom language is defined using antlr4, which is used for integration- and
cucumber-style test scripts.

## Demo
https://generateui.github.io/jsettlers-web/

## Features

 - 3D render engine
 - complete base game
 - easy to use client
 - full extensible API (add new Resources, Ports, Hexes, Rules, Options, DevelopmentCards, UI behaviors, Renderers, ...)
 - unit tests
 - integration test scripts using a dsl (which supports unicode emoji)
 - complete base theme (images, icons, UI elements)
 - 1D, 2D and 3D hexagonal coordinate systems and conversion between them
 - standardized protocol using Protobuf
 - separated layers (UI ⤑ model ⤑ data) (⤑ meams "depends on")
 - bots (although very, very basic)
 - written in ES7, uses ES6 modules where possible
 - seems to work on Edge, Chrome & Firefox

## Dependencies

**Bold** are runtime dependencies, otherwise it is a development dependency.

 - **Vue.js** to render the main UI and most
 - **Vue-router** for URI routing
 - **Three.js** to render a 3D board with pieces
 - **Popper.js** to provide rich tooltips
 - Antlr4 to define a dsl for integration testing
 - mocha.js for unit tests
 - browserify for fast & easy development
 - babel.js to transpile to ES5 code
 - Java as transitive dependency for antlr4
 - **protobuf.js** to generate javascript source from `.proto`

## Build

1. clone repo
2. ensure node is installed
3. `npm install`
4. `npm run dev` to run browserify with an integrated dev-webserver locally. Initial build of `./dist/build.js` may take a while.
5. you should now see a jsettlers-web web page served in your fav browser at `http://localhost:8080`

Note: `npm run dev` generates protobuf and antlr4 sources. I have tested this on a Windows machine only, let me know if it fails on other OSes.

## Test

Run `npm run test`. This will run the unit tests. To run the integration test scripts, run `npm run script`.