//= require ../lib/backbone
//= require ./todo_model

define('model/TodoCollection', function (require) {
  var Backbone = require('lib/backbone');
  
  var TodoCollection = Backbone.Collection.extend({
    url: '/todos',
    // Reference to this collection's model.
    model: require('model/TodoModel'),
    comparator: 'id',
    // Filter down the list of all todo items that are finished.
    done: function() {
      return this.where({done: true});
    },
    // Filter down the list to only todo items that are still not finished.
    remaining: function() {
      return this.where({done: false});
    },
  });
  
  return TodoCollection;
});
