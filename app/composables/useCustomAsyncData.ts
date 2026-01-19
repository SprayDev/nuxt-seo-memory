export const useCustomAsyncData = (key, callback, options) => {
  const { data, status } = useAsyncData(key, callback, options)

  const loading = computed(() => status.value === 'pending')

  return { data, status, loading }
}
