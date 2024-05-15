import {
  SET_APPOINTMENT_CAR,
  SET_SUMMARY,
  SHOW_MODAL,
  HIDE_MODAL,
} from "../actions/appointmentActions";

const initialState = {
  currentCar: {},
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
