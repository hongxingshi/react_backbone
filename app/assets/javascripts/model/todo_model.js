//= require ../lib/backbone

define('model/TodoModel', function (require) {
  var Backbone = require('lib/backbone');
  // Our basic **Todo** model has `title`, `order`, and `done` attributes.
  var Todo = Backbone.Model.extend({
    urlRoot: '/todos',
    // Default attributes for the todo item.
    defaults: function() {
      return {
        title: "empty todo...",
        //order: Todos.nextOrder(),
        done: false
      };
    },
    // Toggle the `done` state of this todo item.
    toggle: function() {
      this.save({done: !this.get("done")});
    }
  });
  
  return Todo;
});
