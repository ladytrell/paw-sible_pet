import { reducer } from '../utils/reducers';

// import our actions
import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART
} from '../utils/actions';

// original state
const state = {
  name: 'Lernantino',
  email: 'lernantino@gmail.com' 
}

// create a new version of state by making a copy of the original state's data and updating only the part that has changed
const updatedState = {...state, email: 'lernantino99@gmail.com'};

// create a sample of what our global state will look like
const initialState = {
  cart: [
    {
    }
  ],
  cartOpen: false
};

test('UPDATE_PRODUCTS', () => {
  let newState = reducer(initialState, {
    type: UPDATE_PRODUCTS,
    products: [{}, {}]
  });

  expect(newState.products.length).toBe();
  expect(initialState.products.length).toBe();
});
