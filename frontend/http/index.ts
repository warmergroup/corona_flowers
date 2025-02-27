import axios from "axios";
// import {useRuntimeConfig} from '#imports';

// const config = useRuntimeConfig();
// export const API_URL = config.public.API_URL || 'https://localhost:8080 '; // deploy qilinganida ishlatish uchun
export const API_URL = "https://us-admin-panel-backend.vercel.app"
const $axios = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}/api`,
});

export default $axios;