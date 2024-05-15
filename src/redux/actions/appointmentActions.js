export const SET_APPOINTMENT_CAR = "SET_APPOINTMENT_CAR";
export const SET_APPOINTMENT = "SET_APPOINTMENT";
export const SET_SUMMARY = "SET_SUMMARY";
export const SET_MY_APPOINTMENTS = "SET_MY_APPOINTMENTS";
export const SHOW_MODAL = "SHOW_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";
export const RESET_REDUX_APPOINTMENT = "RESET_REDUX_APPOINTMENT";
import {
  showAppointment,
  saveAppointment,
  getMyAppointments,
  postAppointment,
  deleteAppointment,
} from "../../Data/appointment";

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
  return async (dispatch) => {
    const response = await saveAppointment(token, payload);
    if (response) {
      alert(
        `Appuntamento prenotato con successo! Questo è il codice che mostrerai all'operatore in sede: " ${response.id} "\nPuoi consultare, modificare e annullare i tuoi appuntamenti nella sezione "Tuoi Appuntamenti"`
      );
      dispatch(getMyAppointmentsA(token));
    }
    console.log(response);
  };
};

export const getMyAppointmentsA = (token) => {
  return async (dispatch) => {
    const response = await getMyAppointments(token);
    if (response) {
      console.log(response);
      dispatch({ type: SET_MY_APPOINTMENTS, payload: response });
    }
  };
};

export const postAppointmentA = (token, appointment, payload) => {
  return async (dispatch) => {
    const response = await postAppointment(token, appointment, payload);
    if (response) {
      alert("Noleggio modificato con successo!");
      dispatch(getMyAppointmentsA(token));
    }
    console.log(response);
  };
};

export const deleteAppointmentA = (token, payload) => {
  return async (dispatch) => {
    const response = await deleteAppointment(token, payload);
    if (response) {
      alert(response.message);
      dispatch(getMyAppointmentsA(token));
    }
  };
};
