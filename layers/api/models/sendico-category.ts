import type { File } from '#layers/api/models/file'

export interface SendicoCategory {
  id: number
  category_id: number
  name?: string
  title: Record<string, string>
  translations: Record<string, string>
  popular_name: Record<string, string>
  slug: string
  depth?: number
  children?: SendicoCategory[]
  banner_image: File
  banner?: File
  image?: File
  breadcrumbs: string[]
  parent_titles: Record<string, string>[]
}

export interface SendicoCategoryBrand {
  id: number
  name: Record<string, string>
  keyword: string
}

export interface SendicoCategoryKeyword {
  id: number
  name: Record<string, string>
  keyword: string
}
