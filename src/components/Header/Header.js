import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../store";
import styles from "./Header.module.scss";
import {
  FaBars,
  FaDollarSign,
  FaUserCircle,
  FaShoppingCart,
} from "react-icons/fa";
import { isLoggedIn } from "../../utils/isLoggedIn";
import { Link } from "react-router-dom";
import { viewCart } from "../../requests/CartRequest";

const Header = ({ onOpen }) => {
  const { state, dispatch } = useContext(Context);
  const user =
    JSON.parse(localStorage.getItem("user")) &&
    JSON.parse(localStorage.getItem("user")).first_name;

  const cartDetails =
    JSON.parse(localStorage.getItem("cart_items")) &&
    JSON.parse(localStorage.getItem("cart_items"));

  useEffect(() => {
    if (localStorage.getItem("cartId")) {
      const cartId = localStorage.getItem("cartId");
      viewCart(dispatch, cartId);
    }
    if (!localStorage.getItem("currency")) {
      localStorage.setItem("currency", "dollar");
    }
  }, [state.Cart.cart]);

  return (
    <header className={styles.Header}>
      <div className={styles.Header__menuIcon}>
        <FaBars onClick={onOpen} size={30} color="#000" />
      </div>
      <h1 className={styles.Header__Logo}>
        The Pizza Cafe{" "}
        <span role="img" aria-label="pizza">
          🍕
        </span>
      </h1>

      <nav className={styles.Header__nav}>
        <div className={styles.Header__menu}>
          <Link to="/menu" className={styles.Header__LoginLink}>
            menu
          </Link>
        </div>
        <div className={styles.Header__loginDiv}>
          {isLoggedIn() ? (
            <span className={styles.Header__userNameContainer}>
              <span className={styles.Header__userName}>{`Hi ${user}`}</span>
              <span className={styles.Header__userName}>
                Not you?{" "}
                <Link to="/signout" className={styles.Header__signOutLink}>
                  SIGN OUT
                </Link>
              </span>
            </span>
          ) : (
            <span className={styles.Header__login}>
              <Link to="/login" className={styles.Header__LoginLink}>
                Login
              </Link>
            </span>
          )}
          <FaUserCircle />
        </div>
        <div className={`${styles.Header__navItem} ${styles.Header__cart}`}>
          <Link to="/cart" className={styles.Header__cartLink}>
            <FaShoppingCart />
          </Link>
          <span className={styles.Header__navItemBadge}>
            {cartDetails && cartDetails.length}
          </span>
        </div>
        <div className={styles.Header__navItem}>
          <FaDollarSign />
        </div>
      </nav>
    </header>
  );
};

export default Header;
