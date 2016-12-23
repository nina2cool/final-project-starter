import React, { Component } from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import SignUpSignIn from './SignUpSignIn';
import TopNavbar from './TopNavbar';
import Secret from './Secret';
import ListIndex from './ListIndex';
import YelpIndex from './YelpIndex';
import MovieIndex from './MovieIndex';
import MovieProfile from './MovieProfile';
import YelpAddToList from './YelpAddToList';
import ListDetail from './ListDetail';

import axios from 'axios';

class App extends Component {
  constructor() {
      super();

      this.state = {
        signUpSignInError: '',
        authenticated: localStorage.getItem('token'),
        userName: '',
      };
    }

    handleSignUp(credentials) {
      const { username, password, confirmPassword } = credentials;
      if (!username.trim() || !password.trim() || password.trim() !== confirmPassword.trim()) {
        this.setState({
          ...this.state,
          signUpSignInError: 'Must Provide All Fields'
        });
      } else {
        axios.post('/api/signup', credentials)
          .then(resp => {
            const { token } = resp.data;
            this.setState({
              ...this.state,
              signUpSignInError: '',
              authenticated: token
            });
            localStorage.setItem('token', token);
          });
      }
    }

    handleSignIn(credentials) {
      // Handle Sign In

      const { username, password } = credentials;
      if (!username.trim() || !password.trim()) {
        this.setState({
          ...this.state,
          signUpSignInError: 'Must Provide All Fields'
        });
      }

       else {

         axios.post('/api/signin', credentials)
           .then(resp => {
             const { token } = resp.data;
             localStorage.setItem('token', token);

             this.setState({
               ...this.state,
               signUpSignInError: '',
               authenticated: token
             });

           });

      }
    }

    handleSignOut() {
      localStorage.removeItem('token');
      this.setState({
        authenticated: false
      });
    }


    renderSignUpSignIn() {
      return <SignUpSignIn error={this.state.signUpSignInError} onSignUp={this.handleSignUp.bind(this)}
       onSignIn={this.handleSignIn.bind(this)}
      />
    }

    renderApp() {
      return (
        <div>
          <Match exactly pattern="/" component={ListIndex}/>
          <Match exactly pattern="/listindex" component={ListIndex} />
          <Match exactly pattern="/listdetail/:id" component={ListDetail} />
          <Match exactly pattern="/yelp" component={YelpIndex} />
          <Match exactly pattern="/movieindex" component={MovieIndex} />
          <Match exactly pattern="/movieprofile/:id" component={MovieProfile} />
          <Match exactly pattern="/YelpAddToList/:name" component={YelpAddToList} />
          <Match exactly pattern="/secret" component={Secret} />
          <Miss render={() => <h1>NOT FOUND!</h1>} />
        </div>
      );
    }

    render() {
      return (
        <BrowserRouter>
          <div>
            <TopNavbar showNavItems={true}
                onSignOut={this.handleSignOut.bind(this)}
                userName={this.state.userName}
            />
            {this.state.authenticated ? this.renderApp() : this.renderSignUpSignIn()}
          </div>
        </BrowserRouter>
      );
    }
}

export default App;
