import blogServer from "../api/blogServer";
import store from "../reducers";
import * as ActionTypes from "./helpers/ActionTypes";
import * as ErrorMsgs from "./helpers/ErrorMsgs";
// import { createStore } from "redux";
// import rootReducer from "./../reducers/index";

export const loadingBlogs = () => {
  return {
    type: ActionTypes.LOADING_BLOGS,
  };
};

export const errorBlogs = () => {
  return {
    type: ActionTypes.ERROR_BLOGS,
    payload: ErrorMsgs.ErrorInFetchingBlogs,
  };
};

export const fetchBlogs =
  (limit = 10, skip = 0) =>
  async (dispatch) => {
    try {
      let oldBlogs = [...store.getState().blogs.blogs];
      if (skip === 0) {
        dispatch(loadingBlogs());
      } else {
        dispatch({ type: ActionTypes.LOADING_MORE_BLOGS });
      }

      let response = await blogServer.get(`/blogs?limit=${limit}&skip=${skip}`);
      if (response.data.success) {
        let newBlogs = [...response.data.blogs];
        if (skip === 0) oldBlogs = [];

        dispatch({
          type: ActionTypes.GET_BLOGS,
          payload: [...oldBlogs, ...newBlogs],
        });
      } else {
        dispatch(errorBlogs());
      }
    } catch (error) {
      dispatch(errorBlogs());
    }
  };

export const addBlog = (blog) => async (dispatch) => {
  try {
    let { file, ...body } = blog;

    dispatch(loadingBlogs());
    let response = await blogServer.post("/blogs/new", body);
    if (response.data.success) {
      if (file) {
        response = await blogServer.post(
          `/images/blog/${response.data.blog._id}`,
          file
        );
      }

      dispatch({
        type: ActionTypes.ADD_BLOG,
        payload: response.data.blog,
      });
    }
    dispatch(errorBlogs("Unable to add blog"));
  } catch (error) {
    dispatch(errorBlogs("Unable to add blog"));
  }
};
