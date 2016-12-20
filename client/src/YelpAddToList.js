import React, { Component } from 'react';
import axios from 'axios';
import ListsToSelect from './ListsToSelect';
import ListAddNew from './ListAddNew';
import { Link } from 'react-router';

class YelpAddToList extends Component {
  constructor() {
    super();

    this.state = {
      lists: [],
      listingName: null,
    }
  }

  componentDidMount() {

    // get the lists
    axios.get('/api/lists', {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })

      .then(resp => {
        this.setState({
          lists: resp.data,
        })
      })
      .catch(err => console.log(`Error! ${err}`));

  }

  handleAddList(attributes) {
    axios.post('/api/lists', attributes, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })

      .then(resp => {
        this.setState(prev => {
          return {
            ...prev,
            lists: [...prev.lists, resp.data]
          };
        });
      })
      .catch(err => console.log(err));
  }

  handleAddToExistingList(attributes) {

    const listingName = attributes[0];
    const listId = attributes[1];

    const newAttributes = { itemText: listingName, list: listId };
    axios.post('/api/items', newAttributes, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })

      .then(resp => {

        axios.get(`/lists/${listId}`, {
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


      })
      .catch(err => console.log(err));

      alert("Restaurant added!");

  }


  render() {

    return (
      <div>
          <h1>Add Yelp Listing to a List</h1>
          <hr></hr>
          <Link to={`/yelp`}>Back to Search Yelp</Link>
          <hr></hr>
          <h4>Choose an existing list:</h4>
          <ListsToSelect
            lists={this.state.lists}
            listingName={this.props.params.name}
            onAddToList={this.handleAddToExistingList.bind(this)}
          />
          <hr></hr>
          <h4>OR create a new list:</h4>
          <ListAddNew onAddList={this.handleAddList.bind(this)}/>

      </div>

    );
  }
}

export default YelpAddToList;
