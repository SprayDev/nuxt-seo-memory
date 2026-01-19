import type { $Fetch } from 'ofetch'
import { ApiBaseService } from '#layers/api/services/api-base-service'
import { buildRequestObject, buildRequestObjectV2 } from '#layers/api/shared/utils/request-data'
import type { SendicoCategory, SendicoCategoryBrand, SendicoCategoryKeyword } from '#layers/api/models/sendico-category'
import type {
  SendicoShop,
  ShopConditions,
  ShopItem,
  ShopItemAdditionalData,
  ShopSellerOptions
} from '#layers/api/models/shop'
import type { OtherShopCategoryType, OtherShopType } from '#layers/api/models/other-shop'
import type { Post } from '#layers/api/models/post'
import type { PaginatedResponse, ShopItemsResponse } from '#layers/api/models/sendico-base'

export type ShopSearchFilters = {
  page?: number
  sendico_category_id?: number
  category_id?: number
  search?: string
  global?: number
  min_price?: number
  bid_min_price?: number
  max_price?: number
  bid_max_price?: number
  condition?: ShopConditions
  seller?: ShopSellerOptions
  sendico_brand_id?: number
  sendico_keyword_ids?: number[]
  options?: string[]
  r?: Record<string, string | string[]>
}

export type GetCategoryCategoriesResponse = {
  category?: SendicoCategory
  children_categories: SendicoCategory[]
  parent_children: SendicoCategory[]
  category_path: SendicoCategory[]
  brands: SendicoCategoryBrand[]
  keywords: SendicoCategoryKeyword[]
  // parent_levels: any
}

export interface OtherShopOrderFormItem {
  url: string
  original_name: string
  comment: string
}

interface OtherShopOrderForm {
  items: OtherShopOrderFormItem[]
  files?: File[]
  skipEstimation: boolean
  up_to_change_price?: string | number
}

type OtherShopSlug = {
  slug: string
  lastmod: string
}

export default class ShopService extends ApiBaseService {
  async getCachedItems(shop: string, filter: string, limit: number) {
    return await this.call<ShopItem[]>(`items/cached/${shop}/${filter}`, {
      query: {
        limit
      }
    })
  }

  async getCategoriesItems(shop: string) {
    return await this.call(`${shop}/categories/items`)
  }

  async getFeaturedCategories() {
    return await this.call<SendicoCategory[]>('sendico-categories/popular')
  }

  async getFeaturedCategoryData(slug: string) {
    return await this.call(`popular_category_blocks/featured/${slug}`)
  }

  async getShopCategories(shop: string, categoryId: string = '') {
    return await this.call<GetCategoryCategoriesResponse>(`${shop}/categories/${categoryId}`)
  }

  async getCategoriesMeta(shop: string, categoryId: string = '') {
    return await this.call(`${shop}/categories/meta/${categoryId}`)
  }

  async getShopItems(shop: string, filters: ShopSearchFilters) {
    return await this.call<ShopItemsResponse>(`${shop}/items`, {
      method: 'get',
      query: buildRequestObjectV2({ ...filters }, ['options', 'sendico_keyword_ids'])
    })
  }

  async getShopItem(shop: string, item: string, timezone: string) {
    return await this.call<ShopItem>(`${shop}/items/${item}`, {
      query: {
        timezone
      }
    })
  }

  async getShopItemAdditional(shop: string, code: string, filters: Record<string, unknown> = {}) {
    return await this.call<ShopItemAdditionalData>(`${shop}/items/${code}/additional`, {
      query: buildRequestObject({ ...filters })
    })
  }

  async requestUnblock(code: string, shop: SendicoShop) {
    return await this.call(`${shop}/items/${code}/unblock`, {
      method: 'post'
    })
  }

  async selfUnblock(code: string, shop: string) {
    return await this.call(`${shop}/items/${code}/unblock-self`, {
      method: 'post'
    })
  }

  async storeOtherShopForm(orderForm: OtherShopOrderForm) {
    return await this.call('order/form', {
      method: 'post',
      body: this.convertOtherShopItemsToFormData(orderForm)
    })
  }

  async getOtherShops() {
    return await this.call<OtherShopCategoryType[]>('shop/others/list')
  }

  async getOtherShop(slug: string) {
    return await this.call<OtherShopType>(`shop/others/${slug}`)
  }

  async getOtherShopSlugs() {
    return await this.call<OtherShopSlug[]>('shop/others/slugs')
  }

  async getOtherShopRelatedPosts(slug: string, page: number, limit?: number) {
    return await this.call<PaginatedResponse<Post>>(`blog/posts/other-shop/${slug}`, {
      query: {
        page,
        limit: limit ?? null
      }
    })
  }

  async getRecentViewedItems(shop: string) {
    return await this.call<ShopItem[]>(`${shop}/items/recently-viewed`)
  }

  async getShopCodeFromString(string: string) {
    return await this.call<{
      shop: SendicoShop
      code: string
      other_shop?: boolean
    }>('/shop/parse/number', {
      query: { string }
    })
  }

  async getRakutenNumberFromUrl(url: string): Promise<$Fetch> {
    return await this.call('/rakuten/parse/number', {
      query: { url }
    })
  }

  private convertOtherShopItemsToFormData(order: OtherShopOrderForm) {
    const formData = new FormData()

    formData.set('skip_estimation', `${Number(order.skipEstimation)}`)
    if (order.up_to_change_price) {
      formData.set('up_to_change_price', `${Number(order.up_to_change_price)}`)
    }

    for (const [index, item] of order.items.entries()) {
      formData.set(`items[${index}][url]`, item.url)
      formData.set(`items[${index}][comment]`, item.comment)
      formData.set(`items[${index}][original_name]`, item.original_name)
    }

    if (order.files && order.files?.length > 0) {
      for (const [index, file] of order.files.entries()) {
        formData.append(`files[${index}]`, file, file.name ?? null)
      }
    }

    return formData
  }
}
