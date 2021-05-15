import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getProfile } from "./../actions/profile.action";
import { auth } from "./../actions/Auth.actions";

const notifyError = (errMsg) => toast.error(errMsg);

const Login = ({ onAuth, isAuthenticated, dispatch, ...props }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {}, []);
  let regBtn = useRef();
  const setInput = (setter) => (event) => setter(event.currentTarget.value);

  const registerUser = async () => {
    console.log("Submitted");
    if (email.trim().length && password.trim().length) {
      await props.auth({ email, password }, false);
    } else {
      notifyError("Email and password are required");
    }
  };
  if (isAuthenticated) {
    return <Redirect to={`/profile/${props.user._id}`} />;
  }
  return (
    <>
      <div
        style={{ overflow: "hidden", marginTop: "10rem", width: "20rem" }}
        className="widget newslettre-form  mx-auto text-center register d-flex flex-nowrap"
      >
        <div id="RegForm" style={{ width: "100%" }}>
          {props.errMsg && <div className="text-danger">{props.errMsg}</div>}
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
            </div>
          </div>
          <div className="form-flex mb-2">
            <div className="form-group">
              <input
                // type="password"
                placeholder="Password"
                name="password"
                id="password"
                value={password}
                onInput={setInput(setPassword)}
              />
            </div>
          </div>
          <button ref={regBtn} onClick={registerUser} className="btn-custom">
            Register
          </button>
          <hr />
          <Link to="/signup">I don't have account</Link>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  const { isAuthenticated, errMsg, token, user, isLoading } = state.auth;

  return {
    errMsg,
    token,
    user,
    isLoading,
    isAuthenticated,
  };
};

export default connect(mapStateToProps, { getProfile, auth })(Login);
