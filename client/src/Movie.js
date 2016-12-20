import React from 'react';
import MovieRemove from './MovieRemove';
import { Link } from 'react-router';
import {Icon} from 'react-fa';
import { Col } from 'react-bootstrap';

const Movie = (props) => {
  return (


            <Col md={3} className="movie_box movie_info">
                <Link to={`/MovieProfile/${props.movie.imdbID}`}>
                  <div>
                    <img src={props.movie && props.movie.Poster} alt="Movie Poster" className="movie_poster_image"/>
                  </div>
                </Link>
                <h3>{props.movie && props.movie.Title}</h3>
                <h5>({props.movie.Year})</h5>

                { props.RemoveMovieTrue && <Link to={`./MovieProfile/${props.movie.imdbID}`}><button className="btn btn-primary">> View Movie Profile</button></Link>}

                { props.RemoveMovieTrue && <MovieRemove movie={props.movie} onDelete={props.onDelete} key={props.movie.imdbID}/> }

                <Link to={`/YelpAddToList/${props.movie.Title}`}><button className="btn btn-primary"><Icon name="plus"/> Add to Another List</button></Link>


            </Col>



  );
}
export default Movie;
