import { ApiBaseService } from '#layers/api/services/api-base-service'

export default class ShopHardoffService extends ApiBaseService {
  async buy(itemId: string) {
    return await this.call(`hardoff/items/${itemId}`, {
      method: 'post'
    })
  }
}
