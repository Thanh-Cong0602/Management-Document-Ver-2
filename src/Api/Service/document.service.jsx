/** @format */

import API_BASE from "../config";
import API from "../instance";

export function createDocument(endpoint, body) {
  return API.post(`${API_BASE.apiUrl}/${endpoint}`, body);
}

export function getDocument(endpoint) {
  return API.get(`${API_BASE.apiUrl}/${endpoint}`);
}

export function updateDocument(endpoint, body) {
  return API.put(`${API_BASE.apiUrl}/${endpoint}`, body);
}


