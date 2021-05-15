import blogServer from "../api/blogServer";
import * as ActionTypes from "./helpers/ActionTypes";

export const profileLoading = () => {
  return {
    type: ActionTypes.LOADING_PROFILE,
  };
};

export const profileFail = (errMsg) => {
  return {
    type: ActionTypes.ERROR_PROFILE,
    payload: errMsg,
  };
};

export const getProfile = () => async (dispatch) => {
  try {
    dispatch(profileLoading());
    const response = await blogServer.get(`/users/profile`);
    console.log(response);
    if (response.data.success) {
      dispatch({ type: ActionTypes.GET_PROFILE, payload: response.data });
    } else {
      dispatch(profileFail("Error occured in getting user profile"));
    }
  } catch (error) {
    dispatch(profileFail("Error occured in getting user profile"));
  }
};

export const updateProfile = (userdata, isChangePass) => async (dispatch) => {
  try {
    dispatch(profileLoading());
    const response = await blogServer.patch(`/users`, userdata);
    console.log(response);
    if (response.data.success) {
      if (isChangePass) {
        try {
          await blogServer.patch(`/users/changepassword`, userdata);
        } catch (error) {
          dispatch(profileFail("Error occured in updating user password"));
        }
      }
      dispatch({ type: ActionTypes.UPDATE_PROFILE, payload: response.data });
    } else {
      dispatch(profileFail("Error occured in updating user profile"));
    }
  } catch (error) {
    dispatch(profileFail("Error occured in updating user profile"));
  }
};
