export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const secureHeader = getHeader(event, 'x-secure-header')
  if (secureHeader !== config.api.secureHeader) {
    setResponseStatus(event, 403)
    return 'forbidden'
  }

  // get data from request

  const storage = useStorage('redis')

  const secretKeys = await storage.getItem<{ date: string; key: string }[]>('secret_keys')
  const dumbSecretKeys = (await storage.getItem<string[]>('dumb_secret_keys')) ?? []
  const fallbackKey = config.api?.fallbackSecureKey

  if (!secretKeys) {
    return [...dumbSecretKeys, fallbackKey]
  }

  const lastKey = secretKeys.at(-1)

  if (!lastKey) {
    return [...dumbSecretKeys, fallbackKey]
  }

  return [...dumbSecretKeys, lastKey.key]
})
