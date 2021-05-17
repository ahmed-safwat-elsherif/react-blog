import * as ActionTypes from "../actions/helpers/ActionTypes";
const INITIAL_STATE = {
  isLoading: true,
  errMsg: null,
  profile: null,
  isLoggedIn: false,
};

export const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.LOADING_PROFILE:
      return {
        ...state,
        isLoading: true,
        errMsg: null,
        profile: null,
        isLoggedIn: false,
      };
    case ActionTypes.LOGOUT_AUTH:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        profile: null,
        isLoggedIn: false,
      };
    case ActionTypes.LOGGEDIN_AUTH:
    case ActionTypes.GET_PROFILE:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        profile: action.payload.user,
        isLoggedIn: true,
      };

    case ActionTypes.ERROR_PROFILE:
      return {
        ...state,
        isLoading: false,
        errMsg: action.payload,
        profile: null,
        isLoggedIn: false,
      };
    case ActionTypes.UPDATE_PROFILE:
      return {
        ...state,
        isLoading: false,
        errMsg: false,
        profile: action.payload.user,
        isLoggedIn: true,
      };
    case ActionTypes.DELETE_PROFILE:
      return {
        ...state,
        isLoading: false,
        errMsg: false,
        profile: null,
        isLoggedIn: false,
        isDeleted: true,
      };
    default: {
      return state;
    }
  }
};
