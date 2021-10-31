import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";


import rootReducer from "./reducers/index";

const storeFactory = () => {
  //getting initial state from cart
  const cartString = localStorage.getItem("bookCart");
  const cart = cartString ? JSON.parse(cartString) : [];

  //getting initial state from count
  const countValue = localStorage.getItem("bookCount");
  const count = countValue ? JSON.parse(countValue) : 0;

  const preloadedState = {
    reducerCart: {
      cart: cart,
      count: count,
    },
  };
  
  const reduxStore = createStore(
    rootReducer,
    // @ts-ignore
    preloadedState,
    composeWithDevTools(applyMiddleware())
  );

  reduxStore.subscribe(() => {
    const currentState = reduxStore.getState();
    // @ts-ignore
    const cartState = currentState.reducerBookCart.cart;
    const stringifyCart = JSON.stringify(cartState);
    localStorage.setItem("cart", stringifyCart);
    // @ts-ignore
    const countState = currentState.reducerBookCart.count;
    const stringifyCount = JSON.stringify(countState);
    localStorage.setItem("count", stringifyCount);

  });
  return reduxStore;
};

export default storeFactory;
