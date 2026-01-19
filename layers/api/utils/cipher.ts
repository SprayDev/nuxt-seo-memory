// Key transformation functions
export const transformKey = (key: string): string => {
  // Split the key into parts and reverse them
  const parts = key.split(' ')
  const reversed = parts.reverse().join(' ')
  // Apply a simple rotation cipher (shift each character)
  return reversed
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0)
      // Only transform letters and numbers, leave spaces and punctuation
      if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
        // Rotate letters by 3 positions (simple Caesar cipher)
        return String.fromCharCode(((code - (code <= 90 ? 65 : 97) + 3) % 26) + (code <= 90 ? 65 : 97))
      }
      return char
    })
    .join('')
}

export const untransformKey = (transformed: string): string => {
  // Undo the character rotation
  const unrotated = transformed
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0)
      if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
        // Rotate back by 23 (same as -3 in modulo 26)
        return String.fromCharCode(((code - (code <= 90 ? 65 : 97) + 23) % 26) + (code <= 90 ? 65 : 97))
      }
      return char
    })
    .join('')

  // Undo the reversal
  const parts = unrotated.split(' ')
  return parts.reverse().join(' ')
}

// Split keys into fragments with a consistent pattern
export const fragmentKey = (key: string): string[] => {
  const fragments: string[] = []
  const words = key.split(' ')

  // Create fragments with different patterns
  fragments.push(words.filter((_, i) => i % 2 === 0).join('-'))
  fragments.push(words.filter((_, i) => i % 2 === 1).join('-'))

  return fragments
}

export const reassembleKey = (fragments: string[]): string => {
  if (fragments.length !== 2) {
    return ''
  }
  const evenWords = fragments[0]!.split('-')
  const oddWords = fragments[1]!.split('-')
  const result: string[] = []

  // Reassemble the original key
  for (let i = 0; i < evenWords.length + oddWords.length; i++) {
    if (i % 2 === 0 && evenWords[i / 2]) {
      result.push(evenWords[i / 2]!)
    } else if (oddWords[Math.floor(i / 2)]!) {
      result.push(oddWords[Math.floor(i / 2)]!)
    }
  }

  return result.join(' ')
}

// Store keys in fragmented and transformed form
export const storeSecureKey = (keys: string[]): string[][] => {
  return keys.map((key) => {
    const transformed = transformKey(key)
    return fragmentKey(transformed)
  })
}

export const retrieveSecureKey = (fragmentedKeys: string[][]): string[] => {
  return fragmentedKeys.map((fragments) => {
    const reassembled = reassembleKey(fragments)
    return untransformKey(reassembled)
  })
}
