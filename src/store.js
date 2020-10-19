import React, { createContext, useContext, useReducer } from "react";
import combineReducers from "react-combine-reducers";
import CartReducer from "./reducers/CartReducer";

export const initialState = {
  user: {},
  cart: {
    carts: [],
    cart: {},
    loading: false,
    success: false,
    error: false,
  },
  menu: {},
};

export const Context = createContext(initialState);

export const Provider = ({ children }) => {
  const [rootReducerCombined, initialStateCombined] = combineReducers({
    Cart: [CartReducer, initialState.cart],
  });

  const [state, dispatch] = useReducer(
    rootReducerCombined,
    initialStateCombined
  );
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
