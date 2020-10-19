import React, { useState } from "react";
import { Link } from "react-router-dom";
import useForm from "../../../utils/useForm";
import { validateRegister } from "../../../utils/validationRules";
import FormButton from "../../FormButton/FormButton";
import { FormInputContainer } from "../../FormInputContainer/FormInputContainer";
import Layout from "../../Layout/Layout";
import styles from "./Register.module.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../../utils/axios";
import setAuthToken from "../../../utils/AuthTokenUtil";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onHandleRegister = (e) => {
    setIsLoading(true);
    const payload = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password,
      address: values.address,
      phone_number: values.phone,
    };
    axios({
      method: "post",
      url: "auth/register",
      data: payload,
    })
      .then((response) => {
        setIsLoading(false);
        const { data } = response;
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify({ ...data.data }));
        setAuthToken(data.token);
        toast(`${data.message}`);
      })
      .catch((err) => {
        setIsLoading(false);
        const { data } = err.response;
        console.log(data);
      });
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    onHandleRegister,
    validateRegister
  );

  return (
    <Layout>
      <div className={styles.RegisterContainer}>
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
            name="password"
            inputName="password"
            inputType="password"
            inputValue={values.password}
            errorName={errors.password}
            placeholderText="Password"
            change={handleChange}
            isRequired
          />

          <FormInputContainer
            name="confirmPassword"
            inputName="confirm password"
            inputType="password"
            inputValue={values.confirmPassword}
            errorName={errors.confirmPassword}
            placeholderText="Confirm Password"
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
            name="register"
            isLoading={isLoading}
            buttonColor="orange"
            textColor="#fff"
            loaderType="TailSpin"
            loaderColor="white"
          />

          <h1 className={styles.links}>
            Already have an account?{" "}
            <Link to="/login" className={styles.loginLink}>
              Login here
            </Link>
          </h1>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
