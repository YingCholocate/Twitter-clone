// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: ['@nuxtjs/tailwindcss'],

  runtimeConfig:{
    jwtAcessSecreat:process.env.JWT_ACESS_TOKEN_SECREAT,
    jwtRefreshSecreat:process.env.JWT_REFRESH_TOKEN_SECREAT,
  }
});
