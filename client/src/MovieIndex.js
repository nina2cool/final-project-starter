import React, { Component } from 'react';
import MovieSearchBar from './MovieSearchBar';
import MovieSearchResult from './MovieSearchResult';
import axios from 'axios';
import MovieList from './MovieList';
import { Grid } from 'react-bootstrap';


class MovieIndex extends Component {

  constructor() {
    super();

    this.state = {
      searchText: '',
      resultOfSearch: null,
      movieList: []
    };
  }


    componentDidMount() {
      //console.log('did mount');

      const savedMovieList = JSON.parse(localStorage.getItem('SavedMovieList'));

      if (savedMovieList) {
           this.setState({
             ...this.state,
             movieList: savedMovieList
           });
         }


    }

  handleChange(event) {
    //console.log('handle change');
    const searchText = event.target.value;
    this.setState({
      searchText: searchText
    })
  }

  handleSearch(event) {
    //console.log('handle search');
    event.preventDefault();

    axios.get(`http://www.omdbapi.com/?t=${this.state.searchText}&plot=short&r=json`)

    .then(resp => {
      //console.log(resp.data);

      this.setState({
        resultOfSearch: resp.data
      })

    })

    .catch(err => console.log(`Error! ${err}`));
  }

  handleDismiss(event) {

    //console.log("Dismiss this movie");
    event.preventDefault();

    this.setState({
      searchText: '',
      resultOfSearch: ''
    })

  }

  handleAddMovie(id) {
    event.preventDefault();
    //console.log('add', id);

    axios.get(`http://www.omdbapi.com/?t=${this.state.searchText}&plot=short&r=json`)

    .then(resp => {
      //console.log(resp.data);

        this.setState(prev => {
                return {
                  ...prev,
                  movieList: [...prev.movieList, resp.data],
                  searchText: '',
                  resultOfSearch: ''
                };
              });
              localStorage.setItem('SavedMovieList', JSON.stringify(this.state.movieList));
            })



            .catch(err => console.log(`Error! ${err}`));



  }


  handleDelete(event, id) {
    event.preventDefault();
    //console.log('delete', id);

    var savedMovieList = this.state.movieList;

    var newSavedMovieList = savedMovieList.filter(movie => {
      return movie.imdbID !== id;
    });

      this.setState({
        ...this.state,
        movieList: newSavedMovieList
      });

      localStorage.setItem('SavedMovieList', JSON.stringify(newSavedMovieList));

  }

  render() {
    // console.log('render');
    return (
      <div className="container-fluid">

        <Grid>
            <div className="header">
              <h1 className="header_text">Movie Index</h1>
            </div>
              <div className="search_box">
                  <h2>Search for a movie by exact title</h2>
                  <div>
                      <MovieSearchBar
                      value={this.state.searchText}
                      onChange={this.handleChange.bind(this)}
                      onSearch={this.handleSearch.bind(this)}
                      />
                  </div>
              </div>

              {this.state.resultOfSearch && <MovieSearchResult resultOfSearch={this.state.resultOfSearch} onAddMovie={this.handleAddMovie.bind(this)}
              onDismiss={this.handleDismiss.bind(this)}
              />}

              <hr></hr>
                <div className="movie_section">
                  <h2 className="movie_section_text">My Movie List</h2>
                </div>
                <div className="movie_list">

                <MovieList
                  listOfMovies={this.state.movieList}
                  onDelete={this.handleDelete.bind(this)}
                />
              </div>
        </Grid>

      </div>
    );
  }

}

export default MovieIndex;
