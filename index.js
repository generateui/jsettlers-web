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
import Attribution from './components/doc/Attribution.vue';
import VueMarkdown from 'vue-markdown';

const routes = [
  { path: "/", component: Welcome },
  { path: "welcome", component: Welcome },
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
new Vue({ // eslint-disable-line no-new
  router,
  render: (h) => h(App)
}).$mount("#app");