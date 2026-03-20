// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["./layers/base/app/assets/css/main.css"],
  modules: ["@nuxt/ui", "@nuxtjs/mdc"],
  mdc: {
    highlight: false,
  },
});
