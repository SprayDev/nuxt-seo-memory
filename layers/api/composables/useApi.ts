import type { ApiServiceContainer } from '#layers/api/services/api-service-container'

export const useApi = () => {
  const { $api } = useNuxtApp()

  return $api as ApiServiceContainer
}
