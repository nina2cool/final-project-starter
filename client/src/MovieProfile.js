import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';

class MovieProfile extends Component {
  constructor() {
    super();

    this.state = {
      movie: null
    };
  }

  componentDidMount() {

    axios.get(`http://www.omdbapi.com/?i=${this.props.params.id}&plot=full&r=json`)

      .then(resp => {
        this.setState({
          movie: resp.data
        })
        //console.log(resp.data);
      })
      .catch(err => console.log(`Error! ${err}`));
  }

  renderMovieProfile() {
    return (
      <div className="movie_profile">
          <Grid>
                <div>
                  <h2 className="movie_profile_header">{this.state.movie.Title} ({this.state.movie.Year})</h2>
                    <hr></hr>
                    <Link to={`/movieindex`}><button className="btn btn-primary">Back to My Movie List</button></Link>
                      <hr></hr>
                </div>
                <Row>
                  <Col md={4}>
                        <img src={this.state.movie.Poster} alt="Movie Poster"/>
                  </Col>
                  <Col md={8}>
                        <h3 className="movie_heading">Released</h3>
                        <p>{this.state.movie.Released}</p>
                        <h3 className="movie_heading">Genre</h3>
                        <p>{this.state.movie.Genre}</p>
                        <h3 className="movie_heading">Actors</h3>
                        <p>{this.state.movie.Actors}</p>
                        <h3 className="movie_heading">Plot</h3>
                        <p>{this.state.movie.Plot}</p>
                  </Col>
              </Row>
          </Grid>
      </div>
    );
  }

  render() {
    if (!this.state.movie) {
      return <h2>Loading...</h2>
    }

    return this.renderMovieProfile();
  }
}

export default MovieProfile;
