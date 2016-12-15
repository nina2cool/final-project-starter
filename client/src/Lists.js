import React from 'react';
import List from './List';

const ThisList = (props) => {

    return (
      <ul>
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
      </ul>
    );
}

export default ThisList;
