/** @format */

import API_BASE from "../config";
import API from "../instance";

export function login(endpoint, body) {
  return API.post(`${API_BASE.apiUrl}/${endpoint}`, body);
}

export function register(endpoint, body) {
  return API.post(`${API_BASE.apiUrl}/${endpoint}`, body);
}

export function getUser(endpoint) {
  return API.get(`${API_BASE.apiUrl}/${endpoint}`);
}
export function getAllUsers(endpoint) {
  return API.get(`${API_BASE.apiUrl}/${endpoint}`);
}
export function updateUser(endpoint, body) {
  return API.put(`${API_BASE.apiUrl}/${endpoint}`, body);
}

export function updateRole(endpoint) {
  return API.put(`${API_BASE.apiUrl}/${endpoint}`);
}
