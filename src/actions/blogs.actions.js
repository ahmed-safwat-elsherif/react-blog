import blogServer from "../api/blogServer";
import * as ActionTypes from "./ActionTypes";
import * as ErrorMsgs from "./ErrorMsgs";

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

export const fetchBlogs = (limit = 10, skip = 0) => async (dispatch) => {
  try {
    dispatch(loadingBlogs());
    let response = await blogServer.get(`/blogs?limit=${limit}&skip=${skip}`);
    if (response.data.success) {
      dispatch({ type: ActionTypes.GET_BLOGS, payload: response.data });
    } else {
      dispatch(errorBlogs());
    }
  } catch (error) {
    dispatch(errorBlogs());
  }
};
