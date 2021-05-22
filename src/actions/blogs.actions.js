import blogServer from "../api/blogServer";
import * as ActionTypes from "./helpers/ActionTypes";
import * as ErrorMsgs from "./helpers/ErrorMsgs";

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
export const addBlog = (blog) => async (dispatch) => {
  try {
    let { file, ...body } = blog;
    console.log(file);
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
