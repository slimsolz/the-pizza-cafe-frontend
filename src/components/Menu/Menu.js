import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import Layout from "../Layout/Layout";
import styles from "./Menu.module.scss";
import MenuCard from "./MenuCard/MenuCard";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "pizza",
    })
      .then((res) => {
        const { data } = res;
        setMenu(data);
      })
      .catch((err) => console.log(err.response));
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("cartId")) {
      const cartItems = JSON.parse(localStorage.getItem("cart_item"));
      axios({
        method: "get",
        url: "cart/uniqueId",
      })
        .then((res) => {
          localStorage.setItem("cartId", res.data);
          cartItems.push([res.data]);
          localStorage.setItem("cart_items", JSON.stringify([...cartItems]));
        })
        .catch((err) => console.log(err.response));
    }
  });

  const menuList = menu.map((mu) => {
    const {
      id,
      name,
      photo: { image_url },
      price,
    } = mu;
    return (
      <MenuCard
        key={id}
        pizzId={id}
        name={name}
        defaultPrice={price}
        pizzaImg={image_url}
      />
    );
  });

  return (
    <Layout>
      <div className={styles.MenuContainer}>{menuList}</div>
    </Layout>
  );
};

export default Menu;
