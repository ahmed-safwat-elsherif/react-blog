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
    console.log(response);
    if (response.data.success) {
      return dispatch({
        type: ActionTypes.ADD_COMMENT,
        payload: response.data.blog,
      });
    }
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
      dispatch({ type: ActionTypes.BLOG_UBDATED, payload: response.data.blog });
    } else {
      dispatch(errorBlog());
    }
  } catch (error) {
    dispatch(errorBlog());
  }
};

export const deleteBlog = (_id) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.LOADING_UPDATE_BLOG });
    const response = await blogServer.delete(`/blogs/delete/blog/${_id}`);
    if (response.data.success) {
      dispatch({ type: ActionTypes.DELETE_BLOG });
    } else {
      dispatch(errorBlog());
    }
  } catch (error) {
    dispatch(errorBlog());
  }
};

export const deleteComment = (_id, blogId) => async (dispatch) => {
  try {
    const response = await blogServer.delete(
      `/blogs/blog/${blogId}/comments/delete/${_id}`,
      {
        blogId,
      }
    );
    if (response.data.success) {
      dispatch({
        type: ActionTypes.DELETE_COMMENT,
        payload: response.data.blog,
      });
    } else {
      dispatch(errorBlog());
    }
  } catch (error) {
    dispatch(errorBlog());
  }
};
