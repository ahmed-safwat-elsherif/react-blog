import * as ActionTypes from "../actions/helpers/ActionTypes";
export const selectedBlogReducer = (
  state = {
    isLoading: false,
    errMsg: null,
    isCommentLoading: false,
    blog: null,
    isUpdatingBlog: false,
    isBlogUpdated: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.LOADING_BLOG: {
      return {
        ...state,
        isLoading: true,
        isCommentLoading: false,
        errMsg: null,
        blog: null,
        isUpdatingBlog: false,
        isBlogUpdated: false,
      };
    }
    case ActionTypes.LOADING_UPDATE_BLOG: {
      return {
        ...state,
        isLoading: false,
        isCommentLoading: false,
        errMsg: null,
        blog: null,
        isUpdatingBlog: true,
        isBlogUpdated: false,
      };
    }

    case ActionTypes.ERROR_BLOG: {
      return {
        ...state,
        isLoading: false,
        isCommentLoading: false,
        errMsg: action.payload,
        blog: null,
        isUpdatingBlog: false,
        isBlogUpdated: false,
      };
    }
    case ActionTypes.COMMENT_LOADING: {
      return {
        ...state,
        isCommentLoading: true,
        isLoading: false,
        errMsg: null,
        isUpdatingBlog: false,
        isBlogUpdated: false,
      };
    }
    case ActionTypes.ADD_COMMENT:
    case ActionTypes.GET_BLOG: {
      return {
        ...state,
        isCommentLoading: false,
        isLoading: false,
        errMsg: null,
        blog: action.payload,
        isUpdatingBlog: false,
        isBlogUpdated: true,
      };
    }
    default: {
      return state;
    }
  }
};
