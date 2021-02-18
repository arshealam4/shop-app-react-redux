import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = apiUrl + "/products";

export function getItems(params = {}) {
  const catId = (params && params.catId !== undefined && params.catId !== "1") ? params.catId : "";
  const status = "active";
  const url = `${apiEndpoint}/get-all-product?status=${status}&catId=${catId}`;
  return http.get(url);
}
