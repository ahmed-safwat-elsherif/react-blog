import React from "react";
import Category from "./Category";
import { Link } from "react-router-dom";
const CategoryBlogs = (props) => {
  let { name } = props.match.params;
  return (
    <>
      <h2>
        Category: <span>{name}</span>
      </h2>
      <Category name={name} />
      <div
        style={{
          marginTop: "20vh",
          position: "relative",
        }}
        className="widget text-center w-75 mx-auto"
      >
        <i
          style={{
            marginBottom: "20px",
            fontSize: "100px",
            color: "#4b778d",
          }}
          className="fas fa-grin-beam-sweat"
        ></i>

        <h3>This page is under fixing, please comeback later</h3>
        <Link to="/blogs" className="btn-custom">
          Back to blogs
        </Link>
      </div>
    </>
  );
};

export default CategoryBlogs;
