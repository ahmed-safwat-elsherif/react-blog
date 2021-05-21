import React, { useEffect } from "react";
import { connect } from "react-redux";
import Comments from "./Comments";
import { fetchBlogById } from "./../actions/selectedBlog.actions";
import BlogPost from "./BlogPost";
import LoadingSpinner from "./UI_Components/Loading_spinner";
import Author from "./Author";
import { Link } from "react-router-dom";
import ErrorHandler from "./UI_Components/Error_handler";
import { Redirect } from "react-router";

const Blog = ({
  isLoading,
  errMsg,
  newblog,
  blog,
  isDeleted,
  match,
  fetchBlogById,
}) => {
  let { id } = match.params;
  useEffect(() => {
    fetchBlogById(id);
  }, [fetchBlogById, id]);
  if (isLoading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  if (!blog)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  if (errMsg) return <ErrorHandler errMsg={errMsg} />;
  if (isDeleted && !newblog) {
    return <Redirect to="/blogs" />;
  }
  return (
    <div className="container-fluid main">
      <div>
        <Link to="/blogs" className=" mb-5 d-flex align-items-center">
          <i className="fas fa-chevron-left"></i>
          <p className="mb-0 ml-4">Back to blogs </p>
        </Link>
      </div>
      <div className="flex-container">
        {blog && (
          <>
            <div className="flex-child-7">
              <BlogPost blog={blog} isDeleted={isDeleted} />
              <div className="widget mb-50">
                <Comments comments={blog.comments} />
              </div>
            </div>
            <div className="flex-child-1 p-y-5">
              <Author user={blog.userId} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = ({ selectedBlog, blogs }) => {
  const { newblog } = blogs;
  return {
    blog: selectedBlog.blog,
    isLoading: selectedBlog.isLoading,
    errMsg: selectedBlog.errMsg,
    isDeleted: selectedBlog.isDeleted,
    newblog,
  };
};
export default connect(mapStateToProps, { fetchBlogById })(Blog);
