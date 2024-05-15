export const SET_APPOINTMENT_CAR = "SET_APPOINTMENT_CAR";
export const SET_SUMMARY = "SET_SUMMARY";
export const SHOW_MODAL = "SHOW_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";
import { showAppointment, saveAppointment } from "../../Data/appointment";

export const setSummaryA = (token, payload) => {
  return async (dispatch) => {
    const response = await showAppointment(token, payload);
    if (response) {
      dispatch({ type: SET_SUMMARY, payload: response });
      dispatch({ type: SHOW_MODAL });
    }
  };
};

export const saveAppointmentA = (token, payload) => {
  return async () => {
    const response = await saveAppointment(token, payload);
    if (response) {
      alert(
        `Appuntamento prenotato con successo! Questo è il codice che mostrerai all'operatore in sede: " ${response.id} "\nPuoi consultare, modificare e annullare i tuoi appuntamenti nella sezione "Tuoi Appuntamenti"`
      );
    }
    console.log(response);
  };
};
