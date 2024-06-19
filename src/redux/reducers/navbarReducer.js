import { HIDE_NAVBAR, SHOW_NAVBAR } from "../actions/navbarActions";

const initialState = {
  show: true,
};

export const navbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case HIDE_NAVBAR:
      return {
        ...state,
        show: false,
      };
    case SHOW_NAVBAR:
      return {
        ...state,
        show: true,
      };
    default:
      return state;
  }
};
