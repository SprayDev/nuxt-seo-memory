import type { SendicoShop } from '#layers/api/models/shop'

export interface FavoriteSeller {
  id: number
  seller_id: string
  seller_name: string
  platform: SendicoShop
}
