import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { addBlog } from "../actions/blogs.actions";
import Category from "./Category";
import {
  handleDragOut,
  handleDragOver,
  handleDrop,
} from "./util/DragAndDropUtil";

const allTags = ["Travel", "Nature", "Tourism", "Psycology"];

const notifyError = (errMsg) => toast.error(errMsg);
const setInput = (setter) => (event) => setter(event.currentTarget.value);

const NewBlog = ({ isLoading, errMsg, newblog, profile, ...props }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [dropOverlay, setDropOverLay] = useState("");
  let [image, setImage] = useState("");
  let [imageFile, setImageFile] = useState("");

  let history = useHistory();

  const handleAddBlog = async () => {
    let file = new FormData();
    file.append("image", imageFile, imageFile.name);

    clearInputs();
    if (!title.trim().length || !body.trim().length) {
      notifyError("Blog Title and Body are required!!");
      return;
    }
    if (!profile) {
      history.push("/login");
    }
    await props.addBlog({ title, body, tags, file });
  };
  const clearInputs = () => {
    setTitle("");
    setBody("");
    setTags([]);
  };

  const handleChangeTags = (e) => {
    let newTag = e.target.value;
    if (!tags.includes(newTag) && newTag !== "select") {
      let temp = [...tags];
      temp.push(newTag);
      setTags(temp);
    }
  };
  if (errMsg) {
    notifyError({ errMsg });
  }
  if (newblog) {
    return <Redirect to={`/blogs/blog/${newblog._id}`} />;
  }
  return (
    <>
      <div className="widget new-blog">
        <div className=" row m-auto">
          <div className="row col-12  align-items-center">
            <label
              htmlFor="blog-image"
              onDragLeave={(e) => handleDragOut(e, setDropOverLay)}
              onDragOver={(e) => handleDragOver(e, setDropOverLay)}
              onDrop={(e) =>
                handleDrop(e, setDropOverLay, setImageFile, setImage)
              }
            >
              {image ? (
                <>
                  <div className="message">Click / Drop photo to change it</div>
                  <img src={image} alt="blog-preview" />
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
                onChange={handleDrop}
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
              new-blog-title="new-blog-title"
            />
          </div>
          <div className="row col-12 mt-3 align-items-center">
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
              onClick={handleAddBlog}
              disabled={isLoading}
              className="btn btn-outline-primary rounded-pill"
            >
              Add
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

const mapStateToProps = (state) => {
  const { isLoading, errMsg, newblog } = state.blogs;
  const { profile } = state.profile;
  return {
    isLoading,
    errMsg,
    newblog,
    profile,
  };
};

export default connect(mapStateToProps, { addBlog })(NewBlog);
