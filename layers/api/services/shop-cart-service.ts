import { ApiBaseService } from '#layers/api/services/api-base-service'
import type { Cart } from '#layers/api/models/cart'

export default class ShopCartService extends ApiBaseService {
  async addItem(shop: string, code: string, quantity: number, comment: string = '', options: unknown = {}) {
    return await this.call<number>(`/cart/${shop}/add`, {
      method: 'post',
      body: {
        code,
        quantity,
        comment,
        options
      }
    })
  }

  async removeItem(id: number) {
    return await this.call(`/cart/${id}/remove`, {
      method: 'post'
    })
  }

  async updateCartQty(id: number, increase: boolean) {
    return await this.call(`/cart/${id}/qty`, {
      method: 'post',
      body: {
        increase
      }
    })
  }

  async confirmCart(skipEstimation: boolean) {
    return await this.call('/cart', {
      method: 'post',
      body: {
        skip_estimation: skipEstimation
      }
    })
  }

  async clearCart() {
    return await this.call('/cart/clear', {
      method: 'post'
    })
  }

  async getCartData(): Promise<Cart[]> {
    return await this.call('/cart')
  }
}
