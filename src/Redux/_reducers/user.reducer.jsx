/** @format */

import { userConstants } from "../_constants";
const initialState = {
  isLoggedIn: false,
  dataUser: {},
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.SET_DATA_USER:
      return {
        ...state,
        dataUser: action.payload,
      };
    case userConstants.SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case userConstants.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
