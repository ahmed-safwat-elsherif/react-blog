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
      console.log(response);
      if (response.data.success) {
        dispatch(authSuccess(response.data));
      } else {
        if (response.data.exists) {
          dispatch(authFail("Email is exist"));
        } else {
          dispatch(authFail("Registeration failed"));
        }
      }
    } else {
      const response = await blogServer.post("/users/login", userData);
      //   console.log(response);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        dispatch(authSuccess(response.data));
      } else {
        dispatch(authFail("Email or password is incorrect"));
      }
    }
  } catch (error) {
    dispatch(authFail("Registeration failed"));
  }
};
