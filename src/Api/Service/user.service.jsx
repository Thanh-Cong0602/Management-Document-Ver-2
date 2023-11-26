import API_BASE from "../config";
import API from "../instance";

export function login(endpoint, body) {
  return API.post(`${API_BASE.apiUrl}/${endpoint}`, body);
}
