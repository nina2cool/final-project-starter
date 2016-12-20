import React, { Component } from 'react';
import axios from 'axios';
import ItemAddNew from './ItemAddNew';
import Items from './Items';
import { Link } from 'react-router';
import { Row, Col } from 'react-bootstrap';
import ListEdit from './ListEdit';

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

    axios.delete(`/api/items/${id}`, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })

      .then(resp => {
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

  handleEditList(attributes) {

      const listId = this.state.list._id;
      const listName = attributes.listName;
      const newAttributes = { listName: listName, id: this.state.list._id };

      axios.put(`/api/lists/${listId}`, newAttributes, {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })

        .then(resp => {

          this.setState(prev => {

            return {
              ...prev,
              list: {
                ...resp.data,
                items: [...prev.list.items]
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
          <Link to={`/listindex`}><button className="btn btn-primary">Back to your lists</button></Link>
          <hr></hr>
          <Row>
            <Col md={6}>
              <h4>Add items to your list:</h4>
              <ItemAddNew
                  listId={this.state.list._id}
                  onAddItem={this.handleAddItem.bind(this)}
              />
            </Col>

            <Col md={6}>
              <h4>Edit your list name:</h4>
              <ListEdit
                  listId={this.state.list._id}
                  onEditList={this.handleEditList.bind(this)}
              />
            </Col>
          </Row>

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
