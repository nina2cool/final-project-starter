import React from 'react';
import { Link } from 'react-router';
import { Row, Col } from 'react-bootstrap';

const List = (props) => {
  const numItems = Object.keys(props.items).length;
  // console.log(numItems);
  return (
          <Col md={3} sm={4} xs={12} className="list_outer_box">
            <Row className="list_inner_box">

                <h4>{props.listName}</h4>
                <p># of items: <span className="num_item_box">{numItems}</span></p>

                <Col sm={6}>
                  <Link to={`/listdetail/${props.id}`}>> View</Link>
                </Col>

                <Col sm={6}>
                    <div onClick={() => props.onDeleteList(props.id)} className="delete_button">x Delete</div>
                </Col>
            </Row>
          </Col>
  );
}

List.propTypes = {
  listName: React.PropTypes.string.isRequired,
}

export default List;
