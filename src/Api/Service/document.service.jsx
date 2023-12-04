/** @format */

import API_BASE from "../config";
import API from "../instance";

export function createDocument(endpoint, body, cb) {
  return API.post(`${API_BASE.apiUrl}/${endpoint}`, body, cb);
}

export function getDocument(endpoint) {
  return API.get(`${API_BASE.apiUrl}/${endpoint}`);
}

export function updateDocument(endpoint, body) {
  return API.put(`${API_BASE.apiUrl}/${endpoint}`, body);
}
