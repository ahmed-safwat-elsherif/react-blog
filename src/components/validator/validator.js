import validator from "validator";
export const validate = ({
  email,
  firstname,
  lastname,
  password,
  confirmPassword,
}) => {
  const errors = {};

  if (validator.isEmpty(email)) {
    errors.email = "Email is required";
  } else if (!validator.isEmail(email)) {
    errors.email = "Email is not valid";
  }
  if (validator.isEmpty(firstname)) {
    errors.firstname = "Firstname is required";
  }
  if (validator.isEmpty(lastname)) {
    errors.lastname = "Lastname is required";
  }
  if (validator.isEmpty(password)) {
    errors.password = "Password is required";
  } else if (!validator.isLength(password, { min: 8 })) {
    errors.password =
      "Password is very short, it must be more than 8 characters";
  }
  if (password != confirmPassword && !validator.isEmpty(password)) {
    errors.confirmPassword =
      "Confirm your password correctly, passwords don't match";
  }
  if (!Object.keys(errors).length) {
    return null;
  }
  return errors;
};
