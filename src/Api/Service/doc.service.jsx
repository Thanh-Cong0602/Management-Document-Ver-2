/** @format */

import API_BASE from "../config";
import API from "../instance";

export function getDoc(endpoint) {
  return API.get(`${API_BASE.apiUrl}/document/${endpoint}`);
}

export function createDoc(endpoint, body) {
  return API.post(`${API_BASE.apiUrl}/document/${endpoint}`, body);
}

export function updateDoc(endpoint, body) {
  return API.put(`${API_BASE.apiUrl}/document/${endpoint}`, body);
}

export function deleteDoc(endpoint, body) {
  return API.delete(`${API_BASE.apiUrl}/document/${endpoint}`, body);
}


