import React from 'react';
import { Grid, Row } from 'react-bootstrap';


const MovieSearchBar = (props) => {
  return (
    <div>
      <Grid>
        <Row>
            <form onSubmit={ event => props.onSearch(event)}>
              <input
                className='search-bar'
                type="text"
                placeholder="Enter movie name"
                value={props.value}
                onChange={ event => props.onChange(event) }
              />
              <input
                className="btn btn-primary search_button"
                type="submit"
                value="Search the database"
                disabled={!props.value.trim()}
              />
            </form>
          </Row>
        </Grid>
    </div>

  );
}

MovieSearchBar.propTypes = {
  value: React.PropTypes.string.isRequired
}

export default MovieSearchBar;
