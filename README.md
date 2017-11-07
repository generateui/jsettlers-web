# carcattonne

Build settlements, roads & cities on a hexagonal grid

## Demo
https://generateui.github.io/carcattonne/

## Dependencies

```
npm install browserify
brew install protobuf
```

## Build

Carcatonne depends on npm, browserify & protobuf. To build locally:

1. clone repo with submodules on (von-grid is currently a submodule)
2. Ensure node is installed
3. Ensure protobuf compiler is installed
4. `npm install`
5. `GenerateProtobuf.bat` should generate data_pb.js
6. `GenerateBundle.bat` should generate bundle.js

This should have you setup. To run the app, run `index.html`.
