export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: ["nuxt-quasar-ui", "@pinia/nuxt", "@nuxt/devtools"],

  quasar: {
    extras: {
      fontIcons: ["material-icons"],
    },
    sassVariables: "css/quasar.variables.scss",
  },

  imports: {
    dirs: ["./stores"],
  },

  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate"],
  },
});
