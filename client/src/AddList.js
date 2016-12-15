import React, { Component } from 'react';

class NewListForm extends Component {
  constructor() {
    super();

    this.state = {
      listName: '',
    }
  }

  handleInputChange(event) {
    const { value, name: attribute } = event.target;

    this.setState(prev => {
      return {
        ...prev,
        [attribute]: value,
      };
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { listName } = this.state;
    this.props.onAddList({ listName });

    this.setState({
      listName: '',
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        
        <input
          type="text"
          name="listName"
          placeholder="Enter list name"
          value={this.state.listName}
          onChange={this.handleInputChange.bind(this)}
        />
        &nbsp;
        <input
          type="submit"
          value="+ Add New List"
          disabled={!this.state.listName.trim()}
        />
      </form>
    );
  }
}

NewListForm.propTypes = {
  onAddList: React.PropTypes.func.isRequired
};

export default NewListForm;
