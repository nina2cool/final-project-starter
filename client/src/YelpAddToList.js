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

      alert(listingName + " has been added to your list!");

  }


  render() {

    return (
      <div>
          <h1>Add This to a List</h1>
          <hr></hr>
          <p>
            <Link to={`/listindex`}><button className="btn btn-primary">View all your Lists</button></Link>
          </p>
          <p>
            <Link to={`/yelp`}><button className="btn btn-primary">Back to Search Yelp</button></Link>
          </p>
          <p>
            <Link to={`/movieindex`}><button className="btn btn-primary">Back to Search Movies</button></Link>
          </p>
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
