import { ApiBaseService } from '#layers/api/services/api-base-service'
import type { SendicoCategory, SendicoCategoryBrand, SendicoCategoryKeyword } from '#layers/api/models/sendico-category'

export type GetCategoryCategoriesResponse = {
  category?: SendicoCategory
  categories: SendicoCategory[]
  parent_children: SendicoCategory[]
  category_path: SendicoCategory[]
  brands: SendicoCategoryBrand[]
  keywords: SendicoCategoryKeyword[]
  // parent_levels: any
}

export default class SendicoCategoryService extends ApiBaseService {
  async getRootCategories() {
    return await this.call<GetCategoryCategoriesResponse>('/sendico-categories', {
      query: {
        less_data: 0
      }
    })
  }

  async getCategoryData(categorySlug?: string, byId: boolean = false, lessData: boolean = false) {
    return await this.call<GetCategoryCategoriesResponse>(`/sendico-categories/${categorySlug}`, {
      query: {
        by_id: +byId,
        less_data: +lessData
      }
    })
  }
}
