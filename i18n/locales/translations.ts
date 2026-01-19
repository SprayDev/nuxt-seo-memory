export default defineI18nLocale(async (locale) => {
  // const { data } = await $fetch(`http://192.168.0.172/api/translations/${locale}`)
  // return data
  return {
    welcome: "Hello world"
  }
})
