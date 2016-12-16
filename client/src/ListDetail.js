import React, { Component } from 'react';
import axios from 'axios';
import ItemAddNew from './ItemAddNew';
import Items from './Items';
import { Link } from 'react-router';


class ListDetail extends Component {
  constructor() {
    super();

    this.state = {
      list: null,
      items: null
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
    // console.log('handleAddItem');
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


  handleDeleteItem(id) {
    // console.log('delete', id);
    // console.log(this.state.items);
    // debugger;
    axios.delete(`/api/items/${id}`, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })

      .then(resp => {
        // console.log('successfully deleted');
        // console.log(this.state.list.items);
        const items = this.state.list.items.filter(item => {
          return item._id !== id;
        });

          this.setState(prev => {
            return {
              ...prev,
              list: {
                ...this.state.list,
                items: [...items]
              }
            };
          });
        })

      .catch(err => console.log(err));
}

  renderDetails() {
    return (
      <div>

          <h1>{this.state.list.listName}</h1>
          <hr></hr>
          <Link to={`/listindex`}>Back to your lists</Link>
          <h4>Add items to your list:</h4>
          <ItemAddNew
              listId={this.state.list._id}
              onAddItem={this.handleAddItem.bind(this)}
            />
          <hr></hr>
           <Items
              items={this.state.list.items}
              onDeleteItem={this.handleDeleteItem.bind(this)}
           />
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
