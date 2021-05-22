import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchBlogs } from "../actions/blogs.actions";
import BlogCard from "./BlogCard";
import ErrorHandler from "./UI_Components/Error_handler";
import LoadingSpinner from "./UI_Components/Loading_spinner";
import { Link } from "react-router-dom";

const renderList = (blogs) => {
  if (blogs.length === 0) {
    return <div className="text-center">Empty, no blogs today!</div>;
  }
  return (
    <>
      <div className="columns mt-5">
        {blogs.map((blog) => {
          return <BlogCard key={blog._id} blog={blog} />;
        })}
      </div>
    </>
  );
};

const Blogs = ({ fetchBlogs, isLoadingMoreBlogs, ...props }) => {
  const [skip, setSkip] = useState(0);
  useEffect(() => {
    fetchBlogs(10, 0);
  }, [fetchBlogs]);
  if (props.isLoading) {
    return <LoadingSpinner />;
  }
  if (props.errMsg) {
    return <ErrorHandler errMsg={props.errMsg} />;
  }
  const handleLoadMore = () => {
    setSkip(skip + 10);
    fetchBlogs(10, skip);
  };
  return (
    <>
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
        {renderList(props.blogs)}
      </div>
      <div className="form-group w-25 m-auto my-5">
        <button
          onClick={handleLoadMore}
          disabled={isLoadingMoreBlogs}
          className="btn-custom justify-content-center w-100"
        >
          {isLoadingMoreBlogs ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            "Show more"
          )}
        </button>
      </div>
    </>
  );
};

const mapStateToProps = ({ blogs, profile }) => {
  return {
    blogs: blogs.blogs,
    isLoadingMoreBlogs: blogs.isLoadingMoreBlogs,
    isLoading: blogs.isLoading,
    errMsg: blogs.errMsg,
    profile: profile.profile,
  };
};
export default connect(mapStateToProps, { fetchBlogs })(Blogs);
