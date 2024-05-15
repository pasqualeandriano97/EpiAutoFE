import {
  SET_APPOINTMENT_CAR,
  SET_APPOINTMENT,
  SET_SUMMARY,
  SET_MY_APPOINTMENTS,
  SHOW_MODAL,
  HIDE_MODAL,
  RESET_REDUX_APPOINTMENT,
} from "../actions/appointmentActions";

const initialState = {
  currentCar: "",
  currentAppointment: "",
  summary: "",
  myAppointments: [],
  show: false,
};

export const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_APPOINTMENT_CAR:
      return {
        ...state,
        currentCar: action.payload,
      };
    case SET_SUMMARY:
      return {
        ...state,
        summary: action.payload,
      };
    case SET_MY_APPOINTMENTS:
      return {
        ...state,
        myAppointments: action.payload,
      };
    case SET_APPOINTMENT:
      return {
        ...state,
        currentAppointment: action.payload,
      };
    case RESET_REDUX_APPOINTMENT:
      return {
        currentCar: "",
        currentAppointment: "",
        summary: "",
        myAppointments: [],
        show: false,
      };
    case SHOW_MODAL:
      return {
        ...state,
        show: true,
      };
    case HIDE_MODAL:
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
};
