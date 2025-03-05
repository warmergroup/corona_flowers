export const getApiUrl = () => {
  return process.env.NUXT_PUBLIC_API_URL || "http://localhost:8080";
};
