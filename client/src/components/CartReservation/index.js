import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';

import { idbPromise } from "../../utils/helpers";

const CartReservation = ({ item }) => {
  const [, dispatch] = useStoreContext();

  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });
  };  
  
  return (
    <div className="flex-row">      
      <div>
        <div>{item.provider}, ${item.price}</div>
        <div>
          <span>Qty:  {item.timeSlot}</span>
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}          
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartReservation;
