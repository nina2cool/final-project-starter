import React from 'react';
import Item from './Item';

const Items = (props) => {
    return (
      <ul className="item_list_outer_box">
        {props.items.map(item => {
          return (
            <Item
              key={item._id}
              id={item._id}
              itemText={item.itemText}
              onDeleteItem={props.onDeleteItem}
            />
          )
        })}
      </ul>
    );
}

export default Items;
