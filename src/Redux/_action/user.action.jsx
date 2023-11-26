/** @format */

import { userConstants } from "../_constants";

export const setDataUser = (dataUser) => {
  return {
    type: userConstants.SET_DATA_USER,
    payload: dataUser,
  };
};
