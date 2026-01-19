export type FetchError = {
  errors?: Record<string, string[]>
  message: string
  statusCode?: number
  code?: number
}

type FetchDataType<T> = {
  data: T
  error: FetchError | null
}

const processFetch = async <T>(fetchMethod: () => Promise<T>): Promise<FetchDataType<T | null>> => {
  let data: T | null = null
  let error: FetchDataType<T>['error'] = null

  try {
    data = await fetchMethod()
  } catch (e) {
    const err = e as unknown
    error = {
      errors: err?.errors,
      message: err?.message,
      statusCode: err?.statusCode,
      code: err?.code
    }
  }

  return { data, error }
}

export { processFetch }
