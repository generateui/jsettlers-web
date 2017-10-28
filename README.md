# carcattonne

Build settlements, roads & cities on a hexagonal grid

## Build

Carcatonne depends on npm, browserify & protobuf. To build locally:

1. Ensure node is installed
2. Ensure protobuf compiler is installed
3. `npm install`
4. `GenerateProtobuf.bat` should generate data_pb.js
5. `GenerateBundle.bat` should generate bundle.js

This should have you setup. To run the app, run `index.html`. You should see the following:

![screenie](https://github.com/geluso/carcattonne/blob/master/doc/images/app-screenshot.png?raw=true "Screenshot")
