export const SAVE_TOKEN = "SAVE_TOKEN";
export const SAVE_USER = "SAVE_USER";
import { userDetails, updateUser } from "../../Data/User";

export const saveToken = (token) => {
  return {
    type: SAVE_TOKEN,
    payload: token,
  };
};

export const saveUser = (token) => {
  return async (dispatch) => {
    const response = await userDetails(token);
    dispatch({ type: SAVE_USER, payload: response });
  };
};

export const updateUserA = (token, user) => {
  return async (dispatch) => {
    const response = await updateUser(token, user);
    dispatch({ type: SAVE_USER, payload: response });
    console.log(response);
  };
};
