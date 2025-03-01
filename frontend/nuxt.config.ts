export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: {enabled: false},
  modules: ["@nuxt/ui", "@nuxt/image", "@pinia/nuxt"],
  plugins: ["~/plugins/vue-query.ts"],
  // runtimeConfig: {
  //   public: {
  //     API_URL: "http://localhost:8080"
  //   }
  // }
});
