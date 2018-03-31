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


## Development dependencies

Generated code is not stored in the repository, so you need to generate it 
before you run a build.

### Java
Java is used for antlr4, but only if you want to build locally. Java is not used
in the application runtime. Antlr 4.7.1 is required (for unicode support).

### Protoc
Protocol buffers are used for communciation betwene client & server. Ensure 
protoc is installed.


## Build

jsettlers-web depends on npm, browserify & protobuf. To build locally:

1. clone repo
2. ensure node is installed
3. ensure protobuf compiler `protoc` is installed
4. ensure antlr 4.7.1 is installed
4. `npm install`
5. `GenerateProtobuf.bat` should generate data_pb
6. `GenerateBundle.bat` should generate bundle.js

This should have you setup. To run the app, run `index.html`.
