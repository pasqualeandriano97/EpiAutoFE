export const SET_CURRENT_CAR = "SET_CURRENT_CAR";
export const SET_RENT_CAR = "SET_RENT_CAR";
export const SET_PREVENTIVE = "SET_PREVENTIVE";
export const SHOW_MODAL = "SHOW_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";
export const SET_MY_RENTS = "SET_MY_RENTS";
export const RESET_REDUX_RENT = "RESET_REDUX_RENT";
import {
  showRent,
  saveRent,
  getMyRents,
  deleteRent,
  postRent,
} from "../../Data/Rent";

export const setPreventive = (token, payload) => {
  return async (dispatch) => {
    const response = await showRent(token, payload);
    if (response) {
      dispatch({ type: SET_PREVENTIVE, payload: response });
      dispatch({ type: SHOW_MODAL });
    }
  };
};

export const saveRentA = (token, payload) => {
  return async (dispatch) => {
    const response = await saveRent(token, payload);
    if (response) {
      dispatch({ type: SET_RENT_CAR, payload: response });
      dispatch(getMyRentsA(token));
    }
  };
};

export const getMyRentsA = (token) => {
  return async (dispatch) => {
    const response = await getMyRents(token);
    if (response) {
      console.log(response);
      dispatch({ type: SET_MY_RENTS, payload: response.content });
    }
  };
};

export const deleteRentA = (token, payload) => {
  return async (dispatch) => {
    const response = await deleteRent(token, payload);
    if (response) {
      alert(response.message);
      dispatch(getMyRentsA(token));
    }
  };
};

export const postRentA = (token, rent, payload) => {
  return async (dispatch) => {
    const response = await postRent(token, rent, payload);
    if (response) {
      alert("Noleggio modificato con successo!");
      dispatch(getMyRentsA(token));
    }

    console.log(response);
  };
};
