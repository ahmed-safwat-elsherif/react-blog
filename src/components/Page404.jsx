import React from "react";
import { Link } from "react-router-dom";
const Page404 = () => {
  return (
    <div
      style={{
        marginTop: "20vh",
        position: "relative",
      }}
      className="widget text-center w-75 mx-auto"
    >
      <h1
        style={{
          fontSize: "600%",
        }}
      >
        404
      </h1>
      <i
        style={{
          marginBottom: "20px",
          fontSize: "100px",
          color: "#4b778d",
        }}
        className="fas fa-grin-beam-sweat"
      ></i>

      <h3>Page Not Found.</h3>
      <p>It looks like nothing was found at this location.</p>
      <Link to="/" className="btn-custom">
        Back to home
      </Link>
    </div>
  );
};

export default Page404;
