import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { vehicleReducer } from "../reducers/vehicleReducer";
import { rentReducer } from "../reducers/rentReducer";
import { userReducer } from "../reducers/userReducer";
import { appointmentReducer } from "../reducers/appointmentReducer";
import { navbarReducer } from "../reducers/navbarReducer";

const globalReducer = combineReducers({
  vehicle: vehicleReducer,
  rent: rentReducer,
  user: userReducer,
  appointment: appointmentReducer,
  navbar: navbarReducer,
});

const store = configureStore({
  reducer: globalReducer,
});

export default store;
