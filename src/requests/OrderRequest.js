import { CHECKOUT } from "../action";
import { asyncActions } from "../utils/AsyncUtils";
import axios from "../utils/axios";

export const checkout = (dispatch, payload) => {
  dispatch(asyncActions(CHECKOUT).loading(true));
  return axios({
    method: "post",
    url: `order`,
    data: payload,
  })
    .then((response) => {
      dispatch(asyncActions(CHECKOUT).loading(false));
      if (response.status === 201) {
        const {
          data: { data, message, success },
        } = response;

        // localStorage.setItem("cart_item", JSON.stringify({ ...item }));
        dispatch(asyncActions(CHECKOUT).success(data));
        dispatch(asyncActions(CHECKOUT).loading(false));
        return { data, success, message };
      }
    })
    .catch((error) => {
      dispatch(asyncActions(CHECKOUT).loading(false));
      dispatch(asyncActions(CHECKOUT).failure(true, error.response));
      return error.response;
    });
};
