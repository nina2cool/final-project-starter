import React, { Component } from 'react';

class ItemAddNew extends Component {
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
    this.props.onAddItem({ itemText });

    this.setState({
      itemText: '',
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label htmlFor="itemText">Item Text: </label>
        <input
          type="text"
          name="itemText"
          value={this.state.itemText}
          onChange={this.handleInputChange.bind(this)}
        />

        <input
          type="submit"
          value=" + Add New Item "
          disabled={!this.state.itemText.trim()}
        />
      </form>
    );
  }
}

ItemAddNew.propTypes = {
  onAddItem: React.PropTypes.func.isRequired
};

export default ItemAddNew;
