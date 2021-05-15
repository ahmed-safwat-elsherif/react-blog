import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "../actions/Auth.actions";
import { validate } from "./validator/validator";
const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");

  let regBtn = useRef();
  const setInput = (setter) => (event) => setter(event.currentTarget.value);

  const notifyError = () =>
    toast.error("The entered registration field(s) not valid");
  const notifySuccess = () => toast.success("Registered successfully");
  const registerUser = () => {
    const errs = validate({
      email,
      firstname,
      lastname,
      password,
      confirmPassword,
    });
    setErrors(errs);
    if (errs) {
      notifyError();
      return;
    }
    console.log(props);
    props.onAuth({ email, firstname, lastname, password }, true);
    // props.postSignup({ email, firstname, lastname, password });
    // history.push("/login");
    // regBtn.current.disabled = true;
    notifySuccess();
  };

  return (
    <>
      <div
        style={{ overflow: "hidden", marginTop: "10rem", width: "20rem" }}
        className="widget newslettre-form  mx-auto text-center register d-flex flex-nowrap"
      >
        <div id="RegForm" style={{ width: "100%" }}>
          <div className="form-flex mb-2">
            <div className="form-group">
              <input
                type="text"
                placeholder="Email"
                name="email"
                id="email"
                value={email}
                onInput={setInput(setEmail)}
              />
              <span className="d-block text-danger">{errors?.email}</span>
            </div>
          </div>

          <div className="form-flex mb-2">
            <div className="form-group">
              <input
                type="text"
                placeholder="Firstname"
                name="firstname"
                id="firstname"
                value={firstname}
                onInput={setInput(setFirstname)}
              />
              <span className="d-block text-danger">{errors?.firstname}</span>
            </div>
          </div>

          <div className="form-flex mb-2">
            <div className="form-group">
              <input
                type="text"
                placeholder="Lastname"
                name="lastname"
                id="lastname"
                value={lastname}
                onInput={setInput(setLastname)}
              />
              <span className="d-block text-danger">{errors?.lastname}</span>
            </div>
          </div>

          <div className="form-flex mb-2">
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                id="password"
                value={password}
                onInput={setInput(setPassword)}
              />
              <span className="d-block text-danger">{errors?.password}</span>
            </div>
          </div>

          <div className="form-flex mb-2">
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                name="password"
                id="confirm-password"
                value={confirmPassword}
                onInput={setInput(setConfirmPassword)}
              />
              <span className="d-block text-danger">
                {errors?.confirmPassword}
              </span>
            </div>
          </div>

          <button ref={regBtn} onClick={registerUser} className="btn-custom">
            Register
          </button>
          <hr />
          <Link to="/login">Already have account?</Link>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (userData, isSignup) => dispatch(auth(userData, isSignup)),
  };
};

const mapStateToProps = (state, props) => {
  console.log(state);
  const { errMsg, token, user, isLoading } = state.auth;

  return {
    errMsg,
    token,
    user,
    isLoading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
