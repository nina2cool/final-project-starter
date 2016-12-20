import React from 'react';
import Movie from './Movie';
import { Row, Col } from 'react-bootstrap';

const MovieSearchResult = (props) => {
    // {JSON.stringify(props.searchResult)

    return (

      <div>
      <Row>
            <hr></hr>
            <h2>Search Results</h2>
      </Row>

      <Row>
          <Col md={12} className="movie_search_results">
              <Movie movie={props.resultOfSearch} />
              <button className="btn btn-primary" onClick={() => props.onAddMovie(props.resultOfSearch.imdbID)}>+ Add to My Movie List</button>

              <form onSubmit={ event => props.onDismiss(event)}>
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="x Dismiss"
                />
              </form>

          </Col>

          <Col md={12}>

          </Col>
      </Row>

      </div>
    );
}

export default MovieSearchResult;
