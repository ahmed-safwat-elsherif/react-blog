import React from "react";
import { Link } from "react-router-dom";
const Category = ({ name }) => {
  return (
    <>
      <Link to={`/category/${name}`} className="categorie">
        {name}
      </Link>
    </>
  );
};

export default Category;
