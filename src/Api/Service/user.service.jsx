import API_BASE from "../config";
import API from "../instance";

export function login(endpoint) {
  return API.get(`${API_BASE.apiUrl}/${endpoint}`);
}

export function getUser(endpoint) {
  return API.get(`${API_BASE.apiUrl}/${endpoint}`);
}

export function updateUser(endpoint, body) {
  return API.put(`${API_BASE.apiUrl}/${endpoint}`, body);
}
