import axios from "axios";
import {useRuntimeConfig} from "#imports";

export const API_URL = "https://us-admin-panel-backend.vercel.app"
const $axios = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}/api`,
});

export default $axios;
