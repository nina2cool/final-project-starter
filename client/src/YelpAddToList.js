import React, { Component } from 'react';
import axios from 'axios';
import Lists from './Lists';
import ListAddNew from './ListAddNew';

class ListIndex extends Component {
  constructor() {
    super();

    this.state = {
      lists: [],
    }
  }

  componentDidMount() {
    // console.log('did mount');
    // console.log(localStorage.getItem('token'));
    axios.get('/api/lists', {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })

      .then(resp => {
        // console.log(resp.data);
        this.setState({
          lists: resp.data
        })
      })
      .catch(err => console.log(`Error! ${err}`));
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onAddList({
      listName: this.state.listName
    });
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState(prev => ({
      ...prev,
      [name]: value
    }));
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


  handleDeleteList(id) {
    // console.log('delete', id);
    axios.delete(`/api/lists/${id}`, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })

      .then(resp => {
        // console.log('successfully deleted');
        const lists = this.state.lists.filter(list => {
          return list._id !== id;
        });

          this.setState(prev => {
            return {
              ...prev,
              lists: lists
            };
          });
        })

      .catch(err => console.log(err));
}


  render() {

    return (
      <div>
          <h1>My Lists</h1>

          <h4>Create a new list</h4>
          <ListAddNew onAddList={this.handleAddList.bind(this)}/>
          <hr></hr>
          <Lists
            lists={this.state.lists}
            onDeleteList={this.handleDeleteList.bind(this)}
          />
      </div>

    );
  }
}

export default ListIndex;
