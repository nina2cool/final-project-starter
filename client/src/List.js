import React from 'react';
import { Link } from 'react-router';
import {Icon} from 'react-fa';
import { Row, Col } from 'react-bootstrap';

const List = (props) => {
  const numItems = Object.keys(props.items).length;
  // console.log(numItems);
  return (
          <Link to={`/listdetail/${props.id}`}>
          <Col md={3} sm={4} xs={12} className="list_outer_box">
            <Row className="list_inner_box">

                <h4>{props.listName}</h4>
                <p># of items: <span className="num_item_box">{numItems}</span></p>

                <Col sm={4}>
                  <Icon name="list-ul" />
                </Col>

                <Col sm={4}>
                  <Link to={`/listdetail/${props.id}`}><Icon name="pencil-square-o" /></Link>
                </Col>

                <Col sm={4}>
                    <div onClick={() => props.onDeleteList(props.id)} className="delete_button"><Icon name="trash" /></div>
                </Col>


            </Row>
          </Col>
          </Link>
  );
}

List.propTypes = {
  listName: React.PropTypes.string.isRequired,
}

export default List;
