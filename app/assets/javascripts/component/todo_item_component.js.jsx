var TodoItemComponent = React.createClass({
  getInitialState: function () {
    return {editing: false};
  },
  componentWillMount: function () {
    this.props.model.on('change', this.forceUpdate.bind(this, null));
  },
  componentDidUpdate: function () {
    if (this.state.editing) {
      React.findDOMNode(this.refs.editInput).focus();
    }
  },
  handleToggleDone: function () {
    this.props.model.toggle();
  },
  handleOpenEditing: function () {
    this.setState({editing: true});
  },
  handleCloseEditing: function () {
    this.props.model.save({patch: true});
    this.setState({editing: false});
  },
  handleChangeTitle: function (event) {
    this.props.model.set({title: event.target.value});
  },
  handleKeyPress: function (event) {
    if (event.keyCode == 13 || event.key == 'Enter') this.handleCloseEditing();
  },
  render: function () {
    var classAttrs = ['view'];
    if (this.props.model.get('done')) classAttrs.push('done');

    if (this.state.editing) {
      classAttrs.push('editing');
      return (
        <div className={classAttrs.join(' ')}>
          <input className='edit' type='text' value={this.props.model.get('title')} onBlur={this.handleCloseEditing} onChange={this.handleChangeTitle} onKeyPress={this.handleKeyPress} ref='editInput' />
        </div>
      );
    }
    else {
      return (<div className={classAttrs.join(' ')}>
        <input className="toggle" type="checkbox" checked={this.props.model.get('done')} onChange={this.handleToggleDone}/>
        <label onDoubleClick={this.handleOpenEditing}>{this.props.model.get('title')}</label>
        <a className="destroy"></a>
      </div>
      );
    }
  }
});
