import axios from "axios";

export const API_URL = "http://localhost:4000";

export const $api_config = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});
