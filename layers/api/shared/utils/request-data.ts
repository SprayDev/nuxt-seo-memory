const buildRequestObject = (query: Record<string, unknown>, forceToArrayKeys: string[] = []) => {
  const search = Object.assign({}, query)
  for (const prop in search) {
    if (Array.isArray(search[prop])) {
      search[`${prop}[]`] = search[prop]
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete search[prop]
    } else if (typeof search[prop] === 'object' && !Array.isArray(search[prop])) {
      const nestObject = search[prop] as Record<string, unknown>
      for (const key in nestObject) {
        search[`${prop}[${key}]`] = nestObject[key]
      }
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete search[prop]
    } else if (!Array.isArray(search[prop])) {
      // force some keys to [] array syntax,
      // when go to page with url where only 1 el in array
      // nuxt says its string
      if (forceToArrayKeys.includes(prop)) {
        search[`${prop}[]`] = search[prop]
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete search[prop]
      }
    }
  }
  return search
}

const buildRequestObjectV2 = (query: Record<string, unknown>, forceToArrayKeys: string[] = []) => {
  let search = Object.assign({}, query)
  for (const prop in search) {
    if (Array.isArray(search[prop])) {
      search[`${prop}[]`] = search[prop]
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete search[prop]
    } else if (typeof search[prop] === 'object' && !Array.isArray(search[prop])) {
      let nestedObject = {}
      const nestObject = search[prop] as Record<string, unknown>
      for (const key in nestObject) {
        if (Array.isArray(nestObject[key])) {
          nestedObject = {
            ...nestedObject,
            [`${prop}[${key}]`]: nestObject[key]
          }
          continue
        }
        search[`${prop}[${key}]`] = nestObject[key]
      }

      if (Object.keys(nestedObject).length) {
        search = {
          ...search,
          ...buildRequestObjectV2(nestedObject)
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete search[prop]
    } else if (!Array.isArray(search[prop])) {
      // force some keys to [] array syntax,
      // when go to page with url where only 1 el in array
      // nuxt says its string
      if (forceToArrayKeys.includes(prop)) {
        search[`${prop}[]`] = search[prop]
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete search[prop]
      }
    }
  }
  return search
}

export { buildRequestObject, buildRequestObjectV2 }
