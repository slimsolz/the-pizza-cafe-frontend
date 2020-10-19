import { CHECKOUT } from "../action";
import { initialState } from "../store";
import { asyncActionName } from "../utils/AsyncUtils";

const OrderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case asyncActionName(CHECKOUT).loading:
      return { ...state, loading: payload };
    case asyncActionName(CHECKOUT).success:
      return {
        ...state,
        checkout: payload,
        success: true,
      };
    case asyncActionName(CHECKOUT).failure:
      return {
        ...state,
        error: payload.status,
        success: false,
      };
    default:
      return state;
  }
};

export default OrderReducer;
