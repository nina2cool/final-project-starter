import React from 'react';
import { Link } from 'react-router';
import { Row, Col } from 'react-bootstrap';
import {Icon} from 'react-fa';


const YelpListing = (props) => {

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
                    <Col md={8}>
                        {props.rating} <Icon name="star"/>s / {props.review_count} reviews
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <a href={props.url} target="_blank">Go to <Icon name="yelp"/></a>
                    </Col>
                    <Col md={6}>
                      <Link to={`/YelpAddToList/${props.name}`}><Icon name="plus"/> Add to a List</Link>
                    </Col>
                  </Row>
                </Col>
        </Row>
      </Col>
  );
}

export default YelpListing;
