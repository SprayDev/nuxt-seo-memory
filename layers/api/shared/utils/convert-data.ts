// Type definitions for nested object structures
type NestedValue = string | undefined | number | boolean | NestedObject | NestedArray | File
interface NestedObject {
  [key: string]: NestedValue
}
type NestedArray = Array<NestedValue>
type NestedStructure = NestedObject | NestedArray

// Input type for PHP object conversion - can be an object or array with primitive values
type PhpObjectInput = { [key: string]: string | number | boolean } | (string | number | boolean)[]

// Type guard functions
const isNestedObject = (value: NestedStructure): value is NestedObject => {
  return !Array.isArray(value)
}

const isNestedArray = (value: NestedStructure): value is NestedArray => {
  return Array.isArray(value)
}

const convertPhpObjectToArray = (input: PhpObjectInput): NestedStructure => {
  let output: NestedStructure = {}

  if (Array.isArray(input)) {
    output = []
  }

  // Only process object keys if input is not an array
  if (!Array.isArray(input)) {
    Object.keys(input).forEach((key: string) => {
      const value = input[key]

      // Match keys with nested brackets, e.g., r[SSI$p_36]
      const path = key.match(/[^[\]]+/g) // Extracts parts like ["r", "SSI$p_36"]

      if (path) {
        let current = output

        path.forEach((part: string, index: number) => {
          const isLast = index === path.length - 1

          // If it's an array indicator (empty brackets []), push values to an array
          if (part === '') {
            if (!Array.isArray(current)) {
              current = [] as NestedArray
            }
            if (isNestedArray(current)) {
              current.push(value)
            }
          } else {
            if (isNestedObject(current)) {
              if (!current[part]) {
                current[part] = isLast ? value : {}
              }
              if (!isLast) {
                const nextValue = current[part]
                if (typeof nextValue === 'object' && nextValue !== null) {
                  current = nextValue as NestedStructure
                }
              }
            }
          }
        })
      } else {
        if (isNestedObject(output)) {
          output[key] = value
        }
      }
    })
  }

  return output
}

const convertFormDataToObject = (formData: FormData): NestedObject => {
  const output: NestedObject = {}

  for (const [key, value] of formData.entries()) {
    // Match keys like items[0][field] or sort[field]
    const path = key.match(/[^\[\]]+/g) // Extract all segments inside brackets

    if (path) {
      let current = output

      // Iterate through path segments, creating nested objects/arrays as needed
      for (let i = 0; i < path.length; i++) {
        const segment = path[i] as string
        const nextSegment = path[i + 1]

        // If next segment exists, initialize current[segment] as object/array if not set
        if (nextSegment) {
          if (!current[segment]) {
            current[segment] = nextSegment.match(/^\d+$/) ? [] : {}
          }
          current = current[segment] as NestedObject
        } else {
          // If it's the last segment, assign the value
          if (Array.isArray(current)) {
            current.push(value)
          } else {
            current[segment] = value
          }
        }
      }
    } else {
      // Handle flat keys (e.g., search: "test")
      output[key] = value
    }
  }

  return output
}

export { convertPhpObjectToArray, convertFormDataToObject }
export type { NestedValue, NestedObject, NestedArray, NestedStructure, PhpObjectInput }
