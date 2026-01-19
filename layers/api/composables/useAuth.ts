import type { User } from '#layers/api/models/user'
import { useCartState } from '#layers/api/stores/useCartStore'
import type { LoginResponse } from '#layers/api/services/authentication-service'

export const useAuth = () => {
  const config = useRuntimeConfig()
  const { authentication } = useApi()
  const { user } = useUser()
  const cart = useCartState()
  const { initCartState: initCart } = cart

  const { adminCookieRef, loginAsCookieRef, userTokenCookie } = useAuthCookies()

  const referralCode = useCookie(config.public.referralCookieName)

  const isAuthenticated = computed(() => user.value !== null)

  async function fetchUser() {
    user.value = await authentication.user()
  }

  async function updateUserData(updateData: Partial<User>) {
    if (!user.value) {
      return
    }
    // use-optimistic update
    user.value = {
      ...user.value,
      ...updateData
    }

    // parse real data from server
    await fetchUser()
  }

  async function socialLogin(provider: string, providerData: Record<string, unknown>) {
    const { data, error } = await processFetch<string>(() =>
      authentication.socialLogin(provider, {
        ...providerData,
        referral: referralCode.value
      })
    )

    if (error) {
      return { data, error }
    }

    await fetchUser()
    await initCart()

    navigateReplaceTo(config.public.homeUrl)
  }

  async function login(
    email: string,
    password: string,
    remember = true
  ): Promise<{
    data: LoginResponse | null
    error: FetchError | null
  }> {
    if (isAuthenticated.value) {
      return {
        data: null,
        error: null
      }
    }

    const wishPage = useCookie('wish-page')

    const { data, error } = await processFetch(() => authentication.login(email, password, remember))
    if (error) {
      return { data, error }
    }
    await fetchUser()
    await initCart()

    if (wishPage.value) {
      const url = wishPage.value
      wishPage.value = null
      await localeNavigateTo(url)
    } else {
      await localeNavigateTo(config.public.homeUrl)
    }

    return {
      data: null,
      error: null
    }
  }

  function setAuthToken(token: string) {
    userTokenCookie.value = token
  }

  function currentToken() {
    return userTokenCookie.value
  }

  async function register(
    login: string,
    password: string,
    fullName: string,
    confirmPassword: string,
    captcha: string,
    referral?: string
  ) {
    if (isAuthenticated.value) {
      return {
        error: null,
        data: null
      }
    }
    const { data, error } = await processFetch(() =>
      authentication.register(fullName, login, password, confirmPassword, referral, captcha)
    )
    if (error) {
      return { data, error }
    }
    await fetchUser()

    await localeNavigateTo(config.public.verificationUrl)

    return { data, error }
  }

  async function logout(): Promise<void> {
    if (!isAuthenticated.value) {
      return
    }

    await navigateTo('/logout', { external: true })
  }

  return {
    adminCookieRef,
    loginAsCookieRef,
    userTokenCookie,
    user,
    isAuthenticated,
    login,
    fetchUser,
    setAuthToken,
    currentToken,
    register,
    logout,
    socialLogin,
    updateUserData
  }
}
