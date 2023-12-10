/** @format */

import { userConstants } from "../_constants";

export const setDataUser = (dataUser) => {
  return {
    type: userConstants.SET_DATA_USER,
    payload: dataUser,
  };
};

export const setLoggedIn = (loggedIn) => {
  return {
    type: userConstants.SET_LOGGED_IN,
    payload: loggedIn,
  };
};

export const setIdUser = (idUser) => {
  return {
    type: userConstants.SET_ID_USER,
    payload: idUser,
  };
};
