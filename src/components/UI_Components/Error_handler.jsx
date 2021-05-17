import React from "react";
import { Link } from "react-router-dom";
const ErrorHandler = ({ errMsg }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        className="d-flex px-3 justify-content-center align-items-center"
        style={{ height: "30vh" }}
      >
        <h3 className="text-danger">{errMsg}</h3>
      </div>
      <hr />
      <Link to="/home">Back to home</Link>
    </div>
  );
};

export default ErrorHandler;
