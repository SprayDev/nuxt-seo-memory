import { ApiBaseService } from '#layers/api/services/api-base-service'
import type { SendicoShop } from '#layers/api/models/shop'

export type SearchHistory = {
  search: string
  created_at: string
  translation: string | null
}

export class UserSearchService extends ApiBaseService {
  async getSearchHistory(shop?: SendicoShop) {
    return await this.call<SearchHistory[]>('/search-history', {
      query: {
        shop
      }
    })
  }

  async storeSearch(search: string, shop?: SendicoShop) {
    return await this.call('/search-history', {
      method: 'POST',
      body: {
        shop,
        search
      }
    })
  }
}
