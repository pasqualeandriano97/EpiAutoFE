import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { vehicleReducer } from "../reducers/vehicleReducer";

const globalReducer = combineReducers({
  vehicle: vehicleReducer,
});

const store = configureStore({
  reducer: globalReducer,
});

export default store;
