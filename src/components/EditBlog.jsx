import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { updateBlog } from "./../actions/selectedBlog.actions";
import { fetchBlogById } from "./../actions/selectedBlog.actions";
const notifyError = (errMsg) => toast.error(errMsg);

const EditBlog = ({
  blog,
  errMsg,
  isUpdated,
  isLoading,
  isUpdatingBlog,
  isBlogUpdated,
  ...props
}) => {
  const [title, setTitle] = useState(blog?.title);
  const [body, setBody] = useState(blog?.body);
  const [tags, setTags] = useState(blog?.tags);
  useEffect(() => {
    if (!blog) {
      props.fetchBlogById(props.match.params.id);
    }
  }, []);
  const setInput = (setter) => (event) => setter(event.currentTarget.value);
  const handleUpdate = async () => {
    if (!title.trim().length || !body.trim().length) {
      notifyError("Blog Title and Body are required!!");
      return;
    }

    await props.updateBlog({ title, body, tags });
  };

  if (errMsg) {
    notifyError({ errMsg });
  }
  if (isBlogUpdated) {
    return <Redirect to={`/blogs/blog/${props.match.params.id}`} />;
  }

  return (
    <>
      <div className="widget new-blog">
        <div className="row m-0">
          <div className="row col-12  align-items-center">
            <label className="col-md pl-0" htmlFor="new-blog-title">
              Title:
            </label>
            <input
              className="col-md-12"
              type="text"
              autoFocus
              value={title}
              onChange={setInput(setTitle)}
              new-blog-title="new-blog-title"
            />
          </div>
          <div className="row col-12 align-items-center">
            <label className="col-md pl-0" htmlFor="new-blog-title">
              Body:
            </label>
            <textarea
              className="col-md-12"
              autoFocus
              value={body}
              rows="7"
              onChange={setInput(setBody)}
              new-blog-title="new-blog-title"
            />
          </div>
          <div className="row col-12 my-3 group-btn">
            <button
              onClick={handleUpdate}
              disabled={isLoading}
              className="btn btn-outline-primary rounded-pill"
            >
              {isUpdatingBlog ? (
                <div className="d-flex justify-content-center">
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                "Update"
              )}
            </button>
            <Link
              className="btn btn-outline-secondary rounded-pill"
              to="/blogs"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

const mapStateToProps = (state, props) => {
  // const blog = state.blogs.find((b) => b._id == props.match.params.id);
  const { blog, isUpdatingBlog, isBlogUpdated } = state.selectedBlog;
  const { errMsg, isUpdated, isLoading } = state.blogs;
  return {
    blog,
    errMsg,
    isUpdated,
    isLoading,
    isUpdatingBlog,
    isBlogUpdated,
  };
};

export default connect(mapStateToProps, { fetchBlogById, updateBlog })(
  EditBlog
);
