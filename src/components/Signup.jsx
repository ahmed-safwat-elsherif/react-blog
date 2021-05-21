import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "../actions/Auth.actions";
import { validate } from "./validator/validator";

const notifyError = (errMsg) => toast.error(errMsg);

const Signup = ({ errMsg, isAuthenticated, user, isLoading, ...props }) => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const setInput = (setter) => (event) => setter(event.currentTarget.value);

  if (errMsg && !user && !isLoading) {
    notifyError(errMsg);
  }

  const registerUser = () => {
    const errs = validate({
      email,
      firstname,
      lastname,
      password,
      confirmPassword,
    });
    if (errs) {
      for (const key in errs) {
        notifyError(errs[key]);
      }
      return;
    }
    props.onAuth({ email, firstname, lastname, password }, true);
  };
  if (isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <div
        style={{ overflow: "hidden", marginTop: "10rem", width: "20rem" }}
        className="widget newslettre-form  mx-auto text-center register edit-form "
      >
        <h4 className="text-left sign-title">Signup</h4>
        <div id="RegForm" style={{ width: "100%" }}>
          <div className="form-flex mb-2">
            <div className="form-group">
              <input
                className="w-100"
                type="text"
                placeholder="Email"
                name="email"
                id="email"
                value={email}
                onInput={setInput(setEmail)}
              />
            </div>
          </div>

          <div className="form-flex mb-2">
            <div className="form-group">
              <input
                className="w-100"
                type="text"
                placeholder="Firstname"
                name="firstname"
                id="firstname"
                value={firstname}
                onInput={setInput(setFirstname)}
              />
            </div>
          </div>

          <div className="form-flex mb-2">
            <div className="form-group">
              <input
                className="w-100"
                type="text"
                placeholder="Lastname"
                name="lastname"
                id="lastname"
                value={lastname}
                onInput={setInput(setLastname)}
              />
            </div>
          </div>

          <div className="form-flex mb-2">
            <div className="form-group">
              <input
                className="w-100"
                type="password"
                placeholder="Password"
                name="password"
                id="password"
                value={password}
                onInput={setInput(setPassword)}
              />
            </div>
          </div>

          <div className="form-flex mb-2">
            <div className="form-group">
              <input
                className="w-100"
                type="password"
                placeholder="Confirm Password"
                name="password"
                id="confirm-password"
                value={confirmPassword}
                onInput={setInput(setConfirmPassword)}
              />
            </div>
          </div>
          <div className="form-flex mb-2">
            <div className="form-group">
              <button
                onClick={registerUser}
                disabled={isLoading}
                className="btn-custom justify-content-center w-100"
              >
                {isLoading ? (
                  <div className="d-flex justify-content-center">
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  "Register"
                )}
              </button>
              <hr />
            </div>
          </div>
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

const mapStateToProps = (state) => {
  const { errMsg, token, user, isLoading, isAuthenticated } = state.auth;

  return {
    errMsg,
    token,
    user,
    isLoading,
    isAuthenticated,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
