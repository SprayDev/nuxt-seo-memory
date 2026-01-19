import type { RequestHeaders } from 'h3'

const normalizeHeaders = (headers: RequestHeaders): Record<string, string | undefined> => {
  const rawHeaders = headers
  const normalizedHeaders: Record<string, string | undefined> = {}
  for (const [key, value] of Object.entries(rawHeaders)) {
    if (Array.isArray(value)) {
      normalizedHeaders[key] = value.join(', ')
    } else {
      normalizedHeaders[key] = value
    }
  }

  return normalizedHeaders
}

export { normalizeHeaders }
