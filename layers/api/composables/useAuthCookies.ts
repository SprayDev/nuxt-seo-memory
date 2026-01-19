export const useAuthCookies = () => {
  const config = useRuntimeConfig()

  const adminCookieRef = useCookie(config.public.api.adminTokenCookieName, {
    maxAge: 60 * 60 * 24 * 7
  })
  const loginAsCookieRef = useCookie(config.public.api.loginAsCookieName, {
    maxAge: 60 * 60 * 24 * 7
  })
  const userTokenCookie = useCookie(config.public.api.tokenCookieName, {
    maxAge: 60 * 60 * 24 * 7
  })

  return {
    adminCookieRef,
    loginAsCookieRef,
    userTokenCookie
  }
}
