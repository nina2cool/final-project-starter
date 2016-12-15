import React, { Component } from 'react';
import axios from 'axios';
import NewItemForm from './AddItem';
import ItemList from './ItemList';
import { Link } from 'react-router';


class ListDetail extends Component {
  constructor() {
    super();

    this.state = {
      list: null
    };
  }

  componentDidMount() {
    axios.get(`/api/lists/${this.props.params.id}`, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
      .then(resp => {

        this.setState({
          list: resp.data
        })
      })
      .catch(err => console.log(`Error! ${err}`));
  }


  handleAddItem(attributes) {
    // { itemText: 'whatever' }
    // { itemText: 'whatever', listId: 'adklfjadsf'asd }
    const newAttributes = { ...attributes, list: this.state.list._id };
    console.log('handleAddItem');
    axios.post('/api/items', newAttributes, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })

      .then(resp => {

        this.setState(prev => {
          return {
            ...prev,
            list: {
              ...this.state.list,
              items: [...prev.list.items, resp.data]
            }
          };
        });
      })
      .catch(err => console.log(err));
  }

  renderDetails() {
    return (
      <div>
          <Link to={`/listindex`}>Back to your lists</Link>
          <h2>Name: {this.state.list.listName}</h2>
          <h3>Add items to your list:</h3>
          <NewItemForm
              listId={this.state.list._id}
              onAddItem={this.handleAddItem.bind(this)}
            />
            <hr></hr>
           <ItemList items={this.state.list.items} />


      </div>
    );
  }

  render() {
    if (!this.state.list) {
      return <h2>Loading the list detail...</h2>
    }

    return this.renderDetails();
  }
}

export default ListDetail;
