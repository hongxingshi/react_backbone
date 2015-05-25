//= require ../app/home_app
//= require ../lib/backbone

$(function () {
  define('main', function (require) {
    var Backbone = require('lib/backbone');
    var homeApp = require('app/HomeApp');
    new homeApp;
    
    Backbone.history.start({
      pushState: true,
    });
  });
});
