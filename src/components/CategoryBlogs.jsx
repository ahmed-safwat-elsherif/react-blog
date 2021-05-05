import React from "react";
import Category from "./Category";
const CategoryBlogs = (props) => {
  let { name } = props.match.params;
  return (
    <>
      <h2>
        Category: <span>{name}</span>
      </h2>
      <Category name={name} />
    </>
  );
};

export default CategoryBlogs;
