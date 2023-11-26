/** @format */

import { combineReducers } from "@reduxjs/toolkit";
import { user } from "./user.reducer";
const rootReducer = combineReducers({
  user
});

export default rootReducer;
