import * as ActionTypes from "../actions/ActionTypes";
export const selectedBlogReducer = (
  state = { isLoading: false, errMsg: null, blog: null },
  action
) => {
  switch (action.type) {
    case ActionTypes.LOADING_BLOG: {
      return { ...state, isLoading: true, errMsg: null, blog: null };
    }
    case ActionTypes.ERROR_BLOG: {
      return {
        ...state,
        isLoading: false,
        errMsg: action.payload,
        blog: null,
      };
    }
    case ActionTypes.GET_BLOG: {
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        blog: action.payload.blog,
      };
    }
    default: {
      return state;
    }
  }
};
