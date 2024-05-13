export const SET_CURRENT_CAR = "SET_CURRENT_CAR";
export const SET_PREVENTIVE = "SET_PREVENTIVE";
import { showRent } from "../../Data/Rent";

export const setPreventive = (token, payload) => {
  return async (dispatch) => {
    const response = await showRent(token, payload);
    console.log(response);
    dispatch({ type: SET_PREVENTIVE, payload: response });
  };
};
