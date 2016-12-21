import React, { Component } from 'react';

class ItemEdit extends Component {
  constructor() {
    super();

    this.state = {
      itemText: '',
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

    const { itemText } = this.state;
    this.props.onEditItem({ itemText });

    this.setState({
      itemText: '',
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>

        <input
          type="text"
          name="itemText"
          placeholder="Enter new item name"
          value={this.state.listName}
          onChange={this.handleInputChange.bind(this)}
        />
        &nbsp;
        <input
          type="submit"
          value="+ Edit Item"
          className="btn btn-primary"
          disabled={!this.state.itemText.trim()}
        />
      </form>
    );
  }
}

// ItemEdit.propTypes = {
//   onEditList: React.PropTypes.func.isRequired
// };

export default ItemEdit;
