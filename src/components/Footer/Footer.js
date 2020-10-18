import React from "react";
import styles from "./Footer.module.scss";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <div className={styles.Footer__social}>
        <FaFacebook />
        <FaTwitter />
        <FaInstagram />
      </div>
      <h2 className={styles.Footer__copyright}>
        copyright &copy; {new Date().getFullYear()} the pizza cafe
      </h2>
    </footer>
  );
};

export default Footer;
