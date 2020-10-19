import React from "react";
import styles from "./FormButton.module.scss";
import Loader from "react-loader-spinner";

const FormButton = ({
  name,
  isLoading,
  buttonColor,
  textColor,
  loaderColor,
  loaderType,
}) => {
  return (
    <button
      type="submit"
      style={{ backgroundColor: `${buttonColor}`, color: `${textColor}` }}
      disabled={isLoading}
      className={`${styles.Button} ${isLoading && `${styles.isDisabled}`}`}
    >
      {isLoading ? (
        <Loader color={loaderColor} type={loaderType} width="20" height="20" />
      ) : (
        name
      )}
    </button>
  );
};

export default FormButton;
