import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = apiUrl + "/categories";

export function getCategoryItems() {
  return http.get(`${apiEndpoint}/get-all-category`);
}
