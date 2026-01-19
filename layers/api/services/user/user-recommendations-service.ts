import { ApiBaseService } from '#layers/api/services/api-base-service'

type GetRecommendationsRequest = {
  page?: number
}

export default class UserRecommendationsService extends ApiBaseService {
  async getRecommendations(filters: GetRecommendationsRequest) {
    return await this.call('/user/recommendations', {
      query: filters
    })
  }
}
