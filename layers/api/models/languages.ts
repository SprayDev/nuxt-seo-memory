export enum SendicoLanguages {
  English = 'en',
  Spanish = 'es',
  Portuguese = 'pt',
  Japanese = 'ja',
  Russian = 'ru',
  Chinese = 'zh',
  French = 'fr',
  Italian = 'it',
  Malay = 'ms',
  German = 'de',
  Hindi = 'hi',
  Korean = 'ko',
  Filipino = 'fil',
  Thai = 'th',
  Turkish = 'tr',
  Vietnamese = 'vi',
  Indonesian = 'id',
  Polish = 'pl',
  Dutch = 'nl',
  Arabic = 'ar'
}

export const getLanguageByValue = (value: string) => {
  const index = Object.values(SendicoLanguages).indexOf(value as unknown as SendicoLanguages)
  return Object.keys(SendicoLanguages)[index] ?? null
}
