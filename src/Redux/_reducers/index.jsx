/** @format */

import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./user.reducer";
const rootReducer = combineReducers({
  userReducer,
});

export default rootReducer;
