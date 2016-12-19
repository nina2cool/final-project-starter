import React from 'react';
// import { Link } from 'react-router';
import {Icon} from 'react-fa';
import { Row, Col } from 'react-bootstrap';

const ListSelector = (props) => {

  const listProps = [
      props.listingName,
      props.id
  ];

  return (
          <div onClick={() => props.onAddToList(listProps)} className="selector_button">
          <Col md={3} sm={4} xs={12} className="list_outer_box">
            <Row className="list_inner_box">
              <Col sm={9}>
                <h4>{props.listName}</h4>
              </Col>

              <Col sm={3}>
                <Icon name="check-square-o" />
              </Col>
            </Row>
          </Col>
          </div>
  );
}

ListSelector.propTypes = {
  listName: React.PropTypes.string.isRequired,
}

export default ListSelector;
