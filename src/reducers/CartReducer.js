import { ADD_TO_CART, GET_TOTAL, UPDATE_ITEM, VIEW_CART } from "../action";
import { initialState } from "../store";
import { asyncActionName } from "../utils/AsyncUtils";

const CartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case asyncActionName(VIEW_CART).loading:
      return { ...state, loading: payload };
    case asyncActionName(VIEW_CART).success:
      return {
        ...state,
        carts: payload,
        success: true,
      };
    case asyncActionName(VIEW_CART).failure:
      return {
        ...state,
        error: payload.status,
        success: false,
      };
    case asyncActionName(ADD_TO_CART).loading:
      return { ...state, loading: payload };
    case asyncActionName(ADD_TO_CART).success:
      return {
        ...state,
        cart: payload,
        success: true,
      };
    case asyncActionName(ADD_TO_CART).failure:
      return {
        ...state,
        error: payload.status,
        success: false,
      };
    case asyncActionName(UPDATE_ITEM).loading:
      return { ...state, loading: payload };
    case asyncActionName(UPDATE_ITEM).success:
      return {
        ...state,
        cart: payload,
        success: true,
      };
    case asyncActionName(UPDATE_ITEM).failure:
      return {
        ...state,
        error: payload.status,
        success: false,
      };
    case asyncActionName(GET_TOTAL).loading:
      return { ...state, loading: payload };
    case asyncActionName(GET_TOTAL).success:
      return {
        ...state,
        total: payload,
        success: true,
      };
    case asyncActionName(GET_TOTAL).failure:
      return {
        ...state,
        error: payload.status,
        success: false,
      };
    default:
      return state;
  }
};

export default CartReducer;
