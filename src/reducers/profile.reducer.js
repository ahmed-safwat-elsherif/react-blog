import * as ActionTypes from "../actions/helpers/ActionTypes";
const INITIAL_STATE = {
  isLoading: true,
  errMsg: null,
  profile: null,
  isAuth: false,
};

export const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.LOADING_PROFILE:
      return {
        ...state,
        isLoading: true,
        errMsg: null,
        profile: null,
        isAuth: false,
      };
    case ActionTypes.LOGOUT_AUTH:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        profile: null,
        isAuth: false,
      };
    case ActionTypes.SUCCESS_AUTH:
    case ActionTypes.GET_PROFILE:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        profile: action.payload.user,
        isAuth: true,
      };

    case ActionTypes.ERROR_PROFILE:
      return {
        ...state,
        isLoading: false,
        errMsg: action.payload,
        profile: null,
        isAuth: false,
      };
    case ActionTypes.UPDATE_PROFILE:
      return {
        ...state,
        isLoading: false,
        errMsg: false,
        profile: action.payload.user,
        isAuth: true,
      };
    case ActionTypes.DELETE_PROFILE:
      return {
        ...state,
        isLoading: false,
        errMsg: false,
        profile: null,
        isAuth: false,
        isDeleted: true,
      };
    default: {
      return state;
    }
  }
};
