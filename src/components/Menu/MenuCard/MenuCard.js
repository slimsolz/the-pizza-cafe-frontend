import React, { useContext, useState } from "react";
import styles from "./MenuCard.module.scss";
import Loader from "react-loader-spinner";
import { Context } from "../../../store";
import { addToCart } from "../../../requests/CartRequest";

const MenuCard = ({ name, defaultPrice, pizzaImg, pizzId }) => {
  const { dispatch } = useContext(Context);
  const cartId =
    localStorage.getItem("cartId") && localStorage.getItem("cartId");
  const price = defaultPrice;
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(price);
  const [sizeValue, setSizeValue] = useState("S");
  const sizes = {
    L: 2.0,
    M: 1.5,
    S: 1,
  };
  const [buttonText, setButtonText] = useState("add to cart");
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = (type) => {
    if (type.toLowerCase() === "add") {
      getTotal(price, parseInt(quantity) + 1, sizes[sizeValue]);
      setQuantity((quantity) => parseInt(quantity) + 1);
    } else {
      getTotal(price, parseInt(quantity) - 1, sizes[sizeValue]);
      setQuantity((quantity) => parseInt(quantity) - 1);
    }
  };

  const handleSizeChange = (e) => {
    const choice = e.target.value;
    setSizeValue(choice);
    getTotal(price, quantity, sizes[sizeValue]);
  };

  const getTotal = (amount, qty, size) => {
    const total = (amount * qty * size).toFixed(2);

    setTotal(total);
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    const itemToAdd = {
      cart_id: cartId,
      quantity,
      size: sizeValue,
      price: parseFloat(total),
    };

    const response = await addToCart(dispatch, pizzId, itemToAdd);
    if (response.status === 200) {
      setIsLoading(false);
      setButtonText(response.message);
    } else if (response.status === 409) {
      setIsLoading(false);
      setButtonText(response.message);
    }
  };

  return (
    <div className={styles.MenuCard}>
      <div>
        <img src={pizzaImg} alt="Pizza" className={styles.MenuCardImage} />
      </div>
      <section className={styles.MenuCardDetails}>
        <h1 className={styles.MenuCardTitle}>{name}</h1>
        <div className={styles.MenuCardInputContainer}>
          <label className={styles.label}>size</label>
          <select defaultValue={sizes[sizeValue]} onChange={handleSizeChange}>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
          </select>
        </div>
        <div className={styles.MenuCardInputContainer}>
          <label className={styles.label}>quantity</label>
          <div className={styles.quantityContainer}>
            <button
              onClick={() => handleButtonClick("subtract")}
              disabled={quantity === 1}
            >
              -
            </button>
            <input
              type="text"
              pattern="[0-9]*"
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
            />
            <button onClick={() => handleButtonClick("add")}>+</button>
          </div>
          <div className={styles.MenuCardInputContainer}>
            <label className={styles.label}>amount</label>
            <label className={styles.amount}>{total}</label>
          </div>
        </div>
      </section>
      <button
        className={styles.AddToCartBtn}
        onClick={handleAddToCart}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader color="#fff" type="TailSpin" width="20" height="20" />
        ) : (
          buttonText
        )}
      </button>
    </div>
  );
};

export default MenuCard;
