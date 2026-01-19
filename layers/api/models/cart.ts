import type { SendicoShop } from './shop'

export interface Cart {
  id: number
  name: string
  short_name: string
  quantity: number
  max_quantity: number | null
  min_quantity: number | null
  price: number
  description: string
  comment: string
  img: string
  code: string
  shop: SendicoShop
  seller: string
  url: string
  favorite_id: number | null
}
