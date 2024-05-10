// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["viewerjs/dist/viewer.css", "@waline/client/style"],
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-directus",
    "nuxt-lodash",
    "dayjs-nuxt",
  ],
  tailwindcss: {
    editorSupport: true,
  },
  runtimeConfig: {
    public: {
      walineUrl: "",
      siteName: "CompileSoul",
      directus: {
        url: "",
      },
    },
  },
});
