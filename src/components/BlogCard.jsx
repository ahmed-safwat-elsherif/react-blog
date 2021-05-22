import React from "react";
import { Link } from "react-router-dom";
import Category from "./Category";
const BlogCard = ({ blog }) => {
  return (
    <>
      {blog && (
        <div className="post post-card">
          <div className="post-card__image">
            <Link to={`/blogs/blog/${blog._id}`}>
              <img
                src={blog?.imageUrl || "/assets/img/image-blog-placeholder.jpg"}
                alt="blog"
                className="image"
              />
            </Link>
          </div>
          <div className="post-card__content">
            {blog.tags.map((ctgory, i) => {
              return <Category key={i} name={ctgory} />;
            })}
            <h5 className="post-card__title">
              <Link to={`/blogs/blog/${blog._id}`}>{blog.title}</Link>
            </h5>
            <p className="post-card__description text-wrap">{blog.body}</p>
            <p className="text-right text-decoration-underline">
              <Link className="link" to={`/blogs/blog/${blog._id}`}>
                Read more
              </Link>
            </p>
          </div>
          <div className="post-card__info">
            <ul className="list-flex">
              {blog.userId._id ? (
                <>
                  <li className="list-flex__item avatar">
                    <Link to={`/profile/${blog.userId._id}`}>
                      <img
                        src={blog.userId.imageUrl || "assets/img/avatar.png"}
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
      )}
    </>
  );
};

export default BlogCard;
