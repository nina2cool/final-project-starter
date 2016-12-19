import React, { Component } from 'react';
import axios from 'axios';
import ListsToSelect from './ListsToSelect';
import ListAddNew from './ListAddNew';
// import ListDetail from './ListDetail';
// import { BrowserRouter, Match, Miss } from 'react-router';
// import { Link } from 'react-router';
// const express = require('express');
// const router = express.Router();

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
        // console.log(resp.data);
        this.setState({
          lists: resp.data,
        })
      })
      .catch(err => console.log(`Error! ${err}`));

      //const currentListingName = this.props.params.name;

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

    console.log('add to an existing list ' + attributes);
    console.log(listingName);
    console.log(listId);

    const newAttributes = { itemText: listingName, list: listId };
    // console.log('handleAddItem');
    axios.post('/api/items', newAttributes, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })

      .then(resp => {

        console.log('i got added');

        // router.get('/listdetail/:listId');

        // axios.get(`/listdetail/${listId}`, {
        //   headers: {
        //     authorization: localStorage.getItem('token')
        //   }
        // })
        //   .then(resp => {
        //
        //     this.setState({
        //       list: resp.data
        //     })
        //   })
        //   .catch(err => console.log(`Error! ${err}`));

        // this.setState(prev => {
        //   return {
        //     ...prev,
        //     list: {
        //       ...this.state.list,
        //       items: [...prev.list.items, resp.data]
        //     }
        //   };
        // });
      })
      .catch(err => console.log(err));



    // axios.post('/api/lists', attributes, {
    //   headers: {
    //     authorization: localStorage.getItem('token')
    //   }
    // })
    //
    //   .then(resp => {
    //     this.setState(prev => {
    //       return {
    //         ...prev,
    //         lists: [...prev.lists, resp.data]
    //       };
    //     });
    //   })
    //   .catch(err => console.log(err));
  }


  render() {

    return (
      <div>
          <h1>Add Yelp Listing to a List</h1>
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
