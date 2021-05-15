import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchBlogs } from "../actions/blogs.actions";
import BlogCard from "./BlogCard";
import ErrorHandler from "./UI_Components/Error_handler";
import LoadingSpinner from "./UI_Components/Loading_spinner";
import { Link } from "react-router-dom";

const renderList = (blogs) => {
  return (
    <>
      {blogs.map((blog) => {
        return <BlogCard key={blog._id} blog={blog} />;
      })}
    </>
  );
};

const Blogs = (props) => {
  useEffect(() => {
    props.fetchBlogs(10, 0);
  }, []);
  if (props.isLoading) {
    return <LoadingSpinner />;
  }
  if (props.errMsg) {
    return <ErrorHandler errMsg={props.errMsg} />;
  }

  return (
    <div className="container-fluid">
      <div style={{ position: "relative", height: "10px" }}>
        <Link
          className="add-blog-btn"
          to={props.profile ? "/blog/new" : "/login"}
        >
          <i className="fas fa-plus"></i>
        </Link>
      </div>
      <h2 className="text-center">Blogs</h2>
      <hr />
      <div className="columns mt-5">{renderList(props.blogs)}</div>
    </div>
  );
};

const mapStateToProps = ({ blogs, profile }) => {
  return {
    blogs: blogs.blogs,
    isLoading: blogs.isLoading,
    errMsg: blogs.errMsg,
    profile: profile.profile,
  };
};
export default connect(mapStateToProps, { fetchBlogs })(Blogs);
