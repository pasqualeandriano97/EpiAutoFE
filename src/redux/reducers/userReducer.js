import { SAVE_TOKEN } from "../actions/userActions";

const initialState = {
  token: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};
