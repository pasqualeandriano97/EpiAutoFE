import { allVehicles } from "../../Data/vehicle";
export const GET_VEHICLES = "GET_VEHICLES";
export const TURN_OFF_SPINNER = "TURN_OFF_SPINNER";
export const TURN_ON_SPINNER = "TURN_ON_SPINNER";

export const getVehicles = (token, page) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TURN_ON_SPINNER });
      const response = await allVehicles(token, page);
      dispatch({ type: GET_VEHICLES, payload: response.content });
      console.log(response.content);
    } finally {
      dispatch({ type: TURN_OFF_SPINNER });
    }
  };
};
