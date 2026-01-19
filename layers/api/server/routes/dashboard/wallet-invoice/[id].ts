import { joinURL } from 'ufo'
import type { H3Event } from 'h3'
import { normalizeHeaders } from '../../../../shared/utils/request-proxy'

export default defineEventHandler(async (event) => {
  const invoiceId = getRouterParam(event, 'id')
  const config = useRuntimeConfig()
  const proxyUrl = config.public.api.baseUrl
  const apiConfig = config.public.api
  const cookies = parseCookies(event)

  const authToken = cookies[apiConfig.tokenCookieName]
  const path = `wallet/deposit-invoice/${invoiceId}`
  const target = joinURL(proxyUrl, path)
  const body = await getQuery(event)

  const requestOptions = {
    body
  }

  const hmacData = getDataForHmacFromFetch(requestOptions, path)
  const message = JSON.stringify(hmacData)
  // const signature = generateHmac(message, secretKey)

  const normalizedHeaders = normalizeHeaders(getRequestHeaders(event))

  // Override specific headers
  normalizedHeaders[apiConfig.httpAuthHeader] = `${apiConfig.httpAuthType} ${authToken}`
  // normalizedHeaders['x-sendico-signature'] = signature
  // normalizedHeaders['x-sendico-nonce'] = hmacData.nonce
  // normalizedHeaders['x-sendico-timestamp'] = String(hmacData.timestamp)

  return proxyRequest(event, target, {
    headers: normalizedHeaders,
    onResponse(event: H3Event, response: Response) {
      if (response.status !== 200) {
        throw createError({
          statusCode: 500,
          statusMessage: 'Cant find wallet invoice'
        })
      }
    }
  })
})
