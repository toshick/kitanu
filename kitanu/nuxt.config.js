export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'spa',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, minimum-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      { name: 'apple-mobile-web-app-title', content: 'KitakitaNu' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        href: '/ios/AppIcon.appiconset/iphone_app60x60@2x.png',
        sizes: '72x72',
      },
      {
        rel: 'apple-touch-icon',
        href: '/ios/AppIcon.appiconset/iphone_app60x60@2x.png',
        sizes: '114x114',
      },
      {
        rel: 'apple-touch-icon',
        href: '/ios/AppIcon.appiconset/iphone_app60x60@2x.png',
        sizes: '120x120',
      },
      {
        rel: 'apple-touch-icon',
        href: '/ios/AppIcon.appiconset/iphone_app60x60@2x.png',
        sizes: '144x144',
      },
      {
        rel: 'preload',
        href: 'https://fonts.googleapis.com/earlyaccess/nicomoji.css',
        as: 'style',
      },
    ],
    script: [
      {
        src: 'https://unpkg.com/ionicons@5.1.2/dist/ionicons/ionicons.esm.js',
        type: 'module',
        rel: 'preload',
      },
      {
        src: 'https://unpkg.com/ionicons@5.1.2/dist/ionicons/ionicons.js',
        nomodule: '',
        rel: 'preload',
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: [{ src: 'assets/css/app.scss', lang: 'scss' }],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ['plugins/global.ts', 'plugins/v-longpress', 'plugins/firebase'],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  /**
   * publicRuntimeConfig
   */
  publicRuntimeConfig: {
    // firebase
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY || '',
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN || '',
    FIREBASE_DB_URL: process.env.FIREBASE_DB_URL || '',
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || '',
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET || '',
    FIREBASE_MGS_SENDER_ID: process.env.FIREBASE_MGS_SENDER_ID || '',
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID || '',
    // firebase login
    DEV_USER_EMAIL: process.env.DEV_USER_EMAIL || '',
    DEV_USER_PASS: process.env.DEV_USER_PASS || '',
  },
};
