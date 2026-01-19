import type { ShopItem } from '#layers/api/models/shop'
import type { SearchRefinement } from '#layers/api/models/amazon'

export type PaginationLink = {
  url: string | null
  label: string
  active: boolean
}

export type PaginatedResponse<T, M = never[]> = {
  current_page: number
  data: T[]
  first_page_url: string
  from: number
  has_more: boolean
  last_page: number
  last_page_url: string
  links: PaginationLink[]
  meta: M
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

export type ShopItemsResponse<T = ShopItem> = {
  items: T[]
  total_items: number
  has_more: boolean
  seller_in_favorites?: number | null
  search_refinements?: SearchRefinement[]
}
