import React, { useState } from "react";
import styles from "./Layout.module.scss";
import Header from "../Header/Header";
import SideDrawer from "../SideDrawer/SideDrawer";
import Footer from "../Footer/Footer";

const Layout = ({ title, children }) => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);

  return (
    <div className={styles.Layout}>
      <Header onOpen={toggle} />
      <SideDrawer show={show} onClose={toggle} />
      <main className={styles.Layout__main}>
        <div className={styles.Layout__title}>
          {title}
        </div>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
