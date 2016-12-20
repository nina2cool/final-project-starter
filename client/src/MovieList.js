import React from 'react';
import Movie from './Movie';
import { Grid, Row } from 'react-bootstrap';

const MovieList = (props) => {
  return (
    <div>
        <Grid>
          <Row>
              {props.listOfMovies.map(movie => {
                  return (

                        <Movie
                          key={movie.imdbID}
                          movie={movie}
                          RemoveMovieTrue={true}
                          onDelete={props.onDelete}
                        />
                  )
                })}

            </Row>
        </Grid>
    </div>
  );
}


export default MovieList;
