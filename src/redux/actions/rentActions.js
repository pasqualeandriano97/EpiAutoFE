export const SET_CURRENT_CAR = "SET_CURRENT_CAR";
export const SET_PREVENTIVE = "SET_PREVENTIVE";
export const SHOW_MODAL = "SHOW_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";
import { showRent } from "../../Data/Rent";

export const setPreventive = (token, payload) => {
  return async (dispatch) => {
    const response = await showRent(token, payload);
    if (response) {
      dispatch({ type: SET_PREVENTIVE, payload: response });
      dispatch({ type: SHOW_MODAL });
    }
  };
};
