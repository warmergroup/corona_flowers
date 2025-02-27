import axios from "axios";
import $axios, {API_URL} from ".";

const $api = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}/api`,
});

$api.interceptors.request.use((config) => {
  // config.headers.Authorization = `Bearer ${sessionStorage.getItem('accessToken')}`;
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  return config;
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      try {
        const { data } = await $axios.get("/auth/refresh");
        // sessionStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("accessToken", data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return $api.request(originalRequest);
      } catch (err) {
        console.error("Not authorized", err);
      }
    }
    return Promise.reject(error);
  }
);

export default $api;
