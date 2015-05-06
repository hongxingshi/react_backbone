//= require ../lib/underscore
//= require ../lib/jquery
//= require ../lib/backbone

define('view/TodoView', function (require) {
  var Backbone = require('lib/backbone');
  var _ = require('lib/underscore');
  var $ = require('lib/jquery');
  
  var TodoView = Backbone.View.extend({
    //... is a list tag.
    tagName:  "li",
    // Cache the template function for a single item.
    template: _.template($('#item-template').html()),
    // The DOM events specific to an item.
    events: {
      "click .toggle"   : "toggleDone",
      "dblclick .view"  : "edit",
      "click a.destroy" : "clear",
      "keypress .edit"  : "updateOnEnter",
      "blur .edit"      : "close"
    },
    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },
    // Re-render the titles of the todo item.
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.toggleClass('done', this.model.get('done'));
      this.input = this.$('.edit');
      return this;
    },
    // Toggle the `"done"` state of the model.
    toggleDone: function() {
      this.model.toggle();
    },
    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
      this.$el.addClass("editing");
      this.input.focus();
    },

    // Close the `"editing"` mode, saving changes to the todo.
    close: function() {
      var value = this.input.val();
      if (!value) {
        this.clear();
      } else {
        this.model.save({title: value});
        this.$el.removeClass("editing");
      }
    },
    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },
    // Remove the item, destroy the model.
    clear: function() {
      this.model.destroy();
    }
  });
  
  return TodoView;
});
