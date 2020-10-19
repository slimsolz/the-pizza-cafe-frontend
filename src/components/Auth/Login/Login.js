import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../utils/axios";
import useForm from "../../../utils/useForm";
import { validateLogin } from "../../../utils/validationRules";
import FormButton from "../../FormButton/FormButton";
import { FormInputContainer } from "../../FormInputContainer/FormInputContainer";
import Layout from "../../Layout/Layout";
import styles from "./Login.module.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import setAuthToken from "../../../utils/AuthTokenUtil";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onHandleLogin = (e) => {
    setIsLoading(true);
    const payload = {
      email: values.email,
      password: values.password,
    };
    axios({
      method: "post",
      url: "auth/login",
      data: payload,
    })
      .then((response) => {
        setIsLoading(false);
        const { data } = response;
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify({ ...data.data }));
        setAuthToken(data.token);
        toast(`${data.message}`);
        setTimeout(() => {
          window.location.replace("/menu");
        }, 5000);
      })
      .catch((err) => {
        setIsLoading(false);
        const { data } = err.response;
        setErrorMessage(data.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      });
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    onHandleLogin,
    validateLogin
  );

  return (
    <Layout title="login">
      <div className={styles.LoginContainer}>
        <form onSubmit={handleSubmit}>
          <FormInputContainer
            name="email"
            inputName="email"
            inputType="text"
            inputValue={values.email}
            errorName={errors.email}
            placeholderText="Email address"
            change={handleChange}
            isRequired
          />

          <FormInputContainer
            name="password"
            inputName="password"
            inputType="password"
            inputValue={values.password}
            errorName={errors.password}
            placeholderText="Password"
            change={handleChange}
            isRequired
          />

          {errorMessage && (
            <h1 className={styles.errorMessage}>{errorMessage}</h1>
          )}

          <FormButton
            name="login"
            isLoading={isLoading}
            buttonColor="orange"
            textColor="#fff"
            loaderType="TailSpin"
            loaderColor="white"
          />

          <h1 className={styles.links}>
            Don't have an account?{" "}
            <Link to="/register" className={styles.registerLink}>
              Register here
            </Link>
          </h1>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
