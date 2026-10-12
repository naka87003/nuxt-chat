// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["@/assets/css/main.css"],
  modules: [
    "@nuxt/eslint",
    "@nuxt/test-utils",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxtjs/mdc",
    "nuxt-auth-utils",
  ],
  image: {
    domains: ["avatars.githubusercontent.com"],
  },
  mdc: {
    highlight: false,
  },
  runtimeConfig: {
    openaiApiKey: "",
  },
  nitro: {
    storage: {
      db: {
        driver: "fs",
        base: "./.data",
      },
    },
  },
  $production: {
    nitro: {
      storage: {
        db: {
          driver: "upstash",
          url: process.env.KV_REST_API_URL,
          token: process.env.KV_REST_API_TOKEN,
        },
      },
    },
  },
  routeRules: {
    "/": { prerender: true },
  },
});
