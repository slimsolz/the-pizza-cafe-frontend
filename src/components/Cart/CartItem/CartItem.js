import React, { useContext, useState } from "react";
import styles from "./CartItem.module.scss";
import { Link } from "react-router-dom";
import { Context } from "../../../store";
import { updateItemInCart } from "../../../requests/CartRequest";

const CartItem = ({
  name,
  price,
  sizeValue,
  pizzaImg,
  itemId,
  defaultQuantity,
  cartId,
  pizzaId,
}) => {
  const { dispatch } = useContext(Context);
  const [quantity, setQuantity] = useState(defaultQuantity);
  const [total, setTotal] = useState(price);
  const sizes = {
    L: 2.0,
    M: 1.5,
    S: 1,
  };
  const [disableAdd, setDisableAdd] = useState(false);
  const [disableMinus, setDisableMinus] = useState(false);

  const handleButtonClick = (type) => {
    if (type.toLowerCase() === "add") {
      getTotal(price, parseInt(quantity) + 1, sizes[sizeValue]);
      setQuantity((quantity) => parseInt(quantity) + 1);
      const payload = {
        cart_id: cartId,
        price: total,
        quantity: parseInt(quantity) + 1,
        size: sizeValue,
      };
      handlerUpdateItem(type, pizzaId, payload);
    } else {
      getTotal(price, parseInt(quantity) - 1, sizes[sizeValue]);
      setQuantity((quantity) => parseInt(quantity) - 1);
      const payload = {
        cart_id: cartId,
        price: total,
        quantity: parseInt(quantity) - 1,
        size: sizeValue,
      };
      handlerUpdateItem(type, pizzaId, payload);
    }
  };

  const getTotal = (amount, qty, size) => {
    const total = (amount * qty * size).toFixed(2);

    setTotal(total);
  };

  const handlerUpdateItem = (type, id, data) => {
    if (type === "add") {
      setDisableAdd(true);
    } else {
      setDisableMinus(true);
    }
    updateItemInCart(dispatch, id, data).then((res) => {
      if (res.success) {
        setDisableAdd(false);
        setDisableMinus(false);
      }
    });
  };

  return (
    <div className={styles.CartItemContainer}>
      <div className={styles.pizImgContainer}>
        <img src={pizzaImg} alt="pizza" className={styles.pizImg} />
      </div>
      <div className={styles.detailsContainer}>
        <h1>{name}</h1>
        <h1>size: {sizeValue}</h1>
        <div className={styles.quantityContainer}>
          <button
            onClick={() => handleButtonClick("subtract")}
            disabled={quantity === 1 || disableMinus}
          >
            -
          </button>
          <input
            type="text"
            pattern="[0-9]*"
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
          />
          <button
            onClick={() => handleButtonClick("add")}
            disabled={disableAdd}
          >
            +
          </button>
        </div>
      </div>
      <div className={styles.actionsContainer}>
        <p className={styles.amount}>{parseFloat(total).toFixed(2)}</p>
        <button className={styles.remove}>remove</button>
        <Link to={`/edit/${itemId}`} className={styles.edit}>
          edit
        </Link>
      </div>
    </div>
  );
};

export default CartItem;
