import React from 'react';
import List from './List';
import { Grid, Row } from 'react-bootstrap';

const ThisList = (props) => {

    return (
      <div>
          <Grid>
            <Row>
              {props.lists.map(list => {

                return (
                  <List
                    key={list._id}
                    id={list._id}
                    listName={list.listName}
                    items={list.items}
                    onDeleteList={props.onDeleteList}
                  />

                )
              })}
            </Row>
        </Grid>
      </div>
    );
}

export default ThisList;
