export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'github-auth-demo',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    proxy: true
  },
  auth: {
    auth: {
      localStorage: false,
      cookie: {
        prefix: 'tsterp-auth.',
        options: {
          path: '/',
        },
      },
      redirect: {
        login: '/login',
        logout: '/login',
        callback: '/login',
        home: '/',
      },
      resetOnError: true,
      strategies: {
        github: {
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET
        },
        local: {
          token: {
            property: 'token',
            required: true,
            type: 'Bearer',
          },
          user: {
            property: '',
          },
          endpoints: {
            login: { url: '/v1/auth/login', method: 'post' },
            logout: false,
            user: { url: '/v1/employees/me', method: 'get' },
          },
        },
        jira: {
          scheme: 'oauth2',
          endpoints: {
            authorization: 'https://auth.atlassian.com/authorize',
            token: process.env.API_URL + '/v1/auth/jira-login',
            userInfo: '/v1/employees/me',
            logout: false,
          },
          audience: 'api.atlassian.com',
          token: {
            property: 'token',
            type: 'Bearer',
            required: true,
          },
          responseType: 'code',
          grantType: 'authorization_code',
          redirectUri: process.env.JIRA_REDIRECT_URI,
          clientId: process.env.JIRA_CLIENT_ID,
          scope: [
            'read:me',
            'read:jira-work',
            'write:jira-work',
            'offline_access',
          ],
          codeChallengeMethod: '',
          responseMode: '',
          acrValues: '',
        },
      },
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
