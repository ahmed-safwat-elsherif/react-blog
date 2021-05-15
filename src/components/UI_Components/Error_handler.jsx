import React from "react";
const ErrorHandler = ({ errMsg }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "70vh" }}
    >
      <div className="text-danger">{errMsg}</div>;
    </div>
  );
};

export default ErrorHandler;
