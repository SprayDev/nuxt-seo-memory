import type { $Fetch, FetchOptions } from 'ofetch'
import { useSecureApi } from '#layers/api/stores/useSecretKeys'
import ApiError from '#layers/api/errors/api-error'
import type { User } from '#layers/api/models/user'
import { generateHmac, getDataForHmacFromFetch } from '#layers/api/shared/utils/hmac'
import { LoginException } from '#layers/api/exceptions/login-exception'
import type { ApiServiceContainer } from '#layers/api/services/api-service-container'
import ApplicationService from '#layers/api/services/application-service'
import AuthenticationService from '#layers/api/services/authentication-service'
import FileService from '#layers/api/services/file-service'
import ShopService from '#layers/api/services/shop-service'
import ReviewService from '#layers/api/services/review-service'
import BlogService from '#layers/api/services/blog-service'
import ProfileService from '#layers/api/services/profile-service'
import ShopAyahooService from '#layers/api/services/shop-ayahoo-service'
import ShopMercariService from '#layers/api/services/shop-mercari-service'
import ShopRakumaService from '#layers/api/services/shop-rakuma-service'
import ShopHardoffService from '#layers/api/services/shop-hardoff-service'
import ShopAmazonService from '#layers/api/services/shop-amazon-service'
import ShopCartService from '#layers/api/services/shop-cart-service'
import MessengerService from '#layers/api/services/messenger-service'
import GeoService from '#layers/api/services/geo-service'
import CalculatorService from '#layers/api/services/calculator-service'
import { FaqsService } from '#layers/api/services/faq-service'
import SendicoCategoryService from '#layers/api/services/sendico-category-service'
import UserDestinationService from '#layers/api/services/user/user-destination-service'
import UserDepositService from '#layers/api/services/user/user-deposit-service'
import UserParcelService from '#layers/api/services/user/user-parcel-service'
import UserOrderService from '#layers/api/services/user/user-order-service'
import UserBidService from '#layers/api/services/user/user-bid-service'
import { UserFavoritesService } from '#layers/api/services/user/user-favorites-service'
import { UserFeedbackService } from '#layers/api/services/user/user-feedback'
import UserAffiliateService from '#layers/api/services/user/user-affiliate-service'
import { UserSeaService } from '#layers/api/services/user/user-sea-service'
import { UserSearchService } from '#layers/api/services/user/user-search-service'
import UserRecommendationsService from '#layers/api/services/user/user-recommendations-service'
import ShipmentDetailsService from '#layers/api/services/shipment-details-service'
import { useCartState } from '#layers/api/stores/useCartStore'
import type { Cart } from '#layers/api/models/cart'
import { usePageTitles } from '#layers/api/composables/usePageMeta'
import type { PageTitle } from '#layers/api/models/page-title'

const SECURE_METHODS = new Set(['post', 'delete', 'put', 'patch', 'get'])

type HeaderValueType = Record<string, string>

const UNAUTHENTICATED_STATUSES = new Set([401, 419])

const UNVERIFIED_USER_STATUS = 409
const SUCCESS_STATUS = 200
const ACCESS_DENIED_STATUS = 403

type AppGettersData = {
  user: () => Promise<User | null>
  pageTitles: () => Promise<PageTitle[]>
  cart: () => Promise<Cart[]>
}

