import type { SendicoShop } from '#layers/api/models/shop'

export interface Favorite {
  id: number
  code: string
  shop_name: SendicoShop
  short_name: string
  img_url: string
  price: number
  buy_now?: number
  bids_count?: number
  end_time?: string
  seconds_left?: number
}
