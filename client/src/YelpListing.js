import React from 'react';
// import { Link } from 'react-router';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';



const YelpListing = (props) => {
  //const numItems = Object.keys(props.items).length;
  // console.log(numItems);

  return (

      <Col md={6} sm={6} className="listing_outer_box">
        <Row className="listing_inner_box">
                <Col md={3}>
                    <img src={props.image_url} alt={props.name} className="img-circle" />
                </Col>
                <Col md={9}>
                  <Row>
                    <h4>{props.name}</h4>
                  </Row>
                  <Row>
                    <Col md={4}>
                      {props.price}
                    </Col>
                    <Col md={4}>
                        Rating: {props.rating}
                    </Col>
                    <Col md={4}>
                        Reviews: {props.review_count}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <a href={props.url} target="_blank">Visit Yelp Page</a>
                    </Col>
                    <Col md={6}>
                      Save to a List
                    </Col>
                  </Row>
                </Col>
        </Row>
      </Col>
  );
}
//
// YelpListing.propTypes = {
//   name: React.PropTypes.string.isRequired,
// }

//  <div onClick={() => props.onDeleteList(props.id)} className="delete_button">x delete</div>

export default YelpListing;
