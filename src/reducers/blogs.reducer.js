import * as ActionTypes from "../actions/helpers/ActionTypes";
export const blogsReducer = (
  state = {
    isLoading: false,
    errMsg: null,
    blogs: [],
    newblog: null,
    isLoadingMoreBlogs: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.LOADING_BLOGS: {
      return {
        ...state,
        isLoading: true,
        errMsg: null,
        blogs: [],
        newblog: null,
        isLoadingMoreBlogs: false,
      };
    }
    case ActionTypes.LOADING_MORE_BLOGS: {
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        newblog: null,
        isLoadingMoreBlogs: true,
      };
    }

    case ActionTypes.ERROR_BLOGS: {
      return {
        ...state,
        isLoading: false,
        errMsg: action.payload,
        blogs: [],
        newblog: null,
        isLoadingMoreBlogs: false,
      };
    }
    case ActionTypes.GET_BLOGS: {
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        blogs: action.payload,
        newblog: null,
        isLoadingMoreBlogs: false,
      };
    }
    case ActionTypes.ADD_BLOG: {
      const blogs = [...state.blogs];
      blogs.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        blogs,
        newblog: action.payload,
        isLoadingMoreBlogs: false,
      };
    }
    default: {
      return state;
    }
  }
};
