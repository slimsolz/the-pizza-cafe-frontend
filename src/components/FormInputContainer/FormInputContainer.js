import React from "react";
import styles from "./FormInputContainer.module.scss";

export const FormInputContainer = ({
  name,
  inputName,
  inputType,
  inputValue,
  errorName,
  placeholderText,
  change,
  isRequired,
}) => {
  return (
    <div className={styles.FormContainer}>
      <label htmlFor={name} className={styles.FormLabel}>
        {/* {inputName} */}
      </label>
      <input
        className={`${styles.FormInput} ${errorName && `${styles.isError}`}`}
        type={inputType}
        name={name}
        id={name}
        value={inputValue || ""}
        onChange={change}
        placeholder={placeholderText}
        required={isRequired}
      />
      {errorName && <p className={styles.help}>{errorName}</p>}
    </div>
  );
};
