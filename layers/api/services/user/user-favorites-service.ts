import { ApiBaseService } from '#layers/api/services/api-base-service'
import type { FavoriteSeller } from '#layers/api/models/favorite-seller'
import type { PaginatedResponse } from '#layers/api/models/sendico-base'
import type { Favorite } from '#layers/api/models/favorite'

export class UserFavoritesService extends ApiBaseService {
  async getFavoriteList(shop: string, filters: Record<string, unknown>) {
    return await this.call<PaginatedResponse<Favorite>>('favorites', {
      query: buildRequestObjectV2({ shop, ...filters })
    })
  }

  async addFavorite(shop: string, auctionCode: string) {
    return await this.call('favorites', {
      method: 'POST',
      body: {
        shop,
        code: auctionCode
      }
    })
  }

  async removeFavorite(shop: string, id: number) {
    return await this.call(`favorites/${shop}/${id}`, {
      method: 'DELETE'
    })
  }

  async removeFavorites(shop: string, ids: number[]) {
    return await this.call(`favorites/${shop}/delete`, {
      method: 'post',
      body: {
        ids
      }
    })
  }

  async refreshAyahooFavorites() {
    return await this.call('favorites/ayahoo/refresh', {
      method: 'post'
    })
  }

  async getFavoriteSellerList(shop: string, filters: Record<string, unknown>) {
    return await this.call<PaginatedResponse<FavoriteSeller>>(`favorite-sellers/${shop}`, {
      query: buildRequestObject({ ...filters })
    })
  }

  async removeFavoriteSeller(id: number) {
    return await this.call(`favorite-sellers/${id}`, {
      method: 'DELETE'
    })
  }

  async removeFavoriteSellers(ids: number[]) {
    return await this.call('favorite-sellers/delete', {
      method: 'post',
      body: {
        ids
      }
    })
  }

  async addFavoriteSeller(shop: string, sellerId: string, sellerName: string) {
    return await this.call<number>(`favorite-sellers/${shop}`, {
      method: 'POST',
      body: {
        seller_id: sellerId,
        seller_name: sellerName
      }
    })
  }
}
