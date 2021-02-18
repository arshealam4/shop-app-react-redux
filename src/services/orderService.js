import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = apiUrl + "/orders";

export function getOrderItems() {
  return http.get(`${apiEndpoint}/get-all-order`);
}

export function placeOrder(data) {
  return http.post(`${apiEndpoint}/place-order`, data);
}
