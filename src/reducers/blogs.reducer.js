import * as ActionTypes from "../actions/helpers/ActionTypes";
export const blogsReducer = (
  state = { isLoading: false, errMsg: null, blogs: [], newblog: null },
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
      };
    }
    case ActionTypes.ERROR_BLOGS: {
      return {
        ...state,
        isLoading: false,
        errMsg: action.payload,
        blogs: [],
        newblog: null,
      };
    }
    case ActionTypes.GET_BLOGS: {
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        blogs: action.payload.blogs,
        newblog: null,
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
      };
    }
    default: {
      return state;
    }
  }
};
