import React from 'react';
import { Link } from 'react-router';

const List = (props) => {
  const numItems = Object.keys(props.items).length;
  // console.log(numItems);
  return (

      <li className="list_of_lists">
        <div>
          <h4>{props.listName}</h4>
          <p>Number of items in this list: {numItems}</p>
          <Link to={`/listdetail/${props.id}`}>> View List Details</Link>
          <div onClick={() => props.onDeleteList(props.id)} className="delete_button">x delete</div>
      </div>
      </li>
  );
}

List.propTypes = {
  listName: React.PropTypes.string.isRequired,
}

export default List;
