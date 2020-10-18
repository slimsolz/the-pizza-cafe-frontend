import React from "react";
import styles from "./Header.module.scss";
import { FaBars, FaDollarSign, FaUserCircle, FaShoppingCart } from "react-icons/fa";

const Header = ({ onOpen }) => {
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
        <div className={styles.Header__menu}>menu</div>
        <div className={styles.Header__loginDiv}>
          <span className={styles.Header__login}>Login</span>
          <FaUserCircle />
        </div>
        <div className={`${styles.Header__navItem} ${styles.Header__cart}`}>
          <FaShoppingCart />
          <span className={styles.Header__navItemBadge}>4</span>
        </div>
        <div className={styles.Header__navItem}>
          <FaDollarSign />
        </div>
      </nav>
    </header>
  );
};

export default Header;
