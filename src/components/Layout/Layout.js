import React, { useState } from "react";
import styles from "./Layout.module.css";
import axios from "axios";
import Header from "../Header/Header";
import SideDrawer from "../SideDrawer/SideDrawer";

const Layout = () => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);
  axios
    .get("http://localhost:8000/api/v1/order/4")
    .then((res) => console.log(">>>>", res.data));

  return (
    <div className={styles.Layout}>
      <Header onOpen={toggle} />
      <SideDrawer show={show} onClose={toggle} />
      <h4>main</h4>
      <h4>footer</h4>
    </div>
  );
};

export default Layout;
