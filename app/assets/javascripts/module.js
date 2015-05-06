// define the module interface
(function (window, undefined) {
  if (window.define) {
    return;
  }
  function isFunction(obj) {
    return Object.prototype.toString.call(obj) === "[object Function]";
  }

  var MM = {};
  var initModuleName = "main";

  function require(name) {
    if (!MM[name]) {
      throw new Error("Module " + name + " is not defined.");
    }
    var module = MM[name];
    if (module.inited === false) {
      runModule(name);
    }
    return module.ret;
  }

  function runModule(name) {
      var exports = {};
      var module = MM[name];
      if (isFunction(MM[name].factory)) {
          var ret = MM[name].factory.apply(undefined, [require, exports, undefined]);
          module.ret = ret === undefined ? exports : ret;
     } else {
          module.ret = MM[name].factory;
      }
      module.inited = true;
  }

  function define(name, deps, factory) {
    if (MM[name]) {
      throw new Error("Module " + name + " has been defined already.");
    }
    if (isFunction(deps)) {
        factory = deps;
    }

    MM[name] = {factory:factory, inited:false};
    if (name === initModuleName) {
        runModule(name);
    }
  }

  window.define = define;
})(window);
