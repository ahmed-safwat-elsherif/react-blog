import * as ActionTypes from "../actions/ActionTypes";
export const blogsReducer = (
  state = { isLoading: false, errMsg: null, blogs: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.LOADING_BLOGS: {
      return { ...state, isLoading: true, errMsg: null, blogs: [] };
    }
    case ActionTypes.ERROR_BLOGS: {
      return {
        ...state,
        isLoading: false,
        errMsg: action.payload,
        blogs: [],
      };
    }
    case ActionTypes.GET_BLOGS: {
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        blogs: action.payload.blogs,
      };
    }
    default: {
      return state;
    }
  }
};
