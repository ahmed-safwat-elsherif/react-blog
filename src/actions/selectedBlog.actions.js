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

export const commentLoading = () => {
  return {
    type: ActionTypes.COMMENT_LOADING,
  };
};
export const commentFail = (errMsg) => {
  return {
    type: ActionTypes.COMMENT_ERROR,
    payload: errMsg,
  };
};

export const postComment = (comment, _id) => async (dispatch) => {
  try {
    dispatch(commentLoading());
    const response = await blogServer.post("/blogs/comments/new", {
      comment,
      _id,
    });
    if (response.data.success) {
      return dispatch({
        type: ActionTypes.ADD_COMMENT,
        payload: response.data.blog,
      });
    }
    dispatch(commentFail("Unable to add comment"));
  } catch (error) {
    dispatch(commentFail("unable to add comment"));
  }
};

export const fetchBlogById = (id) => async (dispatch) => {
  try {
    dispatch(loadingBlog());
    let response = await blogServer.get(`/blogs/blog/${id}`);
    if (response.data.success) {
      dispatch({ type: ActionTypes.GET_BLOG, payload: response.data.blog });
    } else {
      dispatch(errorBlog());
    }
  } catch (error) {
    dispatch(errorBlog());
  }
};

export const updateBlog = (updates) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.LOADING_UPDATE_BLOG });
    const response = await blogServer.patch("/blogs/update/blog", updates);
    if (response.data.success) {
      dispatch({ type: ActionTypes.GET_BLOG, payload: response.data.blog });
    } else {
      dispatch(errorBlog());
    }
  } catch (error) {
    dispatch(errorBlog());
  }
};
