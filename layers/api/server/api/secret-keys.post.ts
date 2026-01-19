export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const secureHeader = getHeader(event, 'x-secure-header')
  if (secureHeader !== config.api.secureHeader) {
    setResponseStatus(event, 403)
    return 'forbidden'
  }

  // get data from request
  const data = await readBody(event)
  const secretKey = data.secret_key
  const dumbSecretKeys = data.dump_secret_keys
  // validate data
  if (!secretKey) {
    setResponseStatus(event, 403)
    return 'bad request'
  }

  if (!dumbSecretKeys?.length) {
    setResponseStatus(event, 403)
    return 'bad request'
  }

  const today = new Date()

  const storage = useStorage('redis')

  let currentSecretKeys = (await storage.getItem<{ date: string; key: string }[]>('secret_keys')) ?? []
  // update secret keys by appending new secret key to existed list
  // if list contains more than 4 keys, delete first key
  currentSecretKeys.push({
    date: today.toISOString().split('T')[0],
    key: secretKey
  })

  if (currentSecretKeys.length > 5) {
    currentSecretKeys = currentSecretKeys.slice(1)
  }

  await storage.setItem('secret_keys', currentSecretKeys)
  await storage.setItem('dumb_secret_keys', dumbSecretKeys)

  return 'OK!'
})
