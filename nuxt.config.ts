// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/i18n',
    'nuxt-site-config',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-seo-utils',
    'nuxt-schema-org'
  ],
  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_URL,
    compilation: {
      strictMessage: false,
      escapeHtml: false
    },
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    locales: [
      {
        name: 'English',
        native: 'English',
        code: 'en',
        file: 'translations.ts',
        language: 'en-US'
      },
      {
        name: 'Spanish',
        native: 'Español',
        code: 'es',
        file: 'translations.ts',
        language: 'es-ES'
      },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      fallbackLocale: 'en'
    }
  },
  // ogImage: {
  //   enabled: true
  // },
  // sitemap: {
  //   enabled: true
  // },
  // robots: {
  //   enabled: true
  // },
  // seo: { // seo utils
  //   enabled: true
  // },
  // schemaOrg: {
  //   enabled: true
  // },
  // linkChecker: {
  //   enabled: true
  // },
  // site: {
  //   enabled: true
  // }
})