export default defineNuxtPlugin({
  name: 'api-client',
  dependsOn: ['i18n:plugin'],
  async setup(nuxtApp) {
    const config = useRuntimeConfig()
    const { setKeys, todayKey } = useSecureApi()

    const { user } = useUser()
    const { cart } = useCartState()
    const pageTitles = usePageTitles()
    const { $i18n } = useNuxtApp()
    const { locale } = $i18n
    const appVersion = ref<string | null | undefined>()

    const apiConfig = config.public.api
    const { adminCookieRef, loginAsCookieRef, userTokenCookie: authTokenRef } = useAuthCookies()

    async function getVersion(): Promise<string | null | undefined> {
      return undefined
      if (import.meta.server) {
        return undefined
      }
      const data = await $fetch<{ version: string }>('/version.json?' + new Date().getTime())
      return data?.version
    }

    appVersion.value = await getVersion()

    async function getSecretKeys() {
      if (!import.meta.server) {
        return []
      }
      const data = await $fetch('/api/secret-keys', {
        headers: {
          'x-secure-header': config.api.secureHeader
        }
      })
      setKeys([...data])
    }

    if (import.meta.server) {
      await getSecretKeys()
    }

    async function initAppData(appGetters: AppGettersData, authenticated: boolean) {
      const [cartData, userData, pageTitlesData] = await Promise.allSettled([
        authenticated ? appGetters.cart() : Promise.resolve([]),
        authenticated ? appGetters.user() : Promise.resolve(null),
        appGetters.pageTitles()
      ])

      if (userData.status === 'fulfilled') {
        user.value = userData.value
      } else {
        if (
          userData.reason instanceof ApiError &&
          (UNAUTHENTICATED_STATUSES.has(userData.reason.statusCode) ||
            userData.reason.statusCode === ACCESS_DENIED_STATUS)
        ) {
          console.warn('[API initUser] User is not authenticated')
          authTokenRef.value = undefined
        }
      }

      if (cartData.status === 'fulfilled') {
        cart.value = cartData.value
      } else {
        cart.value = []
      }

      if (pageTitlesData.status === 'fulfilled') {
        pageTitles.value = pageTitlesData.value
      } else {
        pageTitles.value = []
      }
    }

    function buildServerHeaders(headers: Headers): HeaderValueType {
      // const csrfToken = useCookie(apiConfig.csrfCookieName).value;
      const clientCookies = useRequestHeaders(['cookie'])
      const forwardToHeader = useRequestHeaders(['x-forwarded-for'])
      const ipCountryHeader = useRequestHeaders(['cf-ipcountry'])
      const authToken = authTokenRef.value

      const basicHeaders = {
        'SENDICO-LANGUAGE': locale.value as string,
        Accept: headers?.get('Accept') ?? '',
        Referer: config.public.baseUrl,
        'x-forwarded-for': forwardToHeader?.['x-forwarded-for'] ?? '',
        'cf-ipcountry': ipCountryHeader?.['cf-ipcountry'] ?? ''
      }

      return {
        // ...headers,
        ...(clientCookies.cookie && clientCookies),
        // ...(csrfToken && { [apiConfig.csrfHeaderName]: csrfToken }),
        ...(authToken && { [apiConfig.httpAuthHeader]: `${apiConfig.httpAuthType} ${authToken}` }),
        ...basicHeaders
      }
    }

    function buildClientHeaders(headers: Headers): HeaderValueType {
      // await $fetch(apiConfig.cookieRequestUrl, {
      //   baseURL: apiConfig.baseUrl,
      //   credentials: 'include',
      // });

      // const csrfToken = useCookie(apiConfig.csrfCookieName).value;
      const authToken = authTokenRef.value

      const basicHeaders = {
        'SENDICO-LANGUAGE': locale.value,
        Accept: headers?.get('Accept') ?? ''
      }

      return {
        // ...headers,
        ...basicHeaders,
        ...(authToken && { [apiConfig.httpAuthHeader]: `${apiConfig.httpAuthType} ${authToken}` }),
        ...(appVersion.value && { 'x-sendico-version': appVersion.value })
        // ...(csrfToken && { [apiConfig.csrfHeaderName]: csrfToken }),
      }
    }

    const httpOptions: FetchOptions = {
      baseURL: '/api',
      credentials: 'include',
      headers: {
        Accept: 'application/json'
      },
      retry: false,

      async onRequest({ options, request }) {
        let requestHeaders: HeaderValueType = {}
        if (import.meta.server) {
          requestHeaders = buildServerHeaders(options.headers)
        }

        if (import.meta.client) {
          // if options.method empty its get
          const method = options.method?.toLocaleLowerCase() ?? 'get'
          if (!SECURE_METHODS.has(method)) {
            return
          }

          requestHeaders = buildClientHeaders(options.headers)
        }

        const hmacData = getDataForHmacFromFetch(options, request)
        const message = JSON.stringify(hmacData)
        const signature = generateHmac(message, todayKey.value as string)

        const hmacHeaders = {
          'x-sendico-signature': signature,
          'x-sendico-nonce': hmacData.nonce,
          'x-sendico-timestamp': String(hmacData.timestamp)
        }

        requestHeaders = {
          ...requestHeaders,
          ...hmacHeaders
        }

        Object.entries(requestHeaders).forEach(([key, value]) => {
          options.headers.set(key, value)
        })
      },

      onResponse({ response }) {
        if (response.status === SUCCESS_STATUS) {
          // if response type of Blob, do nothing with it
          if (response._data instanceof Blob) {
            return
          }

          // all success responses from api rounded in "data" key
          response._data = response._data.data
        }

        if (response._data?.token && (response.url.includes('login') || response.url.includes('register'))) {
          // save token
          authTokenRef.value = response._data.token
        }
        if (import.meta.server) {
          // TODO remove return if we want use CSRF
          return
          // need for csrf auth
          const rawCookiesHeader = response.headers.get(apiConfig.serverCookieName)

          if (rawCookiesHeader === null) {
            return
          }

          // const cookies = splitCookiesString(rawCookiesHeader);

          // for (const cookie of cookies) {
          //   appendHeader(event, apiConfig.serverCookieName, cookie);
          // }
        }
      },

      async onResponseError({ response }) {
        if (
          apiConfig.redirectUnauthenticated &&
          UNAUTHENTICATED_STATUSES.has(response.status) &&
          !Object.values(LoginException).includes(response._data?.code)
        ) {
          await localeNavigateTo(config.public.loginUrl)
          return
        }

        if (apiConfig.redirectUnverified && response.status === UNVERIFIED_USER_STATUS) {
          await localeNavigateTo(config.public.verificationUrl)
          return
        }

        if (response._data) {
          throw new ApiError({
            ...response._data,
            statusCode: response.status,
            statusMessage: response._data.message || ''
          })
        }
      }
    }

    const client: $Fetch = $fetch.create(httpOptions) as $Fetch

    const api: ApiServiceContainer = {
      application: new ApplicationService(client),
      authentication: new AuthenticationService(client),
      file: new FileService(client),
      shop: new ShopService(client),
      review: new ReviewService(client),
      blog: new BlogService(client),
      profile: new ProfileService(client),
      shopAyahoo: new ShopAyahooService(client),
      shopMercari: new ShopMercariService(client),
      shopRakuma: new ShopRakumaService(client),
      shopHardoff: new ShopHardoffService(client),
      shopAmazon: new ShopAmazonService(client),
      shopCart: new ShopCartService(client),
      messenger: new MessengerService(client),
      geo: new GeoService(client),
      calculator: new CalculatorService(client),
      faqs: new FaqsService(client),
      sendicoCategory: new SendicoCategoryService(client),
      user: {
        destination: new UserDestinationService(client),
        deposit: new UserDepositService(client),
        parcel: new UserParcelService(client),
        order: new UserOrderService(client),
        bid: new UserBidService(client),
        favorites: new UserFavoritesService(client),
        feedback: new UserFeedbackService(client),
        affiliate: new UserAffiliateService(client),
        sea: new UserSeaService(client),
        search: new UserSearchService(client),
        recommendations: new UserRecommendationsService(client)
      },
      shipmentDetails: new ShipmentDetailsService(client)
    }

    /** LOGIN AS USER
     *  Set auth token from our subdomain if it exists
     **/
    if (adminCookieRef.value && loginAsCookieRef.value && loginAsCookieRef.value !== authTokenRef.value) {
      authTokenRef.value = loginAsCookieRef.value
      reloadNuxtApp()
    }

    if (import.meta.server && user.value === null) {
      await initAppData(
        {
          user: () => api.authentication.user(),
          cart: () => api.shopCart.getCartData(),
          pageTitles: () => api.application.pageTitles()
        },
        !!authTokenRef.value
      )
    }

    return {
      provide: {
        api
      }
    }
  }
})
