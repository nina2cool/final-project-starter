import React from 'react';
import ListSelector from './ListSelector';
import { Grid, Row } from 'react-bootstrap';

const ThisList = (props) => {

    return (
              <div>
                  <Grid>
                    <Row>

                        {props.lists.map(list => {
                            return (
                              <ListSelector
                                key={list._id}
                                id={list._id}
                                listName={list.listName}
                                items={list.items}
                                onAddToList={props.onAddToList}
                                listingName={props.listingName}
                              />

                            )
                          }
                        )
                      }
                    </Row>
                </Grid>
              </div>
            );
}

export default ThisList;
