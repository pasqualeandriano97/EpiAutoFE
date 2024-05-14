import { allVehicles } from "../../Data/vehicle";
export const GET_VEHICLES = "GET_VEHICLES";
export const TURN_OFF_SPINNER = "TURN_OFF_SPINNER";
export const TURN_ON_SPINNER = "TURN_ON_SPINNER";
export const UPDATE_PAGE = "UPDATE_PAGE";
export const RESET_VEHICLES = "RESET_VEHICLES";

export const getVehicles = (token, page) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TURN_ON_SPINNER });
      const response = await allVehicles(token, page);
      dispatch({ type: GET_VEHICLES, payload: response.content });
      dispatch({
        type: UPDATE_PAGE,
        payload: {
          page: response.number,
          firstPage: response.first,
          lastPage: response.last,
          totalPages: response.totalPages,
        },
      });
    } finally {
      dispatch({ type: TURN_OFF_SPINNER });
    }
  };
};
