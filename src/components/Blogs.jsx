import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchBlogs } from "../actions/blogs.actions";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";

const renderList = (blogs) => {
  return (
    <>
      {blogs.map((blog) => {
        return <BlogCard key={blog._id} blog={blog} />;
      })}
    </>
  );
};
const errorHangler = (errMsg) => <div className="text-danger">{errMsg}</div>;

const loadingHandler = () => <div className="text-primary">Loading ..</div>;

const Blogs = (props) => {
  useEffect(() => {
    props.fetchBlogs(10, 0);
  }, []);
  if (props.isLoading) {
    return loadingHandler();
  }
  if (props.errMsg) {
    return errorHangler(props.errMsg);
  }

  return (
    <div className="container-fluid main">
      <div className="columns">{renderList(props.blogs)}</div>
    </div>
  );
};

const mapStateToProps = ({ blogs }) => {
  return {
    blogs: blogs.blogs,
    isLoading: blogs.isLoading,
    errMsg: blogs.errMsg,
  };
};
export default connect(mapStateToProps, { fetchBlogs })(Blogs);
