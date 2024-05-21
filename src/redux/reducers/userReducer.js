import { SAVE_TOKEN, SAVE_USER } from "../actions/userActions";

const initialState = {
  token: "",
  user: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SAVE_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
