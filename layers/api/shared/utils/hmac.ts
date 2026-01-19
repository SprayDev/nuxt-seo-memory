import HmacSHA256 from 'crypto-js/hmac-sha256.js'
import Hex from 'crypto-js/enc-hex.js'
import { v4 as uuidv4 } from 'uuid'
import type { FetchOptions, FetchRequest } from 'ofetch'
import {
  convertFormDataToObject,
  convertPhpObjectToArray,
  type PhpObjectInput
} from '#layers/api/shared/utils/convert-data'

export const generateHmac = (message: string, secretKey: string) => {
  return HmacSHA256(message, secretKey).toString(Hex)
}

export const getDataForHmacFromFetch = (options: FetchOptions, request: FetchRequest) => {
  let bodyData
  let body
  if (options.body instanceof FormData) {
    body = convertFormDataToObject(options.body)
  } else {
    const transformValue = options.body || options.query || []
    body = convertPhpObjectToArray(transformValue as PhpObjectInput)
  }

  const isGet = options.query && !!Object.entries(options.query).length
  const nonce = uuidv4()
  const timestamp = Math.floor(new Date().getTime() / 1000)

  bodyData = Object.entries(body).length ? transformObject(body) : []
  if (Object.entries(bodyData).length && isGet) {
    clearGetObject(bodyData)
  } else if (!isGet) {
    clearPostObject(bodyData)
  }

  if (!Object.entries(bodyData).length) {
    bodyData = []
  }

  const url = `/api/${request}`
  return {
    url: url.replace('//', '/'),
    body: bodyData,
    nonce: nonce,
    timestamp: timestamp
  }
}

function clearGetObject(bodyData: Record<string, unknown>) {
  for (const bodyDataKey in bodyData) {
    const value = bodyData[bodyDataKey]
    if (value === undefined) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete bodyData[bodyDataKey]
    }

    if (Array.isArray(value) && value.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete bodyData[bodyDataKey]
    }

    if (typeof value === 'object' && value !== null) {
      clearGetObject(value as Record<string, unknown>)
    }
  }
}

function clearPostObject(bodyData: Record<string, unknown>) {
  for (const bodyDataKey in bodyData) {
    const value = bodyData[bodyDataKey]
    if (value === undefined) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete bodyData[bodyDataKey]
    }
  }
}

function transformObject(input: any, level: number = 0): any {
  const nested = level > 1
  level++
  if (Array.isArray(input)) {
    return input
      .map((item) => transformObject(item, level)) // Recursively process arrays
      .sort((a, b) => (a > b ? 1 : a < b ? -1 : 0))
  } else if (input !== null && typeof input === 'object') {
    const entries = Object.entries(input)
    if (entries.length === 0 && !nested) {
      return []
    }
    return entries
      .sort(([a], [b]) => (a > b ? 1 : a < b ? -1 : 0))
      .reduce((acc, [key, value]) => {
        let valueToSave = value

        if (valueToSave === '') {
          valueToSave = null
        }

        if (valueToSave !== null && Number.isFinite(valueToSave)) {
          valueToSave = valueToSave.toString()
        }

        acc[key] = transformObject(valueToSave, level) // Recursively transform nested objects
        return acc
      }, {})
  } else if (input !== null && Number.isFinite(input)) {
    return input.toString()
  } else if (typeof input === 'string') {
    input = input.trim().replaceAll(/\n/g, '')
    if (input === '') {
      input = null
    }
    return input
  }

  return input // Return non-object values as-is
}
