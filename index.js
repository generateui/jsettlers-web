String.prototype.hashCode = function() {
  var hash = 0, i, charCode;
  if (this.length === 0) {
      return 0;
  }
  for (i = 0; i < this.length; i++) {
    charCode = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + charCode;
    hash |= 0;
  }
  return hash;
};

var proto = require("./data_pb");

require("./src/generic/math.js");

require("./von-grid/OrbitControls.js");
require("./von-grid/MouseCaster.js");
require("./von-grid/Signal.js");
require("./von-grid/STLLoader.js");

import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import PlayTestGame from './components/PlayTestGame.vue';
import TechDemo from './components/TechDemo.vue';
import Welcome from './components/Welcome.vue';
import Game from './components/Game.vue';
import GameSettings from './components/GameSettings.vue';

const routes = [
  { path: "/", component: Welcome },
  { path: "/play-test-game", component: PlayTestGame,
    children: [
      { path: "", component: GameSettings },
      { path: "game", component: Game },
      { path: "welcome", component: Welcome },
    ]
  },
  { path: "/tech-demo", component: TechDemo },
];

const router = new VueRouter({
  routes
});
Vue.use(VueRouter);
new Vue({ // eslint-disable-line no-new
  router,
  render: (h) => h(App)
}).$mount("#app");