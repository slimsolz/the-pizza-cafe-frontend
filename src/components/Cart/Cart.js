import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import styles from "./Cart.module.scss";
import CartItem from "./CartItem/CartItem";
import { Context } from "../../store";
import { getTotalAmountInCart } from "../../requests/CartRequest";

const Cart = () => {
  const { state, dispatch } = useContext(Context);
  const cart_items =
    JSON.parse(localStorage.getItem("cart_items")) &&
    JSON.parse(localStorage.getItem("cart_items"));

  const [totalAmountInCart, setTotalAmountInCart] = useState(0);

  const cards = cart_items.map((cartItem) => {
    const { cart_id, id, price, quantity, size, pizza } = cartItem;
    const {
      name,
      photo: { image_url },
      id: pizza_id,
    } = pizza[0];

    return (
      <CartItem
        sizeValue={size}
        price={price}
        itemId={id}
        key={id}
        defaultQuantity={quantity}
        pizzaImg={image_url}
        name={name}
        pizzaId={pizza_id}
        cartId={cart_id}
      />
    );
  });

  useEffect(() => {
    getTotalAmountInCart(dispatch, cart_items[0].cart_id).then((res) =>
      setTotalAmountInCart(res.total)
    );
  }, [state.Cart.cart]);
  return (
    <Layout title="cart">
      <div className={styles.Cart}>
        {cards}
        <div className={styles.CartTotalContainer}>
          <h1 className={styles.totalTitle}>Total</h1>
          <h1 className={styles.total}>{totalAmountInCart.toFixed(2)}</h1>

          <button className={styles.checkout}>Checkout</button>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
