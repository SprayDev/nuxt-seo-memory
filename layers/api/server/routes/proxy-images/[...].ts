import { joinURL } from 'ufo'
import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const proxyUrl = useRuntimeConfig().public.assetDomain
  const target = joinURL(proxyUrl, event.path)

  return proxyRequest(event, target, {
    headers: {
      Accept: event.headers.get('Accept') || ''
    }
  })
})
