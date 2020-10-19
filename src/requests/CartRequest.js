import { ADD_TO_CART, VIEW_CART } from "../action";
import { asyncActions } from "../utils/AsyncUtils";
import axios from "../utils/axios";

export const viewCart = (dispatch, payload) => {
  dispatch(asyncActions(VIEW_CART).loading(true));
  return axios({
    method: "get",
    url: `cart/${payload}`,
  })
    .then((response) => {
      dispatch(asyncActions(VIEW_CART).loading(false));
      if (response.status === 200) {
        const {
          data: { cart },
        } = response;
        localStorage.setItem("cart_items", JSON.stringify([...cart]));
        dispatch(asyncActions(VIEW_CART).success(cart));
        dispatch(asyncActions(VIEW_CART).loading(false));
        return cart;
      }
    })
    .catch((error) => {
      dispatch(asyncActions(VIEW_CART).loading(false));
      dispatch(asyncActions(VIEW_CART).failure(true, error.response));
      return error.response;
    });
};

export const addToCart = (dispatch, id, payload) => {
  dispatch(asyncActions(ADD_TO_CART).loading(true));
  return axios({
    method: "post",
    url: `cart/${id}`,
    data: payload,
  })
    .then((response) => {
      dispatch(asyncActions(ADD_TO_CART).loading(false));
      if (response.status === 200) {
        const {
          data: { cart, message, pizza },
          status,
        } = response;
        const item = {
          cart,
          pizza,
        };

        localStorage.setItem("cart_item", JSON.stringify({ ...item }));
        dispatch(asyncActions(ADD_TO_CART).success(item));
        dispatch(asyncActions(ADD_TO_CART).loading(false));
        return { item, status, message };
      }
    })
    .catch((error) => {
      dispatch(asyncActions(ADD_TO_CART).loading(false));
      dispatch(asyncActions(ADD_TO_CART).failure(true, error.response));
      if (error.response.status === 409) {
        const { message } = error.response.data;
        return { message, status: error.response.status };
      }
      return error.response;
    });
};
