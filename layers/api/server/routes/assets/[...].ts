import { joinURL } from 'ufo'
import type { H3Event } from 'h3'
import { normalizeHeaders } from '#layers/api/shared/utils/request-proxy'

export default defineEventHandler((event: H3Event) => {
  const proxyUrl = useRuntimeConfig().public.assetDomain
  const path = event.path
  const target = joinURL(proxyUrl, path)
  const config = useRuntimeConfig()
  const apiConfig = config.public.api
  const cookies = parseCookies(event)

  const token = cookies[apiConfig.tokenCookieName]

  // Normalize headers: Convert all values to string or undefined
  const normalizedHeaders = normalizeHeaders(getRequestHeaders(event))

  normalizedHeaders['Authorization'] = `${apiConfig.httpAuthType} ${token}`

  return proxyRequest(event, target, {
    headers: normalizedHeaders
  })
})
