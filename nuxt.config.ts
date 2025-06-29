// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/eslint", "@nuxt/test-utils", "@nuxt/ui", "@nuxtjs/mdc"],
  // imports: {
  //   scan: false,
  // },
  runtimeConfig: {
    openaiApiKey: "",
    public: {
      // someValue: "on the frontend!",
    },
  },
  mdc: {
    highlight: {
      theme: "material-theme-palenight",
      langs: ["html", "markdown", "vue", "typescript", "javascript"],
    },
  },
});
