export function validateRegister(values) {
  let errors = {};

  if (!values.email || values.email.trim() === "") {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (
    !/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/i.test(
      values.password
    )
  ) {
    errors.password = "Password is invalid";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  } else if (
    values.confirmPassword &&
    values.password !== values.confirmPassword
  ) {
    errors.confirmPassword = "Passwords don't match";
  }

  if (!values.firstName || values.firstName.trim() === "") {
    errors.firstName = "First name is required";
  } else if (!/[a-zA-Z]/i.test(values.firstName)) {
    errors.firstName = "Must contain only letters";
  }

  if (!values.lastName || values.lastName.trim() === "") {
    errors.lastName = "Last name is required";
  } else if (!/[a-zA-Z]/i.test(values.lastName)) {
    errors.lastName = "Must contain only letters";
  }

  if (!values.phone || values.phone.trim() === "") {
    errors.phone = "Phone number is required";
  } else if (!/[0-9]/i.test(values.phone)) {
    errors.phone = "Must contain be numbers";
  }

  if (!values.address || values.address.trim() === "") {
    errors.address = "Address is required";
  }

  return errors;
}

export function validateLogin(values) {
  let errors = {};
  if (!values.email || values.email.trim() === "") {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (
    !/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/i.test(
      values.password
    )
  ) {
    errors.password = "Password is invalid";
  }

  return errors;
}
