import React from 'react';
// import { Link } from 'react-router';

const Item = (props) => {

  return (

      <div className="item_list_item">
        <div>
          <h4>{props.itemText}</h4>
          <span onClick={() => props.onDeleteItem(props.id)} className="delete_button">x Delete</span>
      </div>
      </div>
  );
}

// Item.propTypes = {
//   listName: React.PropTypes.string.isRequired,
// }

export default Item;
