import blogServer from "../api/blogServer";
import * as ActionTypes from "./helpers/ActionTypes";

export const userLoading = () => {
  return {
    type: ActionTypes.LOADING_USER,
  };
};

export const userFail = (errMsg) => {
  return {
    type: ActionTypes.ERROR_USER,
    payload: errMsg,
  };
};

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch(userLoading());
    const response = await blogServer.get(`/users/user/${id}`);
    if (response.data.success) {
      if (response.data.user) {
        return dispatch({
          type: ActionTypes.GET_USER,
          payload: response.data.user,
        });
      }
      dispatch(userFail(`Couldn't find user with id : [${id}]`));
    } else {
      dispatch(userFail("Error occured in getting user profile"));
    }
  } catch (error) {
    dispatch(userFail("Error occured in getting user profile"));
  }
};
