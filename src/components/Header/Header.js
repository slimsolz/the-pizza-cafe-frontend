import React from "react";
import styles from "./Header.module.scss";
import {
  FaBars,
  FaDollarSign,
  FaUserCircle,
  FaShoppingCart,
} from "react-icons/fa";
import { isLoggedIn } from "../../utils/isLoggedIn";
import { Link } from "react-router-dom";

const Header = ({ onOpen }) => {
  const user =
    JSON.parse(localStorage.getItem("user")) &&
    JSON.parse(localStorage.getItem("user")).first_name;

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
          {isLoggedIn() ? (
            <span className={styles.Header__userNameContainer}>
              <span className={styles.Header__userName}>{`Hi ${user}`}</span>
              <span className={styles.Header__userName}>
                Not you?{" "}
                <Link className={styles.Header__signOutLink}>SIGN OUT</Link>
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
