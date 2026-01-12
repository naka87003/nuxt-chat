// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/test-utils", "@nuxt/image"],
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
        db: { driver: "vercelKV", name: "db" },
      },
    },
  },
  routeRules: {
    "/": { prerender: true },
  },
});
