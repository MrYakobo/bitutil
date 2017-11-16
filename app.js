(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("App.vue", function(exports, require, module) {
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert("#app {\n  font-family: 'Avenir', Helvetica, Arial, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-align: center;\n  color: #2c3e50;\n  margin-top: 60px;\n}")
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'app'
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('router-view')],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2e015f16", __vue__options__)
  } else {
    hotAPI.reload("data-v-2e015f16", __vue__options__)
  }
})()}
});

;require.register("components/Hello.vue", function(exports, require, module) {
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert("h1.title.is-1{\n  font-family: 'Lato';\n  font-weight: 300;\n  font-size: 4rem\n\n}\nbutton{\n  font-family: 'Source Code Pro' !important\n}\n.mono {\n  font-family: 'Source Code Pro';\n  width: 200px;\n  margin: auto;\n  font-size: 1.5em\n}")
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var ZEROS = new Array(32).fill(0);

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

exports.default = {
  name: 'hello',
  data: function data() {
    return {
      val: ZEROS,
      hex: ''
    };
  },

  computed: {
    disp: function disp() {
      var int = parseInt(this.val.slice().reverse().join(''), 2);
      return {
        hex: int.toString(16).toUpperCase(),
        dec: int.toString(10)
      };
    }
  },
  watch: {
    hex: function hex() {
      if (this.hex != '') {
        var arr = pad(parseInt(this.hex, 16).toString(2), 32).split('').map(function (b) {
          return parseInt(b);
        }).reverse();

        this.val = arr;
      } else {
        this.val = ZEROS;
      }
    }
  },
  methods: {
    revrange: function revrange(min, max) {
      var a = [];
      for (var i = max - 1; i >= min; i--) {
        a.push(i);
      }
      return a;
    },
    toggleBit: function toggleBit(i) {
      this.val.splice(i, 1, 1 - this.val[i]);
    },
    getBit: function getBit(i) {
      return this.val[i];
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"hero  has-text-centered"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"hero-body"},[_c('div',{staticClass:"box buttons is-centered has-addons"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.hex),expression:"hex"}],staticClass:"input mono has-text-centered",attrs:{"type":"text","placeholder":"hex","maxlength":"8"},domProps:{"value":(_vm.hex)},on:{"input":function($event){if($event.target.composing){ return; }_vm.hex=$event.target.value}}}),_vm._v(" "),_vm._l((_vm.revrange(0,32)),function(i,c){return _c('div',[(c%8==0)?[_vm._v("\n         \n      ")]:_vm._e(),_vm._v(" "),_c('button',{class:['button ', _vm.getBit(i)==0?'is-light':'is-dark'],on:{"click":function($event){_vm.toggleBit(i)}}},[_vm._v(_vm._s(_vm.getBit(i)))]),_vm._v(" "),_c('div',{staticClass:"label"},[_vm._v(_vm._s(i))])],2)})],2)]),_vm._v(" "),_c('div',{staticClass:"hero-foot"},[_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column card"},[_c('p',{staticClass:"subtitle is-2"},[_vm._v("Hex")]),_vm._v(" "),_c('span',{staticClass:"mono"},[_vm._v(_vm._s(_vm.disp.hex))])]),_vm._v(" "),_c('div',{staticClass:"column card"},[_c('p',{staticClass:"subtitle is-2"},[_vm._v("Dec")]),_vm._v(" "),_c('span',{staticClass:"mono"},[_vm._v(_vm._s(_vm.disp.dec))])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"hero-head"},[_c('h1',{staticClass:"title is-1"},[_vm._v("Bitutil")])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8334f096", __vue__options__)
  } else {
    hotAPI.rerender("data-v-8334f096", __vue__options__)
  }
})()}
});

;require.register("main.js", function(exports, require, module) {
'use strict';

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

require('vueify/lib/insert-css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// required for .vue file <style> tags

_vue2.default.config.productionTip = false;

/* eslint-disable no-new */
new _vue2.default({
    el: '#app',
    router: _router2.default,
    render: function render(h) {
        return h(_App2.default);
    }
});

});

require.register("router/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _Hello = require('../components/Hello');

var _Hello2 = _interopRequireDefault(_Hello);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);

exports.default = new _vueRouter2.default({
  routes: [{
    path: '/',
    name: 'Hello',
    component: _Hello2.default
  }]
});

});

require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map