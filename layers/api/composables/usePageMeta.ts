import type { PageTitle } from '#layers/api/models/page-title'

const usePageTitles = () => {
  return useState<PageTitle[]>('page-titles', () => [])
}

const usePageMeta = () => {
  const route = useRoute()

  const { locale, t } = useI18n()

  const pageTitles = usePageTitles()

  const titleLookup = computed(() => {
    const lookup = new Map()
    pageTitles.value.forEach((item) => {
      const cleanUrl = item.url.split('?')[0]
      lookup.set(cleanUrl, item)
    })
    return lookup
  })

  const pageTitle = computed(() => {
    let routePath = route.fullPath.split('?')[0]
    if (!routePath) {
      return null
    }
    routePath = routePath.replace(`/${locale.value}`, '')
    return titleLookup.value.get(routePath) || null
  })

  const title = computed(() => {
    let metaTitle
    if (typeof route.meta.title === 'function') {
      metaTitle = t(route.meta.title(route), {})
    } else {
      metaTitle = route.meta.title ? t(route.meta.title as string) : null
    }

    if (pageTitle.value) {
      metaTitle = pageTitle.value.title[locale.value] ?? pageTitle.value.title.en ?? metaTitle
    }

    if (!metaTitle) {
      metaTitle = t('pages/welcome.meta_title')
    }

    return metaTitle
  })

  const description = computed(() => {
    let metaDescription
    if (typeof route.meta.description === 'function') {
      metaDescription = t(route.meta.description(route))
    } else {
      metaDescription = route.meta.description ? t(route.meta.description as string) : null
    }

    if (pageTitle.value) {
      metaDescription = pageTitle.value.description[locale.value] ?? pageTitle.value.description.en ?? metaDescription
    }

    if (!metaDescription) {
      metaDescription = t('pages/welcome.meta_description')
    }

    return metaDescription
  })

  return {
    title,
    description,
    pageTitle
  }
}

export { usePageTitles, usePageMeta }
