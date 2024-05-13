import { SET_CURRENT_CAR, SET_PREVENTIVE } from "../actions/rentActions";

const initialState = {
  currentCar: "",
  preventive: "",
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
    default:
      return state;
  }
};
