import { SET_CURRENT_CAR } from "../actions/rentActions";

const initialState = {
  currentCar: "",
};

export const rentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_CAR:
      return {
        ...state,
        currentCar: action.payload,
      };
    default:
      return state;
  }
};
