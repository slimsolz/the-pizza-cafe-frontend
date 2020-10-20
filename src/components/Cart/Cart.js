import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import styles from "./Cart.module.scss";
import CartItem from "./CartItem/CartItem";
import { Context } from "../../store";
import { getTotalAmountInCart } from "../../requests/CartRequest";
import { FormInputContainer } from "../FormInputContainer/FormInputContainer";
import { validateCheckout } from "../../utils/validationRules";
import FormButton from "../FormButton/FormButton";
import useForm from "../../utils/useForm";
import { checkout } from "../../requests/OrderRequest";
import Swal from "sweetalert2";
import { BiDollar, BiEuro } from "react-icons/bi";

const DELIVERY_FEE = 1.99;
const EXCHANGE_RATE = 0.85;

const Cart = () => {
  const { state, dispatch } = useContext(Context);
  const loggedInUser =
    JSON.parse(localStorage.getItem("user")) &&
    JSON.parse(localStorage.getItem("user"));

  const cart_items =
    JSON.parse(localStorage.getItem("cart_items")) &&
    JSON.parse(localStorage.getItem("cart_items"));

  const [totalAmountInCart, setTotalAmountInCart] = useState(0.0);
  const [proceed, setProceed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const cart_id = cart_items && cart_items[0] && cart_items[0].cart_id;
  const currency =
    localStorage.getItem("currency") && localStorage.getItem("currency");

  const exRate = currency === "dollar" ? 1 : EXCHANGE_RATE;

  const onCheckout = async () => {
    setIsLoading(true);
    const payload = {
      cart_id: cart_items[0].cart_id,
      currency: currency,
      delivery_fee: DELIVERY_FEE,
      delivery_address: values.address,
      sub_total: totalAmountInCart,
      zip_code: parseInt(values.zipCode),
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone_number: values.phone,
    };

    const response = await checkout(dispatch, payload);
    if (response.success) {
      setIsLoading(false);
      Swal.fire({
        title: "Success!",
        text: `${response.message}`,
        icon: "success",
        confirmButtonColor: "#89c35c",
      }).then((result) => {
        const userInfo = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");
        localStorage.clear();
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userInfo));
        window.location.replace("/menu");
      });
    } else {
      setIsLoading(false);
    }
  };

  const user = {
    firstName: loggedInUser && loggedInUser.first_name,
    lastName: loggedInUser && loggedInUser.last_name,
    email: loggedInUser && loggedInUser.email,
    phone: loggedInUser && loggedInUser.phone_number,
    address: loggedInUser && loggedInUser.address,
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    onCheckout,
    validateCheckout,
    user
  );

  const cards =
    cart_items &&
    cart_items.map((cartItem) => {
      const { cart_id, id, price, quantity, size, pizza } = cartItem;
      const {
        name,
        photo: { image_url },
        id: pizza_id,
      } = pizza[0];

      return (
        <CartItem
          sizeValue={size}
          price={price}
          itemId={id}
          key={id}
          defaultQuantity={quantity}
          pizzaImg={image_url}
          name={name}
          pizzaId={pizza_id}
          cartId={cart_id}
        />
      );
    });

  useEffect(() => {
    getTotalAmountInCart(dispatch, cart_id).then((res) =>
      setTotalAmountInCart(res.total)
    );
  }, [state.Cart.carts]);

  return (
    <Layout title="cart">
      <div className={styles.Cart}>
        {cards}
        <div className={styles.CartTotalContainer}>
          <h1 className={styles.total}>
            Sub Total:{" "}
            {(totalAmountInCart && totalAmountInCart.toFixed(2)) || 0}
          </h1>
          <h1 className={styles.total}>
            Delivery Fee: {totalAmountInCart ? DELIVERY_FEE : 0}
          </h1>
          <h1 className={styles.total}>
            Total({exRate === 1 ? <BiDollar /> : <BiEuro />}):{" "}
            {!isNaN(((totalAmountInCart + DELIVERY_FEE) * exRate).toFixed(2))
              ? ((totalAmountInCart + DELIVERY_FEE) * exRate).toFixed(2)
              : 0}
          </h1>

          <button
            onClick={() => setProceed(!proceed)}
            className={styles.checkout}
          >
            Proceed to checkout
          </button>
        </div>
        <div
          className={
            !proceed ? `${styles.proceedToCheckout}` : `${styles.checkoutDiv}`
          }
        >
          <h1 className={styles.heading}>
            Provide the following information to complete your order
          </h1>
          <form onSubmit={handleSubmit}>
            <FormInputContainer
              name="firstName"
              inputName="first name"
              inputType="text"
              inputValue={values.firstName}
              errorName={errors.firstName}
              placeholderText="First name"
              change={handleChange}
              isRequired
            />

            <FormInputContainer
              name="lastName"
              inputName="last name"
              inputType="text"
              inputValue={values.lastName}
              errorName={errors.lastName}
              placeholderText="Last name"
              change={handleChange}
              isRequired
            />

            <FormInputContainer
              name="email"
              inputName="email"
              inputType="email"
              inputValue={values.email}
              errorName={errors.email}
              placeholderText="Email address"
              change={handleChange}
              isRequired
            />

            <FormInputContainer
              name="phone"
              inputName="Phone number"
              inputType="text"
              inputValue={values.phone}
              errorName={errors.phone}
              placeholderText="Phone number"
              change={handleChange}
              isRequired
            />

            <FormInputContainer
              name="zipCode"
              inputName="Zip Code"
              inputType="text"
              inputValue={values.zipCode}
              errorName={errors.zipCode}
              placeholderText="Zip code"
              change={handleChange}
              isRequired
            />

            <FormInputContainer
              name="address"
              inputName="Address"
              inputType="text"
              inputValue={values.address}
              errorName={errors.address}
              placeholderText="Address"
              change={handleChange}
              isRequired
            />

            <FormButton
              name="checkout"
              isLoading={isLoading}
              buttonColor="orange"
              textColor="#fff"
              loaderType="TailSpin"
              loaderColor="white"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
