import {
  GET_VEHICLES,
  TURN_OFF_SPINNER,
  TURN_ON_SPINNER,
} from "../actions/vehicleActions";

const initialState = {
  content: [],
  loading: false,
};

export const vehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VEHICLES:
      return {
        ...state,
        content: action.payload,
      };
    case TURN_ON_SPINNER:
      return {
        ...state,
        loading: true,
      };
    case TURN_OFF_SPINNER:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
