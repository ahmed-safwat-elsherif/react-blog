import * as ActionTypes from "../actions/helpers/ActionTypes";
export const selectedBlogReducer = (
  state = {
    isLoading: false,
    errMsg: null,
    isCommentLoading: false,
    blog: null,
    isUpdatingBlog: false,
    isBlogUpdated: false,
    isDeleted: false,
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
        isDeleted: false,
      };
    }
    case ActionTypes.LOADING_UPDATE_BLOG: {
      return {
        ...state,
        isLoading: false,
        isCommentLoading: false,
        errMsg: null,
        // blog: null,
        isUpdatingBlog: true,
        isBlogUpdated: false,
        isDeleted: false,
      };
    }
    case ActionTypes.DELETE_COMMENT: {
      return {
        ...state,
        isLoading: false,
        isCommentLoading: false,
        errMsg: null,
        blog: action.payload,
        isUpdatingBlog: false,
        isBlogUpdated: false,
        isDeleted: false,
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
        isDeleted: false,
      };
    }
    case ActionTypes.COMMENT_LOADING: {
      return {
        ...state,
        isLoading: false,
        isCommentLoading: true,
        errMsg: action.payload,
        // blog: null,
        isUpdatingBlog: false,
        isBlogUpdated: false,
        isDeleted: false,
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
        isBlogUpdated: false,
        isDeleted: false,
      };
    }
    case ActionTypes.BLOG_UBDATED: {
      return {
        ...state,
        isCommentLoading: false,
        isLoading: false,
        errMsg: null,
        blog: action.payload,
        isUpdatingBlog: false,
        isBlogUpdated: true,
        isDeleted: false,
      };
    }
    case ActionTypes.DELETE_BLOG: {
      return {
        ...state,
        isCommentLoading: false,
        isLoading: false,
        errMsg: null,
        // blog: null,
        isUpdatingBlog: false,
        isBlogUpdated: true,
        isDeleted: true,
      };
    }
    default: {
      return state;
    }
  }
};
