import type { RakumaCarriageEnum } from './rakuma'
import type { CurrentItemVariation, Dimension, ItemOverviewLine, ItemVariation, OfferData } from './amazon'
import type { AgreementData, UserAgreementType } from './user-agreement'

enum SendicoShop {
  MERCARI_SHOP = 'mercari',
  RAKUMA_SHOP = 'rakuma',
  AYAHOO_SHOP = 'ayahoo',
  RAKUTEN_SHOP = 'rakuten',
  YAHOO_SHOPPING_SHOP = 'yahoo',
  AMAZON_SHOP = 'amazon',
  HARDOFF_SHOP = 'hardoff',
  ALL = 'all'
}

const getShopsInOrderToDisplay = () => [
  SendicoShop.AYAHOO_SHOP,
  SendicoShop.RAKUMA_SHOP,
  SendicoShop.AMAZON_SHOP,
  SendicoShop.MERCARI_SHOP,
  SendicoShop.RAKUTEN_SHOP,
  SendicoShop.YAHOO_SHOPPING_SHOP
  // SendicoShop.HARDOFF_SHOP
]

const getAllShops = () => [
  SendicoShop.ALL,
  SendicoShop.AYAHOO_SHOP,
  SendicoShop.RAKUMA_SHOP,
  SendicoShop.AMAZON_SHOP,
  SendicoShop.MERCARI_SHOP,
  SendicoShop.RAKUTEN_SHOP,
  SendicoShop.YAHOO_SHOPPING_SHOP
  // SendicoShop.HARDOFF_SHOP
]

const urls = {
  [SendicoShop.MERCARI_SHOP]: 'https://jp.mercari.com',
  [SendicoShop.RAKUMA_SHOP]: 'https://fril.jp',
  [SendicoShop.AMAZON_SHOP]: 'https://www.amazon.co.jp',
  [SendicoShop.AYAHOO_SHOP]: 'https://auctions.yahoo.co.jp',
  [SendicoShop.YAHOO_SHOPPING_SHOP]: 'https://shopping.yahoo.co.jp',
  [SendicoShop.RAKUTEN_SHOP]: 'https://www.rakuten.co.jp',
  [SendicoShop.HARDOFF_SHOP]: 'https://netmall.hardoff.co.jp',
  [SendicoShop.ALL]: ''
}

const images = {
  [SendicoShop.MERCARI_SHOP]: '/images/stores/logos/mercari-front.svg',
  [SendicoShop.AYAHOO_SHOP]: '/images/stores/logos/ayahoo-two-lines.webp',
  [SendicoShop.AMAZON_SHOP]: '/images/stores/logos/amazon-front.webp',
  [SendicoShop.RAKUTEN_SHOP]: '/images/stores/logos/rakuten-front.svg',
  [SendicoShop.RAKUMA_SHOP]: '/images/stores/logos/rakuma-front.webp',
  [SendicoShop.YAHOO_SHOPPING_SHOP]: '/images/stores/logos/yahoo-two-lines.webp',
  [SendicoShop.HARDOFF_SHOP]: undefined,
  [SendicoShop.ALL]: undefined
}

const getUrlForShop = (shop: SendicoShop): string => {
  return urls[shop]
}

const getImageForShop = (shop: SendicoShop): string | undefined => {
  return images[shop]
}

export type ShopItemLabel = 'new' | 'free_shipping' | 'buy_now' | 'sale'

export enum ShopItemUserBidStatus {
  NO_BID = 0,
  OVERBID_BY_SENDICO_USER = 3,
  OVERBID = 2,
  SENDICO_WINNER = 4,
  WINNER = 1
}

export type ShopItemBlockData = {
  blocked: boolean
  block_message?: Record<string, string>
  is_warning?: boolean
  reason?: string
  self_unblock?: boolean
  requested_unblock?: boolean
  allow_unblock: boolean
  blocked_keywords?: string[]
}

export type ShopItemDiscountData = {
  value: number
  percent: number
  expire_in_seconds: number
}

