import React from 'react';

const YelpSearchBar = (props) => {
  return (
    <div>
      <h4>Narrow by restaurant name: </h4>
      <input
        className='search-bar'
        type="text"
        value={props.value}
        onChange={ event => props.onChange(event) }
      />
    </div>
  );
}

YelpSearchBar.propTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
}

export default YelpSearchBar;
