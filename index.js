// See https://github.com/vuejs/vue/issues/6614
JSON.stringifyNative = JSON.stringify;
JSON.parseNative = JSON.parse;

function encode(data, replacer, list, seen) {
  var stored, key, value, i, l
  var seenIndex = seen.get(data)
  if (seenIndex != null) {
    return seenIndex
  }
  var index = list.length
  var proto = Object.prototype.toString.call(data)
  if (proto === '[object Object]') {
    stored = {}
    seen.set(data, index)
    list.push(stored)
    var keys = Object.keys(data)
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i]
      value = data[key]
      if (replacer) value = replacer.call(data, key, value)
      stored[key] = encode(value, replacer, list, seen)
    }
  } else if (proto === '[object Array]') {
    stored = []
    seen.set(data, index)
    list.push(stored)
    for (i = 0, l = data.length; i < l; i++) {
      value = data[i]
      if (replacer) value = replacer.call(data, i, value)
      stored[i] = encode(value, replacer, list, seen)
    }
  } else {
    list.push(data)
  }
  return index
}

function decode(list, reviver) {
  var i = list.length
  var j, k, data, key, value, proto
  while (i--) {
    data = list[i]
    proto = Object.prototype.toString.call(data)
    if (proto === '[object Object]') {
      var keys = Object.keys(data)
      for (j = 0, k = keys.length; j < k; j++) {
        key = keys[j]
        value = list[data[key]]
        if (reviver) value = reviver.call(data, key, value)
        data[key] = value
      }
    } else if (proto === '[object Array]') {
      for (j = 0, k = data.length; j < k; j++) {
        value = list[data[j]]
        if (reviver) value = reviver.call(data, j, value)
        data[j] = value
      }
    }
  }
}
const stringifyStrict = function(data, replacer, space) {
  var list = []
  encode(data, replacer, list, new Map())
  if (space) {
    try {
      return ' ' + JSON.stringifyNative(list, null, space);
    } catch (e) { }
  } else {
    try {
      ' ' + JSON.stringifyNative(list);
    } catch (e) { }
  }
}

JSON.stringify = function(data, replacer, space) {
  try {
    return arguments.length === 1
      ? JSON.stringifyNative(data)
      : JSON.stringifyNative(data, replacer, space)
  } catch (e) {
    return stringifyStrict(data, replacer, space)
  }
}

JSON.parse = function (data, reviver) {
  var hasCircular = /^\s/.test(data)
  if (!hasCircular) {
    return arguments.length === 1
      ? JSON.parseNative(data)
      : JSON.parseNative(data, reviver)
  } else {
    var list = JSON.parseNative(data)
    decode(list, reviver)
    return list[0]
  }
}

var css = require('./index.css');

require("./src/generic/shims");
require("./src/generic/math.js");

require("./von-grid/OrbitControls.js");
require("./von-grid/MouseCaster.js");
require("./von-grid/Signal.js");
require("./von-grid/STLLoader.js");

import { jsettlers as pb } from "./src/generated/data";
import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import PlayTestGame from './components/PlayTestGame.vue';
import TechDemo from './components/techdemo/TechDemo.vue';
import Welcome from './components/Welcome.vue';
import Game from './components/Game.vue';
import GameSettings from './components/GameSettings.vue';
import Attribution from './components/doc/Attribution.vue';
import VueMarkdown from 'vue-markdown';
import {TradeBank} from "./src/actions/tradeBank.js";
import {RollDice} from "./src/actions/rollDice.js";
import {BuildTown} from "./src/actions/buildTown.js";
import {BuildRoad} from "./src/actions/buildRoad.js";
import {BuildCity} from "./src/actions/buildCity.js";
import {RejectOffer} from "./src/actions/rejectOffer.js";
import {AcceptOffer} from "./src/actions/acceptOffer.js";
import {CounterOffer} from "./src/actions/counterOffer.js";
import {OfferTrade} from "./src/actions/offerTrade";
import {TradePlayer} from "./src/actions/tradePlayer";
import {LooseResources} from "./src/actions/looseResources";
import {RobPlayer} from "./src/actions/robPlayer";
import {MoveRobber} from "./src/actions/moveRobber";
import {EndTurn} from "./src/actions/endTurn";
import {ClaimVictory} from "./src/actions/claimVictory";
import {BuyDevelopmentCard} from "./src/actions/buyDevelopmentCard";
import {PlayDevelopmentCard} from "./src/actions/playDevelopmentCard";
import {InitialPlacement, Finished, PlayTurns} from "./src/gamePhase";
import {Soldier, VictoryPoint, RoadBuilding, YearOfPlenty, Monopoly} from "./src/developmentCard";

const routes = [
  { path: "/", component: Welcome },
  { path: "/welcome", component: Welcome },
  { path: "/tech-demo", component: TechDemo },
  { path: "/attribution", component: Attribution },
  { path: "/play-test-game", component: PlayTestGame,
    children: [
      { path: "", component: GameSettings },
      { path: "game", name: "game", component: Game, props: true },
    ]
  },
];
const router = new VueRouter({
  routes
});
Vue.use(VueMarkdown);
Vue.use(VueRouter);
Vue.prototype.pb = pb;
Vue.prototype.BuildTown = BuildTown;
Vue.prototype.BuildRoad = BuildRoad;
Vue.prototype.BuildCity = BuildCity;
Vue.prototype.RejectOffer = RejectOffer;
Vue.prototype.AcceptOffer = AcceptOffer;
Vue.prototype.CounterOffer = CounterOffer;
Vue.prototype.OfferTrade = OfferTrade;
Vue.prototype.TradePlayer = TradePlayer;
Vue.prototype.LooseResources = LooseResources;
Vue.prototype.RobPlayer = RobPlayer;
Vue.prototype.MoveRobber = MoveRobber;
Vue.prototype.InitialPlacement = InitialPlacement;
Vue.prototype.Finished = Finished;
Vue.prototype.PlayTurns = PlayTurns;
Vue.prototype.Soldier = Soldier;
Vue.prototype.VictoryPoint = VictoryPoint;
Vue.prototype.RoadBuilding = RoadBuilding;
Vue.prototype.YearOfPlenty = YearOfPlenty;
Vue.prototype.Monopoly = Monopoly;
Vue.prototype.PlayDevelopmentCard = PlayDevelopmentCard;
Vue.prototype.BuyDevelopmentCard = BuyDevelopmentCard;
Vue.prototype.RollDice = RollDice;
Vue.prototype.TradeBank = TradeBank;
Vue.prototype.EndTurn = EndTurn;
Vue.prototype.ClaimVictory = ClaimVictory;


new Vue({ // eslint-disable-line no-new
  router,
  render: (h) => h(App)
}).$mount("#app");