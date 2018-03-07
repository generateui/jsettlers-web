// require('babel-register')();
var assert = require('assert');
import {Queue} from "../src/queue.js";
import {Player} from "../src/player.js";
import {BuildTown} from "../src/actions/buildTown.js";
import {BuildRoad} from "../src/actions/buildRoad.js";
import {BuildCity} from "../src/actions/buildCity.js";

const player1 = new Player();
const player2 = new Player();

const buildRoadP1 = new BuildRoad();
buildRoadP1.player = player1;

const buildRoadP2 = new BuildRoad();
buildRoadP2.player = player2;

const buildTownP1 = new BuildTown();
buildTownP1.player = player1;

const buildTownP2 = new BuildTown();
buildTownP2.player = player2;

const buildCityP1 = new BuildCity();
buildCityP1.player = player1;


describe("Queue", () => {
    describe("canBePlayed", () => {
        it("syntax", () => {
            console.log("syntax:")
            console.log("\t{}: empty queue")
            console.log("\t{A}: action A must be played first")
            console.log("\t{A}: optional action A *may* be played first")
            console.log("\t{[A, B]}: action A and action B must be played first unordered")
            console.log("\t{[A, B] 🡒 C}: action A and action B must be played first unordered, then action C")
        });

        it("play any action with queue: {}", () => {
            var queue = new Queue();
            assert.ok(queue.canBePlayed(buildTownP1) === true);
            assert.ok(queue.canBePlayed(buildTownP2) === true);
            assert.ok(queue.canBePlayed(buildRoadP1) === true);
            assert.ok(queue.canBePlayed(buildRoadP2) === true);
        });
        
        it("can not play a different action with same player with queue: {A}", () => {
            var queue = new Queue();
            queue.consecutive(buildRoadP1);

            assert.ok(queue.canBePlayed(buildTownP1) === false);
        });
        it("can play the same action with same player with queue: {A}", () => {
            var queue = new Queue();
            queue.consecutive(buildRoadP1);

            assert.ok(queue.canBePlayed(buildRoadP1) === true);
        });
        it("can not play the same action with different player with queue: {A}", () => {
            var queue = new Queue();
            queue.consecutive(buildRoadP1);

            assert.ok(queue.canBePlayed(buildRoadP2) === false);
        });
        it("can play a different action with different player with queue: {A?}", () => {
            var queue = new Queue();
            queue.consecutive(buildRoadP1, true);

            assert.ok(queue.canBePlayed(buildTownP2) === true);
        });
        it("can play a different action with same player with queue: {A?}", () => {
            var queue = new Queue();
            queue.consecutive(buildRoadP1, true);

            assert.ok(queue.canBePlayed(buildTownP1) === true);
        });
        it("can play the same action with different player with queue: {A?}", () => {
            var queue = new Queue();
            queue.consecutive(buildRoadP1, true);

            assert.ok(queue.canBePlayed(buildRoadP1) === true);
        });
        it("can play queued action in unordered queue", () => {
            var queue = new Queue();
            queue.unordered([buildRoadP1, buildTownP1]);

            assert.ok(queue.canBePlayed(buildRoadP1) === true);
            assert.ok(queue.canBePlayed(buildTownP1) === true);
        });
        it("can not play different action of different player in queue [A, B]", () => {
            var queue = new Queue();
            queue.unordered([buildRoadP1, buildTownP1]);
            queue.consecutive(buildRoadP2);

            assert.ok(queue.canBePlayed(buildRoadP1) === true);
            assert.ok(queue.canBePlayed(buildTownP1) === true);
            assert.ok(queue.canBePlayed(buildTownP2) === false);
        });
        it("can not play different action of different player in queue: [A, B] 🡒 C ", () => {
            var queue = new Queue();
            queue.unordered([buildRoadP1, buildTownP1]);
            queue.consecutive(buildRoadP2);

            assert.ok(queue.canBePlayed(buildRoadP1) === true);
            assert.ok(queue.canBePlayed(buildTownP1) === true);
            assert.ok(queue.canBePlayed(buildTownP2) === false);
        });
        it("can play any action in queue: [A?, B?] 🡒 C? ", () => {
            var queue = new Queue();
            queue.unordered([buildRoadP1, buildTownP1], true);
            queue.consecutive(buildRoadP2, true);

            assert.ok(queue.canBePlayed(buildRoadP1) === true);
            assert.ok(queue.canBePlayed(buildTownP1) === true);
            assert.ok(queue.canBePlayed(buildTownP2) === true);
        });
    });
    describe("dequeue", () => {
        it("dequeues a matching action in queue: {A} ", () => {
            var queue = new Queue();
            queue.consecutive(buildRoadP1);
            queue.dequeue(buildRoadP1);

            assert.equal(queue.totalActions, 0);
        });
        it("dequeues a matching action in queue: {A?} ", () => {
            var queue = new Queue();
            queue.consecutive(buildRoadP1, true);
            queue.dequeue(buildRoadP1);

            assert.equal(queue.totalActions, 0);
        });
        it("dequeues a matching action in queue: {[A?, B?]} ", () => {
            var queue = new Queue();
            queue.unordered([buildRoadP1, buildRoadP2], true);
            queue.dequeue(buildRoadP2);

            assert.ok(queue.includes(buildRoadP1) === true);
            assert.equal(queue.totalActions, 1);
        });
        it("dequeues a matching action in queue: {[A?, B?] 🡒 C} ", () => {
            var queue = new Queue();
            queue.unordered([buildRoadP1, buildRoadP2], true);
            queue.consecutive(buildTownP1);
            queue.dequeue(buildTownP1);

            assert.ok(queue.includes(buildRoadP1) === false);
            assert.ok(queue.includes(buildRoadP2) === false);
            assert.ok(queue.includes(buildTownP1) === false);
            assert.equal(queue.totalActions, 0);
        });
        it("dequeues a matching action in queue: {[A?, B?] 🡒 C? 🡒 D} ", () => {
            var queue = new Queue();
            queue.unordered([buildRoadP1, buildRoadP2], true);
            queue.consecutive(buildTownP1, true);
            queue.consecutive(buildTownP2);

            queue.dequeue(buildTownP2);

            assert.ok(queue.includes(buildRoadP1) === false);
            assert.ok(queue.includes(buildRoadP2) === false);
            assert.ok(queue.includes(buildTownP1) === false);
            assert.ok(queue.includes(buildTownP2) === false);
            assert.equal(queue.totalActions, 0);
        });
        it("throws when no matching action found in queue: {A} ", () => {
            var queue = new Queue();
            queue.consecutive(buildRoadP1);
            assert.throws(queue.dequeue(buildTownP2));
        });
        it("throws when no matching action found in queue: {[A, B]} ", () => {
            var queue = new Queue();
            queue.consecutive([buildRoadP1, buildRoadP2]);
            assert.throws(queue.dequeue(buildTownP2));
        });
        it("throws when no matching action found in queue: {[A?, B?] 🡒 C? 🡒 D} ", () => {
            var queue = new Queue();
            queue.unordered([buildRoadP1, buildRoadP2], true);
            queue.consecutive(buildTownP1, true);
            queue.consecutive(buildTownP2);
            assert.throws(() => queue.dequeue(buildCityP1));
        });
    });
});