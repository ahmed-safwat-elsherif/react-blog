import * as ActionTypes from "../actions/helpers/ActionTypes";
const INITIAL_STATE = {
  isLoading: false,
  errMsg: null,
  user: null,
  token: null,
  isAuthenticated: false,
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.LOADING_AUTH:
      return {
        ...state,
        isLoading: true,
        errMsg: null,
        user: null,
        token: null,
        isAuthenticated: false,
      };

    case ActionTypes.SUCCESS_AUTH:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        errMsg: null,
        isAuthenticated: true,
      };

    case ActionTypes.ERROR_AUTH:
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        errMsg: action.payload,
        isAuthenticated: false,
      };
    case ActionTypes.LOGOUT_AUTH:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        errMsg: null,
        isAuthenticated: false,
      };
    default: {
      return state;
    }
  }
};
