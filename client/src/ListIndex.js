import React, { Component } from 'react';
import axios from 'axios';
import Lists from './Lists';
import NewListForm from './AddList';


class MyLists extends Component {
  constructor() {
    super();

    this.state = {
      lists: [],
    }
  }

  componentDidMount() {
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
          <h1>My List of Lists</h1>

          <h3>Create a new list</h3>
          <NewListForm onAddList={this.handleAddList.bind(this)}/>
          <hr></hr>

          <h3>My Lists</h3>
          <Lists
            lists={this.state.lists}
            onDeleteList={this.handleDeleteList.bind(this)}
          />
      </div>

    );
  }
}

export default MyLists;
