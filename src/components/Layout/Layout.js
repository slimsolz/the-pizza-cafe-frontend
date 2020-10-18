import React, { useState } from "react";
import styles from "./Layout.module.scss";
import axios from "axios";
import Header from "../Header/Header";
import SideDrawer from "../SideDrawer/SideDrawer";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);
  axios
    .get("http://localhost:8000/api/v1/order/4")
    .then((res) => console.log(">>>>", res.data));

  return (
    <div className={styles.Layout}>
      <Header onOpen={toggle} />
      <SideDrawer show={show} onClose={toggle} />
      <main className={styles.Layout__main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
