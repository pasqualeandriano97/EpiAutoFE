import {
  SET_CURRENT_CAR,
  SET_PREVENTIVE,
  SHOW_MODAL,
  HIDE_MODAL,
  SET_MY_RENTS,
} from "../actions/rentActions";

const initialState = {
  currentCar: "",
  preventive: "",
  myRents: [],
  show: false,
};

export const rentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_CAR:
      return {
        ...state,
        currentCar: action.payload,
      };
    case SET_PREVENTIVE:
      console.log("Date received in reducer:", action.payload);
      return {
        ...state,
        preventive: action.payload,
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
    case SET_MY_RENTS:
      return {
        ...state,
        myRents: action.payload,
      };
    default:
      return state;
  }
};
