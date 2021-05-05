import React from "react";
import { Link } from "react-router-dom";
import Category from "./Category";
const BlogCard = ({ blog }) => {
  return (
    <div className="post post-card">
      <div className="post-card__image">
        <Link to={`/blogs/${blog._id}`}>
          <img
            src="https://noonpost.netlify.app/html/template/assets/img/blog/21.jpg"
            alt="image"
            className="image"
          />
        </Link>
      </div>
      <div className="post-card__content">
        {blog.tags.map((ctgory, i) => {
          return <Category key={i} name={ctgory} />;
        })}
        <h5 className="post-card__title">
          <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
        </h5>
        <p className="post-card__description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quam
          atque ipsa laborum sunt distinctio...
        </p>
      </div>
      <div className="post-card__info">
        <ul className="list-flex">
          <li className="list-flex__item avatar">
            <a href="#">
              <img src="assets/img/avatar.png" alt="avatar" className="image" />
            </a>
          </li>
          <li className="list-flex__item user-name">
            <a href="#">
              {blog.userId.firstname} {blog.userId.lastname}
            </a>
          </li>
          <li className="dot"></li>
          <li className="list-flex__item">
            {new Date(blog.createdAt).toDateString()}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BlogCard;
