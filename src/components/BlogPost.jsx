import React from "react";
import SocialMediaIcons from "./SocialMediaIcons";
import { Link } from "react-router-dom";
import Category from "./Category";
import { connect } from "react-redux";
import { deleteBlog } from "../actions/selectedBlog.actions";
import { useHistory } from "react-router";
const BlogPost = ({ isDeleted, blog, profile, ...props }) => {
  const history = useHistory();
  const handleDeleteBlog = () => {
    if (window.confirm("You really want to delete this blog?")) {
      console.log("deleteIt");
      props.deleteBlog(blog._id);
    }
  };
  if (!blog) {
    return history.push("/home");
  }
  return (
    <div className="post post-single">
      <div className="post-single__image">
        <img
          src={
            blog.imageUrl ||
            "https://noonpost.netlify.app/html/template/assets/img/blog/6.jpg"
          }
          alt="blog"
        />
      </div>
      <div className="post-single__categorie">
        {blog.tags.map((tag, i) => {
          return <Category key={i} name={tag} />;
        })}
      </div>
      <div className="post-single__header my-3">
        <h4 className="post-single__title">{blog.title}</h4>
        {profile?._id === blog.userId._id && (
          <>
            <div className="dropdown" style={{ float: "right" }}>
              <button
                className="btn btn-outline-info dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-pencil-alt"></i>
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <Link className="dropdown-item" to={`/blog/edit/${blog._id}`}>
                  Edit blog
                </Link>
                <button className="dropdown-item" onClick={handleDeleteBlog}>
                  Delete this blog
                </button>
              </div>
            </div>
          </>
        )}
        <ul className="list-flex">
          <li className="avatar">
            <Link to={`/profile/${blog.userId._id}`}>
              <img
                src={blog.userId.imageUrl || "/assets/img/avatar.png"}
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
          <li className="dot"></li>
          <li className="list-flex__item">
            {new Date(blog.createdAt).toDateString()}
          </li>
        </ul>
      </div>
      <hr />
      <div className="post-single__content">{blog.body}</div>
      <hr />

      <div className="post-single__footer">
        <div className="tags-container">
          {blog.tags.map((tag, i) => {
            return <Category key={i} name={tag} />;
          })}
        </div>
        <SocialMediaIcons />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { profile } = state.profile;

  return {
    profile,
  };
};

export default connect(mapStateToProps, { deleteBlog })(BlogPost);
