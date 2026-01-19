import type { AsyncData, AsyncDataOptions, NuxtError } from '#app'

export interface UseApiOptions<T> extends Omit<AsyncDataOptions<T>, 'watch'> {
  /**
   * Watch reactive sources and auto-refresh
   */
  watch?: unknown[]
  /**
   * Skip the request on initial load (useful for client-only requests)
   */
  lazy?: boolean
  /**
   * Transform the result before returning
   */
  transform?: (data: T) => T
  /**
   * Pick specific keys from the result
   */
  pick?: string[]
  /**
   * Default value while loading
   */
  default?: () => T | Ref<T>

  /**
   * Automatically show error page on error
   */
  showError?: boolean
  /**
   * Custom error handler
   */
  onError?: (error: NuxtError) => void
}

export function useApiData<T>(key: MaybeRefOrGetter, handler: () => Promise<T>, options?: UseApiOptions<T>) {
  const {
    lazy = false,
    transform,
    pick,
    default: defaultFn,
    showError: shouldShowError = false,
    onError,
    ...asyncDataOptions
  } = options || {}

  // Build the options object for useAsyncData
  const computedOptions: AsyncDataOptions<T> = {
    ...asyncDataOptions,
    ...(transform && { transform }),
    ...(pick && { pick }),
    ...(defaultFn && { default: defaultFn })
    // Use lazy option appropriately
  }

  // Use the appropriate composable based on lazy option
  const asyncData = useAsyncData(key, handler, computedOptions)

  const loading = computed(() => asyncData.status.value === 'pending')

  // Handle errors
  watch(
    () => asyncData.error.value,
    (error) => {
      if (error) {
        // Call custom error handler if provided
        if (onError) {
          onError(error)
        }

        // Show error page if enabled
        if (shouldShowError) {
          throw createError({
            statusCode: (error as any).statusCode || 500,
            statusMessage: error.message,
            fatal: true
          })
        }
      }
    },
    { immediate: true }
  )

  return {
    ...asyncData,
    loading
  }
}
