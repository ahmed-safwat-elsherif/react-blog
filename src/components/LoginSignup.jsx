import React, { useRef, useState } from "react";
import Joi from "joi";
import { ToastContainer, toast } from "react-toastify";
const schema = Joi.object({
  firstname: Joi.string().alphanum().required(),
  lastname: Joi.string().alphanum().required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),

  confirmPassword: Joi.ref("password"),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "eg", "edu"] },
    })
    .required(),
});

const LoginSignup = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let regBtn = useRef();
  const setInput = (setter) => (event) => setter(event.currentTarget.value);

  function register() {
    document.getElementById("RegForm").style.transform = "translateX(0px)";
    document.getElementById("LoginForm").style.transform = "translateX(0px)";
    document.getElementById("Indicator").style.transform = "translateX(100px)";
  }

  function login() {
    document.getElementById("RegForm").style.transform = "translateX(300px)";
    document.getElementById("LoginForm").style.transform = "translateX(300px)";
    document.getElementById("Indicator").style.transform = "translateX(0px)";
  }

  const notifyError = () =>
    toast.error("The entered registration field(s) not valid");
  const notifySuccess = () => toast.success("Registered successfully");
  const registerUser = () => {
    const { error, value } = schema.validate({
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
    });
    console.log({ error, value });
    if (error) {
      notifyError();
      return;
    }

    notifySuccess();
  };

  return (
    <>
      <div
        style={{ overflow: "hidden", marginTop: "10rem", width: "20rem" }}
        className="widget newslettre-form  mx-auto text-center register d-flex flex-nowrap"
      >
        <div id="RegForm">
          <div className="form-flex mb-2">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                name="email"
                id="email"
                value={email}
                onInput={setInput(setEmail)}
              />
            </div>
            <div
              id="Indicator"
              style={{ cursor: "default", width: "50px" }}
              className="d-flex justify-content-center align-items-center submit-btn btn-custom"
            >
              <i className="fas fa-user-alt"></i>
            </div>
          </div>

          <div className="form-flex mb-2">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Firstname"
                name="firstname"
                id="firstname"
                value={firstname}
                onInput={setInput(setFirstname)}
              />
            </div>
            <div
              id="Indicator"
              style={{ cursor: "default", width: "50px" }}
              className="d-flex justify-content-center align-items-center submit-btn btn-custom"
            >
              <i className="fas fa-user-alt"></i>
            </div>
          </div>

          <div className="form-flex mb-2">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Lastname"
                name="lastname"
                id="lastname"
                value={lastname}
                onInput={setInput(setLastname)}
              />
            </div>
            <div
              id="Indicator"
              style={{ cursor: "default", width: "50px" }}
              className="d-flex justify-content-center align-items-center submit-btn btn-custom"
            >
              <i className="fas fa-user-alt"></i>
            </div>
          </div>

          <div className="form-flex mb-2">
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                id="password"
                value={password}
                onInput={setInput(setPassword)}
              />
            </div>
            <div
              id="Indicator"
              style={{ cursor: "default", width: "50px" }}
              className="d-flex justify-content-center align-items-center submit-btn btn-custom"
            >
              <i className="fas fa-key"></i>
            </div>
          </div>

          <div className="form-flex mb-2">
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                name="password"
                id="password"
                value={confirmPassword}
                onInput={setInput(setConfirmPassword)}
              />
            </div>
            <div
              id="Indicator"
              style={{ cursor: "default", width: "50px" }}
              className="d-flex justify-content-center align-items-center submit-btn btn-custom"
            >
              <i className="fas fa-key"></i>
            </div>
          </div>

          <button ref={regBtn} onClick={registerUser} className="btn-custom">
            Register
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginSignup;
