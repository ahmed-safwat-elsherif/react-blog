import React from "react";
import { Link } from "react-router-dom";
const Category = ({ name }) => {
  return (
    <>
      <Link to={`/category/${name}`} className="categorie mx-2">
        {name}
      </Link>
    </>
  );
};

export default Category;
