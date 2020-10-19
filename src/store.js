import React, { createContext, useReducer } from "react";
import combineReducers from "react-combine-reducers";
import CartReducer from "./reducers/CartReducer";
import OrderReducer from "./reducers/OrderReducer";

export const initialState = {
  user: {},
  cart: {
    carts: [],
    cart: {},
    total: 0,
    loading: false,
    success: false,
    error: false,
  },
  menu: {},
  order: {
    checkout: {},
    loading: false,
    success: false,
    error: false,
  },
};

export const Context = createContext(initialState);

export const Provider = ({ children }) => {
  const [rootReducerCombined, initialStateCombined] = combineReducers({
    Cart: [CartReducer, initialState.cart],
    Order: [OrderReducer, initialState.order],
  });

  const [state, dispatch] = useReducer(
    rootReducerCombined,
    initialStateCombined
  );
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
