import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { useStoreContext } from "../utils/GlobalState";
import { QUERY_PROVIDERS } from '../utils/queries';
import spinner from '../assets/spinner.gif';
import Cart from '../components/Cart';

import { idbPromise } from "../utils/helpers";

import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PROVIDERS,
} from '../utils/actions';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();
  
  const [currentProvider, setCurrentProvider] = useState({})
  
  const { loading, data } = useQuery(QUERY_PROVIDERS);
  
  const { providers, cart } = state;
  
  useEffect(() => {
    // already in global store
    if (providers.length) {
      setCurrentProvider(providers.find(provider => provider._id === id));
    } 
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PROVIDERS,
        providers: data.providers
      });
  
      data.providers.forEach((provider) => {
        idbPromise('providers', 'put', provider);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('providers', 'get').then((indexedProviders) => {
        dispatch({
          type: UPDATE_PROVIDERS,
          providers: indexedProviders
        });
      });
    }
  }, [providers, data, loading, dispatch, id]);
    

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id)
  
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      // if we're updating quantity, use existing item data and increment purchaseQuantity value by one
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        provider: { ...currentProvider, purchaseQuantity: 1 }
      });
      // if provider isn't in the cart yet, add it to the current shopping cart in IndexedDB
      idbPromise('cart', 'put', { ...currentProvider, purchaseQuantity: 1 });
    }
  };
  
  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProvider._id
    });
  
    // upon removal from cart, delete the item from IndexedDB using the `currentProvider._id` to locate what to remove
    idbPromise('cart', 'delete', { ...currentProvider });
  };  
  
  return (
    <>
      {currentProvider ? (
        <div className="container my-1">
          <Link to="/">← Back to Providers</Link>

          <h2>{currentProvider.name}</h2>

          <p>{currentProvider.description}</p>

          <p>
            <strong>Price:</strong>${currentProvider.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button 
              disabled={!cart.find(p => p._id === currentProvider._id)} 
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>

          </p>

          <img
            src={`/images/${currentProvider.image}`}
            alt={currentProvider.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
