//= require ../lib/backbone
//= require ../view/home_view

define('app/HomeApp', function (require) {
  var Backbone = require('lib/backbone');
  
  var HomeApp = Backbone.Router.extend({
    routes: {
      "": "homeRoot",
    },
    homeRoot: function () {
      var HomeView = require('view/HomeView');
      new HomeView;
    }
  });
  
  return HomeApp;
});
