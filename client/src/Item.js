import React from 'react';
import {Icon} from 'react-fa';
import { Row, Col } from 'react-bootstrap';

const Item = (props) => {

  return (

      <div className="item_list_item">
      <Row>
        <Col md={10}>
          <h4>{props.itemText}</h4>
        </Col>
        <Col md={2}>
          <span onClick={() => props.onDeleteItem(props.id)} className="delete_button"><Icon name="trash" /></span>
        </Col>
        </Row>
      </div>
  );
}

// Item.propTypes = {
//   listName: React.PropTypes.string.isRequired,
// }

export default Item;
