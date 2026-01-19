import type { LocationQuery } from 'vue-router'
import { ApiBaseService } from '#layers/api/services/api-base-service'
import type { FaqType } from '#layers/api/models/faq'

export class FaqsService extends ApiBaseService {
  async getFaqs(query?: LocationQuery) {
    return await this.call<FaqType[]>('faqs', {
      query: query ? buildRequestObjectV2(query) : undefined
    })
  }
}
