import blogServer from "../api/blogServer";
import * as ActionTypes from "./helpers/ActionTypes";

export const authLoading = () => {
  return {
    type: ActionTypes.LOADING_AUTH,
  };
};
export const authSuccess = (authData) => {
  return {
    type: ActionTypes.SUCCESS_AUTH,
    payload: authData,
  };
};

export const authLoggedIn = (authData) => {
  return {
    type: ActionTypes.LOGGEDIN_AUTH,
    payload: authData,
  };
};

export const authFail = (errMsg) => {
  return {
    type: ActionTypes.ERROR_AUTH,
    payload: errMsg,
  };
};

export const authLogout = () => {
  return {
    type: ActionTypes.LOGOUT_AUTH,
  };
};

export const auth = (userData, isSignup) => async (dispatch) => {
  try {
    dispatch(authLoading());
    if (isSignup) {
      const response = await blogServer.post("/users/register", userData);

      if (response.data.success) {
        return dispatch(authSuccess(response.data));
      }
      if (response.data.exists) {
        dispatch(authFail(response.data.message));
      } else {
        dispatch(authFail("Registeration failed"));
      }
    } else {
      const response = await blogServer.post("/users/login", userData);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        dispatch(authLoggedIn(response.data));
      } else {
        dispatch(authFail("Email or password is incorrect"));
      }
    }
  } catch (error) {
    dispatch(authFail("Registeration failed"));
  }
};
