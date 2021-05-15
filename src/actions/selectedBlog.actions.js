import blogServer from "../api/blogServer";
import * as ActionTypes from "./helpers/ActionTypes";
import * as ErrorMsgs from "./helpers/ErrorMsgs";

export const loadingBlog = () => {
  return {
    type: ActionTypes.LOADING_BLOG,
  };
};

export const errorBlog = () => {
  return {
    type: ActionTypes.ERROR_BLOG,
    payload: ErrorMsgs.ErrorInFetchingBlog,
  };
};

export const fetchBlogById = (id) => async (dispatch) => {
  try {
    dispatch(loadingBlog());
    let response = await blogServer.get(`/blogs/blog/${id}`);
    if (response.data.success) {
      console.log(response);
      dispatch({ type: ActionTypes.GET_BLOG, payload: response.data.blog });
    } else {
      dispatch(errorBlog());
    }
  } catch (error) {
    dispatch(errorBlog());
  }
};
