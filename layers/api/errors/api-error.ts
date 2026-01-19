export type ApiErrorData = {
  data?: Record<string, unknown>
  message: string
  errors: string[]
  statusCode: number
  statusMessage: string
  code: number
}

export default class ApiError extends Error {
  override message: string
  errors: string[]
  statusCode: number
  statusMessage: string
  code: number
  private data: Record<string, unknown>

  constructor(data: ApiErrorData) {
    super(data.message)
    this.message = data.message
    this.errors = data.errors
    this.statusCode = data.statusCode
    this.statusMessage = data.statusMessage
    this.code = data.code
    this.data = { ...data }
  }
}
