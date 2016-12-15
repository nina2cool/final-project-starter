import React from 'react';
//import { Link } from 'react-router';

const YelpListing = (props) => {
  //const numItems = Object.keys(props.items).length;
  // console.log(numItems);
  return (

      <li className="list_of_listings">
        <div>
          <h4>{props.name}</h4>
          <img src={props.image_url} alt={props.name}/>
          <p>Rating: {props.rating}</p>
          <p># of Reviews: {props.review_count}</p>
          <p>Price Range: {props.price}</p>
          <p>Phone: {props.phone}</p>
      </div>
      </li>
  );
}
//
// YelpListing.propTypes = {
//   name: React.PropTypes.string.isRequired,
// }

//  <div onClick={() => props.onDeleteList(props.id)} className="delete_button">x delete</div>

export default YelpListing;
