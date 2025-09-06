// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  image: {
    domains: ["avatars.githubusercontent.com"],
  },
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["nuxt-auth-utils"],
});
