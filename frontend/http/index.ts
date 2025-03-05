import axios from "axios";
import { getApiUrl } from "./getApiUrl";

export const API_URL = getApiUrl();

const $axios = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}/api`,
});

export default $axios;
