import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSignIn({
      username: this.state.username,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    });
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState(prev => ({
      ...prev,
      [name]: value
    }));
  }

  render() {
    return (
      <div><h2>Sign In</h2>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <FormGroup>
          <ControlLabel>Enter your username</ControlLabel>
          <FormControl
            type="email"
            name="username"
            onChange={event => this.handleChange(event)}
            placeholder="Enter Username"
            value={this.state.username}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Enter your password</ControlLabel>
          <FormControl
            type="password"
            name="password"
            onChange={event => this.handleChange(event)}
            placeholder="Enter Password"
            value={this.state.password}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Confirm your password</ControlLabel>
          <FormControl
            type="password"
            name="confirmPassword"
            onChange={event => this.handleChange(event)}
            placeholder="Confirm Password"
            value={this.state.confirmPassword}
          />
        </FormGroup>

        <Button type="submit">
         Sign In
       </Button>
      </form>
      </div>
    );
  }
}

// SignIn.propTypes = {
//   onSignIn: PropTypes.func.isRequired
// };

export default SignIn;
