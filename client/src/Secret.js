import React, { Component } from 'react';
import axios from 'axios';

class Secret extends Component {
  constructor() {
    super();

    this.state = {
      message: ''
    };
  }

  componentDidMount() {

    axios.get('/api/secret', {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
      .then(resp => {

        this.setState({
          ...this.state,
          message: resp.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="secret_background">
          <h1>Shhhh!!!! This is the secret hideout.</h1>
          <h2>The current username is {this.state.message}.</h2>
      </div>
    );
  }
}

export default Secret;
