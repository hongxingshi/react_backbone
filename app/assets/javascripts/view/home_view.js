//= require ../lib/jquery
//= require ../lib/underscore
//= require ../lib/backbone
//= require ../lib/react
//= require ../model/todo_collection
//= require ../view/todo_view
//= require ../component/todo_footer_component

define('view/HomeView', function (require) {
  var Backbone = require('lib/backbone');
  var _ = require('lib/underscore');
  var $ = require('lib/jquery');
  var React = require('lib/react');
  
  var HomeView = Backbone.View.extend({
    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: "#todoapp",
    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "keypress #new-todo":  "createOnEnter",
      "click #clear-completed": "clearCompleted",
      "click #toggle-all": "toggleAllComplete"
    },
    // At initialization we bind to the relevant events on the `this.todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos.
    initialize: function() {
      var TodoCollection = require('model/TodoCollection');  
      this.input = this.$("#new-todo");
      this.allCheckbox = this.$("#toggle-all")[0];
      this.todos = new TodoCollection;

      this.listenTo(this.todos, 'add', this.addOne);
      this.listenTo(this.todos, 'reset', this.addAll);
      this.listenTo(this.todos, 'all', this.render);

      this.footer = this.$('footer');
      this.main = $('#main');

      this.todos.fetch();
    },
    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      var done = this.todos.done().length;
      var remaining = this.todos.remaining().length;

      if (this.todos.length) {
        this.main.show();
        this.footer.show();
        React.render(
          React.createElement(TodoFooterComponent, {completedCount: done, todoCount: remaining}), 
          $('footer').get(0)
        );

      } else {
        this.main.hide();
        this.footer.hide();
      }

      this.allCheckbox.checked = !remaining;
    },
    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(todo) {
      var TodoView = require('view/TodoView');
      var view = new TodoView({model: todo});
      this.$("#todo-list").append(view.render().el);
    },
    // Add all items in the **this.todos** collection at once.
    addAll: function() {
      this.todos.each(this.addOne, this);
    },
    // If you hit return in the main input field, create new **Todo** model
    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      if (!this.input.val()) return;

      this.todos.create({title: this.input.val()});
      this.input.val('');
    },
    // Clear all done todo items, destroying their models.
    clearCompleted: function() {
      _.invoke(this.todos.done(), 'destroy');
      return false;
    },
    toggleAllComplete: function () {
      var done = this.allCheckbox.checked;
      this.todos.each(function (todo) { todo.save({'done': done}); });
    }

  });
  
  return HomeView;
});