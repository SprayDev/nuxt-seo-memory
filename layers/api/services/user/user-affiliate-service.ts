import { ApiBaseService } from '#layers/api/services/api-base-service'
import type { Affiliate } from '#layers/api/models/affiliate'

type UserAffiliatesResponse = {
  data: Affiliate[]
  meta: {
    total_invited: number
  }
}

export default class UserAffiliateService extends ApiBaseService {
  async getAffiliateCodes() {
    return await this.call<UserAffiliatesResponse>('affiliate_codes')
  }

  async storeAffiliateCode(code: string) {
    return await this.call('affiliate_codes', {
      method: 'post',
      body: {
        code
      }
    })
  }

  async setAffiliateCodeVisit(code: string) {
    return await this.call('referral/visit', {
      method: 'post',
      body: {
        code
      }
    })
  }
}
