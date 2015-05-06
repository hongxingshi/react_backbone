//= require ../lib/backbone
//= require ./todo_model

define('model/TodoCollection', function (require) {
  var Backbone = require('lib/backbone');
  
  var TodoCollection = Backbone.Collection.extend({
    // Reference to this collection's model.
    model: require('model/TodoModel'),
    // Save all of the todo items under the `"todos-backbone"` namespace.
    localStorage: new Backbone.LocalStorage("todos-backbone"),
    // Filter down the list of all todo items that are finished.
    done: function() {
      return this.where({done: true});
    },
    // Filter down the list to only todo items that are still not finished.
    remaining: function() {
      return this.where({done: false});
    },
    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },
    // Todos are sorted by their original insertion order.
    comparator: 'order'
  });
  
  return TodoCollection;
});
