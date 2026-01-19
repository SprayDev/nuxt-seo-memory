import { joinURL } from 'ufo'
import type { H3Event } from 'h3'
import { normalizeHeaders } from '#layers/api/shared/utils/request-proxy'

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig()
  const proxyUrl = config.public.api.baseUrl
  const path = event.path.replace(/^\/api\//, '') // /api/users -> users
  const target = joinURL(proxyUrl, path)

  const ip = getRequestIP(event, {
    xForwardedFor: true
  })
  let clientIp = event.node.req.headers['x-forwarded-for'] || event.node.req.socket.remoteAddress
  if (Array.isArray(clientIp)) {
    clientIp = clientIp.at(0)
  }
  let clientCountry = event.node.req.headers['cf-ipcountry']
  if (Array.isArray(clientCountry)) {
    clientCountry = clientCountry.at(0)
  }

  // Normalize headers: Convert all values to string or undefined
  const normalizedHeaders = normalizeHeaders(getRequestHeaders(event))

  // Override specific headers
  normalizedHeaders['X-Forwarded-For'] = String(ip || clientIp || '')
  normalizedHeaders['cf-ipcountry'] = typeof clientCountry === 'string' ? clientCountry : ''
  normalizedHeaders['accept'] = 'application/json'

  // todo if put add _method in body

  return proxyRequest(event, target, {
    headers: normalizedHeaders
  })
})
