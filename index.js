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

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: (h) => h(App)
});