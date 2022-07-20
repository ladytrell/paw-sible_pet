import { useReducer } from 'react';

import {
    UPDATE_PROVIDERS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART,
    ADD_RESERVATION 
  } from "./actions";
  
export const reducer = (state, action) => {
    switch (action.type) {
      // if action type value is the value of `UPDATE_PROVIDERS`, return a new state object with an updated providers array
      case UPDATE_PROVIDERS:
        return {
          ...state,
          providers: [...action.providers]
        };
      // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
      case UPDATE_CATEGORIES:
        return {
          ...state,
          categories: [...action.categories]
        };

      case UPDATE_CURRENT_CATEGORY:
        return {
          ...state,
          currentCategory: action.currentCategory
        }
      // if action type value is the value of `ADD_TO_CART`, return a new state object with an updated true for cartOpen, cart array  
      case ADD_TO_CART:
        return {
          ...state,
          cartOpen: true,
          cart: [...state.cart, action.reservations]
        };
/*      case ADD_MULTIPLE_TO_CART:
        return {
          ...state,
          cart: [...state.cart, ...action.providers],
        };
      case REMOVE_FROM_CART:
        let newState = state.cart.filter(provider => {
          return provider._id !== action._id;
        });
      
        return {
          ...state,
          cartOpen: newState.length > 0,
          cart: newState
      };
      case UPDATE_CART_QUANTITY:
        return {
          ...state,
          cartOpen: true,
          cart: state.cart.map(provider => {
            if (action._id === provider._id) {
              provider.purchaseQuantity = action.purchaseQuantity;
            }
            return provider;
          })
      };
      case CLEAR_CART:
        return {
          ...state,
          cartOpen: false,
          cart: []
        };*/
      case TOGGLE_CART:
        return {
          ...state,
          cartOpen: !state.cartOpen
        };
      default:
        return state;
    }
  };

  export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
  }