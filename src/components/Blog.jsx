import React, { useEffect } from "react";
import { connect } from "react-redux";
import Comments from "./Comments";
import { fetchBlogById } from "./../actions/selectedBlog.actions";
import BlogPost from "./BlogPost";
import LoadingSpinner from "./UI_Components/Loading_spinner";
import Author from "./Author";
import { Link } from "react-router-dom";

const errorHangler = (errMsg) => <div className="text-danger">{errMsg}</div>;

const loadingHandler = () => <LoadingSpinner />;

const Blog = ({ isLoading, errMsg, blog, match, fetchBlogById }) => {
  let { id } = match.params;
  useEffect(() => {
    fetchBlogById(id);
  }, []);
  if (isLoading) return <div>{loadingHandler()}</div>;
  if (errMsg) return <div>{errorHangler(errMsg)}</div>;

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
              <BlogPost blog={blog} />
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
const mapStateToProps = ({ selectedBlog }) => {
  return {
    blog: selectedBlog.blog,
    isLoading: selectedBlog.isLoading,
    errMsg: selectedBlog.errMsg,
  };
};
export default connect(mapStateToProps, { fetchBlogById })(Blog);
