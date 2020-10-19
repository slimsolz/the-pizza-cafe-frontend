import {
  ADD_TO_CART,
  REMOVE_ITEM,
  UPDATE_ITEM,
  VIEW_CART,
  GET_TOTAL,
} from "../action";
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

export const updateItemInCart = (dispatch, id, payload) => {
  dispatch(asyncActions(UPDATE_ITEM).loading(true));
  return axios({
    method: "patch",
    url: `cart/${payload.cart_id}/${id}`,
    data: payload,
  })
    .then((response) => {
      dispatch(asyncActions(UPDATE_ITEM).loading(false));
      if (response.status === 200) {
        const {
          data: { cart },
        } = response;
        dispatch(asyncActions(UPDATE_ITEM).success(cart));
        dispatch(asyncActions(UPDATE_ITEM).loading(false));
      }
      return response.data;
    })
    .catch((error) => {
      dispatch(asyncActions(UPDATE_ITEM).loading(false));
      dispatch(asyncActions(UPDATE_ITEM).failure(true, error.response));
      return error.response;
    });
};

export const removeItemFromCart = (dispatch, cartId, pizzaId) => {
  dispatch(asyncActions(REMOVE_ITEM).loading(true));
  return axios({
    method: "delete",
    url: `cart/${cartId}/${pizzaId}`,
  })
    .then((response) => {
      dispatch(asyncActions(REMOVE_ITEM).loading(false));
      if (response.status === 204) {
        viewCart(dispatch, cartId);
        return null;
      }
    })
    .catch((error) => {
      dispatch(asyncActions(REMOVE_ITEM).loading(false));
      dispatch(asyncActions(REMOVE_ITEM).failure(true, error.response));
      return error.response;
    });
};

export const getTotalAmountInCart = (dispatch, payload) => {
  dispatch(asyncActions(GET_TOTAL).loading(true));
  return axios({
    method: "get",
    url: `cart/total/${payload}`,
  })
    .then((response) => {
      dispatch(asyncActions(GET_TOTAL).loading(false));
      if (response.status === 200) {
        const {
          data: { total, success },
        } = response;
        dispatch(asyncActions(GET_TOTAL).success(total));
        dispatch(asyncActions(GET_TOTAL).loading(false));
        return { total, success };
      }
    })
    .catch((error) => {
      dispatch(asyncActions(GET_TOTAL).loading(false));
      dispatch(asyncActions(GET_TOTAL).failure(true, error.response));
      return error.response;
    });
};
