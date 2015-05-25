//= require ../lib/underscore
//= require ../lib/jquery
//= require ../lib/backbone
//= require ../lib/react
//= require ../component/todo_item_component

define('view/TodoView', function (require) {
  var Backbone = require('lib/backbone');
  var _ = require('lib/underscore');
  var $ = require('lib/jquery');
  var React = require('lib/react');
  
  var TodoView = Backbone.View.extend({
    events: {
      "click a.destroy" : "clear",
    },
    tagName: 'li',
    initialize: function () {
      this.listenTo(this.model, 'destroy', this.remove);
      React.render(
        React.createElement(TodoItemComponent, {model: this.model}),
        this.el);
    },
    clear: function () {
      React.unmountComponentAtNode(this.el);
      this.model.destroy();
    }
  });
  
  return TodoView;
});
