import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useForm from "../../../utils/useForm";
import validate from "../../../utils/validationRules";
import FormButton from "../../FormButton/FormButton";
import { FormInputContainer } from "../../FormInputContainer/FormInputContainer";
import Layout from "../../Layout/Layout";
import styles from "./Login.module.scss";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onHandleSubmit = (e) => {
    setIsLoading(true);
    console.log(values);
  };
  const { values, errors, handleChange, handleSubmit } = useForm(
    onHandleSubmit,
    validate
  );

  return (
    <Layout>
      <div className={styles.LoginContainer}>
        <form onSubmit={handleSubmit}>
          <FormInputContainer
            name="email"
            inputType="text"
            inputValue={values.email}
            errorName={errors.email}
            placeholderText="Email address"
            change={handleChange}
            isRequired
          />

          <FormInputContainer
            name="password"
            inputType="password"
            inputValue={values.password}
            errorName={errors.password}
            placeholderText="Password"
            change={handleChange}
            isRequired
          />

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
