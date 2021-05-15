import React from "react";
import { Link } from "react-router-dom";
import Category from "./Category";
const BlogCard = ({ blog }) => {
  console.log(blog);
  return (
    <div className="post post-card">
      <div className="post-card__image">
        <Link to={`/blogs/${blog._id}`}>
          <img
            src="https://noonpost.netlify.app/html/template/assets/img/blog/21.jpg"
            alt="blog image"
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
        <p className="post-card__description">{blog.body}</p>
      </div>
      <div className="post-card__info">
        <ul className="list-flex">
          {blog.userId._id ? (
            <>
              <li className="list-flex__item avatar">
                <Link to={`/profile/${blog.userId._id}`}>
                  <img
                    src="assets/img/avatar.png"
                    alt="avatar"
                    className="image"
                  />
                </Link>
              </li>
              <li className="list-flex__item user-name">
                <Link to={`/profile/${blog.userId._id}`}>
                  {blog.userId.firstname} {blog.userId.lastname}
                </Link>
              </li>
            </>
          ) : (
            ""
          )}
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
