import { ApiBaseService } from '#layers/api/services/api-base-service'
export default class ShopAmazonService extends ApiBaseService {
  async buy(code: string, quantity: number, offerIndex: number) {
    return await this.call(`amazon/items/${code}`, {
      method: 'post',
      body: {
        quantity,
        offer_index: offerIndex
      }
    })
  }
}
