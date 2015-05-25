var TodoFooterComponent = React.createClass({
  render: function () {
    return (
      <div>
        <a id="clear-completed">Clear {this.props.completedCount} completed item</a>
        <div class="todo-count"><b>{this.props.todoCount}</b> items left</div>
      </div>
    );
  }
});
