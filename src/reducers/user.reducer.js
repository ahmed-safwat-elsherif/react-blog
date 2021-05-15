import * as ActionTypes from "../actions/helpers/ActionTypes";

const INITIAL_STATE = {
  isLoading: true,
  errMsg: null,
  user: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.LOADING_USER:
      return {
        ...state,
        isLoading: true,
        errMsg: null,
        user: null,
      };
    case ActionTypes.GET_USER:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        user: action.payload,
      };
    case ActionTypes.ERROR_USER:
      return {
        ...state,
        isLoading: false,
        errMsg: action.payload,
        user: null,
      };
    default: {
      return state;
    }
  }
};
