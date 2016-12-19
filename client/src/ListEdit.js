import React, { Component } from 'react';

class ListEdit extends Component {
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
    this.props.onEditList({ listName });

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
          placeholder="Enter new list name"
          value={this.state.listName}
          onChange={this.handleInputChange.bind(this)}
        />
        &nbsp;
        <input
          type="submit"
          value="+ Edit List"
          disabled={!this.state.listName.trim()}
        />
      </form>
    );
  }
}

// ListEdit.propTypes = {
//   onEditList: React.PropTypes.func.isRequired
// };

export default ListEdit;
