import axios from "axios";
import {useRuntimeConfig} from "#imports";

export const API_URL = useRuntimeConfig().public.API_URL;
const $axios = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}/api`,
});

export default $axios;
