import React from 'react';
import Item from './Item';

const ThisItemList = (props) => {
    return (
      <ul>
        {props.items.map(item => {
          return (
            <Item
              key={item._id}
              id={item._id}
              itemText={item.itemText}
            />
          )
        })}
      </ul>
    );
}

export default ThisItemList;
