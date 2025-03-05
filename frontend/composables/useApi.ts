export const getApiUrl = () => {
  if (process.server) {
    // Server tarafda process.env dan olamiz
    return process.env.API_URL || "http://localhost:8080";
  } else {
    // Client tarafda useRuntimeConfig() dan olamiz
    return useRuntimeConfig().public.apiBase;
  }
};
