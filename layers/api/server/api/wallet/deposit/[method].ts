import { joinURL } from 'ufo'

export default defineEventHandler(async (event) => {
  const method = getRouterParam(event, 'method')
  const config = useRuntimeConfig()
  const proxyUrl = config.public.api.baseUrl
  const apiConfig = config.public.api
  const cookies = parseCookies(event)

  const authToken = cookies[apiConfig.tokenCookieName]
  let path = `wallet/deposit/${method}`
  if (method === 'invoice') {
    path = `${path}/payment`
  }
  const target = joinURL(proxyUrl, path)

  const body = await readBody(event)

  const response = await $fetch.raw(target, {
    method: 'POST',
    body: {
      ...body,
      auth_token: authToken
    },
    redirect: 'manual'
  })

  const setCookie = response.headers.get('set-cookie')
  if (setCookie) {
    // set-cookie can be an array; forward all
    for (const cookie of Array.isArray(setCookie) ? setCookie : [setCookie]) {
      setHeader(event, 'Set-Cookie', cookie)
    }
  }

  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get('location') ?? '/dashboard/wallet'
    return sendRedirect(event, location)
  }

  // Handle PDF response
  const contentType = response.headers.get('content-type')
  if (contentType?.includes('application/pdf')) {
    // Set headers for PDF display
    setHeader(event, 'Content-Type', 'application/pdf')
    setHeader(event, 'Content-Disposition', 'inline; filename="document.pdf"')

    // Copy other relevant headers
    const contentLength = response.headers.get('content-length')
    if (contentLength) {
      setHeader(event, 'Content-Length', Number(contentLength))
    }

    // Return the PDF stream
    return response._data
  }

  if (['veritrans', 'union'].includes(method as string) && response.status === 200) {
    return response._data
  }

  return sendRedirect(event, '/dashboard/wallet')
})
