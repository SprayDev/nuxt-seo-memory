import { ApiBaseService } from '#layers/api/services/api-base-service'
export default class ShopAyahooService extends ApiBaseService {
  async bid({ bid, code, is_buyout, price, qty, comment, is_store }: Record<string, unknown>) {
    return await this.call(`ayahoo/items/${code}`, {
      method: 'post',
      body: {
        bid,
        price,
        is_buyout,
        qty,
        comment,
        is_store
      }
    })
  }

  async buyStore({ bid, code, is_buyout, price, qty, comment }: Record<string, unknown>) {
    return await this.call(`ayahoo/items/${code}/store`, {
      method: 'post',
      body: {
        bid,
        price,
        is_buyout,
        qty,
        comment
      }
    })
  }

  async snipeBid({ bid, code, price, qty }: Record<string, unknown>) {
    return await this.call(`ayahoo/items/${code}/snipe`, {
      method: 'post',
      body: {
        bid,
        price,
        qty
      }
    })
  }

  async deleteSniperBid(code: string) {
    return await this.call(`ayahoo/items/${code}/snipe/delete`, {
      method: 'post'
    })
  }
}
