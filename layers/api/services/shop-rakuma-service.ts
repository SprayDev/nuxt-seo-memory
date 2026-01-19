import { ApiBaseService } from '#layers/api/services/api-base-service'

export default class ShopRakumaService extends ApiBaseService {
  async buy(itemId: string) {
    return await this.call(`rakuma/items/${itemId}`, {
      method: 'post'
    })
  }
}
