export const SET_CURRENT_CAR = "SET_CURRENT_CAR";
export const SET_PREVENTIVE = "SET_PREVENTIVE";
export const SHOW_MODAL = "SHOW_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";
export const SET_MY_RENTS = "SET_MY_RENTS";
import { showRent, saveRent, getMyRents } from "../../Data/Rent";

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
      alert(
        `Noleggio prenotato con successo! Questo è il codice che mostrerai all'operatore in sede: " ${response.id} "\nPuoi consultare, modificare e annullare i tuoi noleggi nella sezione "Tuoi Noleggi"`
      );
      dispatch({ type: SET_MY_RENTS, payload: response });
    }
    console.log(response);
  };
};

export const getMyRentsA = (token) => {
  return async (dispatch) => {
    const response = await getMyRents(token);
    if (response) {
      console.log(response);
      dispatch({ type: SET_MY_RENTS, payload: response });
    }
  };
};
