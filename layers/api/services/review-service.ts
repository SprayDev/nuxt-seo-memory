import { ApiBaseService } from '#layers/api/services/api-base-service'
import type { Review } from '#layers/api/models/review'
import type { PaginatedResponse } from '#layers/api/models/sendico-base'

export default class ReviewService extends ApiBaseService {
  async lastReviews() {
    return await this.call<Review[]>('reviews/last')
  }

  async getReviews(page = 1) {
    return await this.call<PaginatedResponse<Review>>('reviews', {
      query: {
        page
      }
    })
  }
}
