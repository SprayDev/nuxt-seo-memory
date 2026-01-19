export default defineNuxtConfig({
  runtimeConfig: {
    api: {
      fallbackSecureKey: process.env.NUXT_API_FALLBACK_SECURE_KEY,
      secureHeader: process.env.NUXT_API_SECURE_HEADER,
      // Sendico Api Secret
      apiSecret: process.env.NUXT_API_SECRET
    },
    public: {
      referralCookieName: 'referral-code',
      api: {
        // This is the URL of the API server.
        baseUrl: process.env.NUXT_API_BASE_URL,
        // Sendico Api Secret header name
        apiSecretHeaderName: 'Sendico-Secure',
        // Endpoint to get the cookie.
        cookieRequestUrl: '/sanctum/csrf-cookie',
        // Endpoint to get the user.
        userUrl: '/api/user',
        // Key of the user object to keep in the state.
        userKey: 'user',
        // Name of the cookie with the token.
        csrfCookieName: 'XSRF-TOKEN',
        // Name of the header with the token.
        csrfHeaderName: 'X-XSRF-TOKEN',
        // Name of the cookie from the API server.
        serverCookieName: 'set-cookie',
        // Redirect to the login page if the user is not authenticated.
        redirectUnauthenticated: true,
        // Redirect to the verification page if the user is not verified.
        redirectUnverified: true,

        // option for configuring other type of sanctum auth

        // Name of the cookie with auth token
        tokenCookieName: 'AUTH-TOKEN',
        // Name of the cookie for admin operations
        adminTokenCookieName: 'ADMIN-TOKEN',
        // Name of the cookie for login as user
        loginAsCookieName: 'LOGIN-AS-TOKEN',
        // Name of auth header
        httpAuthHeader: 'Authorization',
        // Type of authorization
        httpAuthType: 'Bearer'
      }
    }
  }
})
