import React from "react";
import styles from "./SideDrawer.module.scss";
import BackDrop from "../BackDrop/BackDrop";
import SearchBar from "../SearchBar/SearchBar";

const SideDrawer = ({ show, onClose }) => {
  // const path = window.location.pathname;

  return (
    <>
      <BackDrop show={show} close={onClose} />
      <div
        className={`${styles.SideDrawer} ${
          show ? styles.SideDrawerOpen : styles.SideDrawerHide
        }`}
      >
        <h1 className={styles.SideDrawer__logo}>
          {" "}
          The Pizza Cafe{" "}
          <span role="img" aria-label="pizza">
            {" "}
            🍕
          </span>
        </h1>
        <div className={styles.SideDrawer__search}>
          <SearchBar />
        </div>
        <nav className={styles.SideDrawer__nav}>
          <div className={styles.SideDrawer__navItem}>
            {/* <Link> */}
            menu
            {/* </Link> */}
          </div>

          <div className={styles.SideDrawer__navItem}>
            {/* <Link> */}
            logout
            {/* </Link> */}
          </div>
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
