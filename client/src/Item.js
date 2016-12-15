import React from 'react';
// import { Link } from 'react-router';

const Item = (props) => {

  return (

      <li className="list_of_items">
        <div>
          <h4>{props.itemText}</h4>
      </div>
      </li>
  );
}

// Item.propTypes = {
//   listName: React.PropTypes.string.isRequired,
// }

export default Item;
