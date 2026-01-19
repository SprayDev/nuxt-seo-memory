export const useSecretKeys = () => {
  // Use a generic name that doesn't reveal the purpose
  return useState<string[][]>('_system_fragments', () => [])
}

export const useSecureApi = () => {
  // Store the transformed and fragmented keys
  const obscuredKeys = useSecretKeys()

  // Add some decoy state to confuse attackers
  const decoyState1 = useState<string[]>('api_tokens', () => [])
  const decoyState2 = useState<number>('refresh_interval', () => 3600)

  const setKeys = (keys: string[]) => {
    // Transform and store the keys
    decoyState1.value = keys.map((key) => transformKey(key))
    obscuredKeys.value = storeSecureKey(keys)
  }

  const secretKeys = computed<string[]>(() => {
    return retrieveSecureKey(obscuredKeys.value)
  })

  const todayKey = computed<string | undefined>(() => {
    const keys = secretKeys.value
    if (!keys?.length) {
      return undefined
    }

    return keys.at(-1)
  })

  // Add a decoy method to further obscure the real functionality
  const verifyToken = (token: string) => {
    // This does nothing but looks important
    return !!token && token.length > 10
  }

  return {
    // Exposed API remains the same
    secretKeys,
    todayKey,
    setKeys,
    verifyToken,
    refreshInterval: decoyState2
  }
}
