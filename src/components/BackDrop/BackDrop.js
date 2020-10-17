import React from "react";
import styles from "./BackDrop.module.scss";

const BackDrop = ({ show, close }) =>
  show ? <div onClick={close} className={styles.BackDrop}></div> : null;

export default BackDrop;
