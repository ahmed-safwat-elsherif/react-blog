import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, useParams } from "react-router";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { updateBlog } from "./../actions/selectedBlog.actions";
import { fetchBlogById } from "./../actions/selectedBlog.actions";
import Category from "./Category";
import LoadingSpinner from "./UI_Components/Loading_spinner";
import {
  handleDragOut,
  handleDragOver,
  handleDrop,
} from "./util/DragAndDropUtil";
const allTags = ["Travel", "Nature", "Tourism", "Psycology"];

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
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [dropOverlay, setDropOverLay] = useState("");
  let [image, setImage] = useState();
  let [imageFile, setImageFile] = useState();
  const { id } = useParams();

  /// get the required blog to edit
  useEffect(() => {
    if (!blog) {
      props.fetchBlogById(id);
    }
  }, [props, blog, id]);
  useEffect(() => {
    setTitle(blog?.title);
    setBody(blog?.body);
    setTags(blog?.tags);
  }, [blog]);

  const handleChangeTags = (e) => {
    let newTag = e.target.value;
    if (!tags.includes(newTag) && newTag !== "select") {
      let temp = [...tags];
      temp.push(newTag);
      setTags(temp);
    }
  };

  const setInput = (setter) => (event) => setter(event.currentTarget.value);
  const handleUpdate = async () => {
    if (!title.trim().length || !body.trim().length) {
      notifyError("Blog Title and Body are required!!");
      return;
    }
    let file;
    if (imageFile) {
      file = new FormData();
      file.append("image", imageFile, imageFile.name);
    }
    await props.updateBlog({ title, body, tags, _id: id, file });
  };

  if (errMsg) {
    notifyError({ errMsg });
  }
  if (isBlogUpdated) {
    return <Redirect to={`/blogs/blog/${id}`} />;
  }
  if (!blog) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <h1>Edit blog:</h1>
      <h3 className="pl-5">Titled "{blog?.title}"</h3>
      <div className="widget new-blog">
        <div className="row m-0">
          <div className="row col-12  align-items-center">
            <label
              htmlFor="blog-image"
              onDragLeave={(e) => handleDragOut(e, setDropOverLay)}
              onDragOver={(e) => handleDragOver(e, setDropOverLay)}
              onDrop={(e) =>
                handleDrop(e, setDropOverLay, setImageFile, setImage)
              }
            >
              {image || blog?.imageUrl ? (
                <>
                  <div className="message">Click / Drop photo to change it</div>
                  <img src={image || blog?.imageUrl} alt="blog-preview" />
                </>
              ) : (
                <div className={`drop-blog-image ${dropOverlay}`}>
                  <h3>Drop an image here</h3>
                </div>
              )}
              <input
                type="file"
                name="image"
                id="blog-image"
                onChange={(e) =>
                  handleDrop(e, setDropOverLay, setImageFile, setImage)
                }
                style={{ display: "none" }}
              />
            </label>
          </div>

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
              id="new-blog-title"
            />
          </div>
          <div className="row col-12 mt-3  align-items-center">
            <label className="col-md pl-0" htmlFor="new-blog-body">
              Body:
            </label>
            <textarea
              className="col-md-12"
              autoFocus
              id="new-blog-body"
              value={body}
              rows="7"
              onChange={setInput(setBody)}
            />
          </div>
          <div className="row col-12 mt-3 align-items-center">
            <div className="col-md  ">
              {tags?.length === 0 ? (
                <p className="text-center">The Blog contains no tags..!</p>
              ) : (
                tags?.map((t, i) => {
                  return <Category key={i} name={t} className="mr-2" />;
                })
              )}
            </div>
          </div>
          <div className="row col-12 mt-3 align-items-center">
            <label className="col-md-2 pl-0" htmlFor="new-blog-tags">
              Tags:
            </label>
            <select
              className="p-2"
              onChange={handleChangeTags}
              id="new-blog-tags"
            >
              <option value="select">select..</option>
              {allTags.map((t, i) => {
                return (
                  <option key={i} value={t}>
                    {t}
                  </option>
                );
              })}
            </select>
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
              to={`/blogs/blog/${blog?._id}`}
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

const mapStateToProps = (state) => {
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