export type ShopItemDurationData = {
  min_days: number
  max_days: number
}

export type ShopItemCommentData = {
  message: string
  name: string
  seller: boolean
}

export type ShopItemVariant = {
  name: string
  quantity: number
  id: string | number
}

// for Yahoo shopp
export type ShopItemYahooOptions = {
  name: string
  values: string[]
}

export type ShopItem = {
  shop: SendicoShop
  code: string
  name: string
  is_restricted?: boolean
  category: number | string
  img: string
  images: string[]
  price: number
  list_price?: number
  seconds_to_end?: number
  favorite_id?: number | null
  short_name: string
  url: string
  buy_out_price?: number | null
  sendico_price?: number | null
  price_with_tax?: number | null
  sendico_price_with_tax?: number | null
  buy_out_price_with_tax?: number | null
  can_bid?: boolean
  is_shop?: boolean
  is_store?: boolean
  not_for_us?: 1 | 0
  can_snipe?: boolean
  can_buyout?: boolean
  buy_only?: boolean
  carriage?: RakumaCarriageEnum
  options?: ShopItemYahooOptions[]
  size?: string
  bids?: number | null
  sendico_bids_count?: number | null
  init_price?: number | null
  bid_step?: number | null
  tax?: number | null
  sniper_bid?: number | null
  user_bid?: number | null
  quantity?: number | null
  auto_extension?: boolean | null
  early_closing?: boolean | null
  start_time?: string
  end_time?: string
  current_time?: string
  location?: string | null
  category_path?: Record<string, string>[]
  labels?: ShopItemLabel[]
  block_data?: ShopItemBlockData
  user_bid_status?: ShopItemUserBidStatus
  sold?: boolean
  ended?: boolean
  enough_credits?: boolean
  discount?: ShopItemDiscountData
  condition?: string
  brand?: string
  commission?: number
  duration_data?: ShopItemDurationData
  seller: string
  shipping_payer?: string
  inland_shipping_price?: number
  bad_ratings?: number | null
  good_ratings?: number | null
  seller_id?: string
  seller_name: string
  seller_favorite_id?: number
  brand_id?: string
  description?: string
  comments?: ShopItemCommentData[]
  category_id?: string
  variants?: ShopItemVariant[]
  variations?: ItemVariation[]
  current_variation?: CurrentItemVariation
  dimensions?: Dimension[]
  offers?: OfferData[]
  used_offer?: OfferData
  recommended?: ShopItem[]
  overviews?: ItemOverviewLine[]
  features?: string[]
  agreement?: AgreementData
}

export type ShopItemAdditionalData = {
  similar?: ShopItem[]
  recommended?: ShopItem[]
  other_seller?: ShopItem[]
  shipping_price?: number
}

export enum ShopConditions {
  ALL = 'all',
  NEW = 'new',
  LIKE_NEW = 'like_new',
  LITTLE_USED = 'little_used',
  USED = 'used',
  SMALL_DAMAGED = 'small_damaged',
  DAMAGED = 'damaged'
}

export enum ShopSortOptions {
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
  BIDS_ASC = 'bids_asc',
  BIDS_DESC = 'bids_desc',
  NEWLY_POSTED = 'newly_posted',
  TIME_ASC = 'time_asc',
  TIME_DESC = 'time_desc',
  BUYOUT_ASC = 'buyout_asc',
  BUYOUT_DESC = 'buyout_desc',
  LIKE_DESC = 'like_desc',
  RECOMMENDED = 'recommended'
}

export enum ShopAdditionalOptions {
  NEWLY_POSTED = 'newly_posted',
  FREE_DELIVERY = 'free_delivery',
  BUY_IT_NOW = 'buy_it_now',
  WITH_PICTURES = 'with_pictures'
}

export enum ShopSellerOptions {
  ALL = 'all',
  STORE = 'store',
  INDIVIDUAL = 'individual'
}

export { SendicoShop, getShopsInOrderToDisplay, getAllShops, getUrlForShop, getImageForShop }
