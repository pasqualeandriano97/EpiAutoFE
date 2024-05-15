import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { vehicleReducer } from "../reducers/vehicleReducer";
import { rentReducer } from "../reducers/rentReducer";
import { userReducer } from "../reducers/userReducer";
import { appointmentReducer } from "../reducers/appointmentReducer";

const globalReducer = combineReducers({
  vehicle: vehicleReducer,
  rent: rentReducer,
  user: userReducer,
  appointment: appointmentReducer,
});

const store = configureStore({
  reducer: globalReducer,
});

export default store;
