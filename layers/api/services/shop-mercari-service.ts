import { ApiBaseService } from '#layers/api/services/api-base-service'
export default class ShopMercariService extends ApiBaseService {
  async buy(
    code: string,
    notForUs: number = 0,
    isShop: boolean = false,
    variantId: string | null | undefined = null,
    itemAuthentication: number = 0
  ) {
    return await this.call(`mercari/items/${code}`, {
      method: 'post',
      body: {
        not_for_us: notForUs,
        is_shop: isShop,
        variant_id: variantId,
        item_authentication: itemAuthentication
      }
    })
  }
}
