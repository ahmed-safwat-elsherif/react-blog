import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getProfile } from "./../actions/profile.action";
import { auth } from "./../actions/Auth.actions";

const notifyError = (errMsg) => toast.error(errMsg);

const Login = ({
  isLoading,
  onAuth,
  isLoggedIn,
  dispatch,
  isAuthenticated,
  ...props
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {}, []);

  const setInput = (setter) => (event) => setter(event.currentTarget.value);

  const registerUser = async () => {
    if (email.trim().length && password.trim().length) {
      await props.auth({ email, password }, false);
    } else {
      notifyError("Email and password are required");
    }
  };
  if (isLoggedIn) {
    return <Redirect to={`/profile/${props.profile._id}`} />;
  }
  return (
    <>
      <div
        style={{ overflow: "hidden", marginTop: "10rem", width: "20rem" }}
        className="widget newslettre-form  mx-auto text-center register edit-form "
      >
        <h4 className="text-left sign-title">Login</h4>
        <div id="RegForm" style={{ width: "100%" }}>
          {props.errMsg && (
            <div className="text-danger">
              {props.errMsg !== "Email is exist" ? props.errMsg : ""}
            </div>
          )}
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
                  "Login"
                )}
              </button>
            </div>
          </div>
          <hr />
          {!isAuthenticated && <Link to="/signup">I don't have account</Link>}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

const mapStateToProps = (state) => {
  const { isLoading, isAuthenticated, errMsg, token } = state.auth;
  const { profile } = state.profile;
  const { isLoggedIn } = state.profile;
  return {
    errMsg,
    isLoading,
    token,
    isAuthenticated,
    profile,
    isLoggedIn,
  };
};

export default connect(mapStateToProps, { getProfile, auth })(Login);
