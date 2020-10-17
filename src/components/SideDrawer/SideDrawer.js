import React from "react";
import styles from "./SideDrawer.module.scss";
import BackDrop from "../BackDrop/BackDrop";
// import SearchBar from "../../SearchBar/SearchBar";
import { GrCart } from "react-icons/gr";
import { MdHome } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

const SideDrawer = ({ show, onClose }) => {
  const path = window.location.pathname;

  return (
    <>
      <BackDrop show={show} close={onClose} />
      <div
        className={`${styles.SideDrawer} ${
          show ? styles.SideDrawerOpen : styles.SideDrawerHide
        }`}
      >
        {/* <div className={styles.SideDrawer__search}> */}
        {/* <SearchBar /> */}
        {/* </div> */}
      </div>
    </>
  );
};

export default SideDrawer;
