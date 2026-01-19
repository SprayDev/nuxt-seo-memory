import { ApiBaseService } from '#layers/api/services/api-base-service'
import type { PaginatedResponse } from '#layers/api/models/sendico-base'
import type { Bid } from '#layers/api/models/bid'

export default class UserBidService extends ApiBaseService {
  async deleteBid(code: number) {
    return await this.call(`/bids/${code}`, {
      method: 'delete'
    })
  }

  async deleteSniperBid(code: number) {
    return await this.call(`/bids/sniper/${code}`, {
      method: 'delete'
    })
  }

  async getBidList(filters: Record<string, unknown>) {
    return await this.call<PaginatedResponse<Bid>>('/bids', {
      query: buildRequestObjectV2(filters)
    })
  }
}
