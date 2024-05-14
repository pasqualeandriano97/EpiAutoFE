import {
  GET_VEHICLES,
  RESET_VEHICLES,
  TURN_OFF_SPINNER,
  TURN_ON_SPINNER,
  UPDATE_PAGE,
} from "../actions/vehicleActions";

const initialState = {
  content: [],
  loading: false,
  page: 0,
};

export const vehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VEHICLES:
      return {
        ...state,
        content: action.payload,
      };
    case RESET_VEHICLES:
      return initialState;
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
    case UPDATE_PAGE:
      return {
        ...state,
        page: action.payload.page,
        firstPage: action.payload.firstPage,
        lastPage: action.payload.lastPage,
        totalPages: action.payload.totalPages,
      };
    default:
      return state;
  }
};
