/** @format */

import API_BASE from "../config";
import API from "../instance";

export function getDoc(endpoint) {
  return API.get(`${API_BASE.apiUrl}/document/${endpoint}`);
}
