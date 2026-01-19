import type { ConcreteComponent } from 'vue'
import type { File } from '#layers/api/models/file'
import type { HsCode } from '#layers/api/models/hs-code'
import type ContentCheck from '#layers/api/models/content-check'
import type { ItemLink } from '#layers/api/models/item-link'
import type { SplitItemRequest } from '#layers/api/models/split-item-request'

type DefinitionIcons = {
  letters: ConcreteComponent | string
  big_stuff: ConcreteComponent | string
  long_stuff: ConcreteComponent | string
  container: ConcreteComponent | string
  common: ConcreteComponent | string
}

type StockType = keyof DefinitionIcons

export type StatusDefinition = {
  [OrderStatusEnum.STATUS_PENDING]: string
  [OrderStatusEnum.STATUS_NEGOTIATION]: string
  [OrderStatusEnum.STATUS_PURCHASE]: string
  [OrderStatusEnum.STATUS_PAID_TO_SELLER]: string
  [OrderStatusEnum.STATUS_AWAITING_PAYMENT]: string
  [OrderStatusEnum.STATUS_WAREHOUSE]: string
  [OrderStatusEnum.STATUS_DISPATCHED]: string
  [OrderStatusEnum.STATUS_RECEIVED]: string
  [OrderStatusEnum.STATUS_CANCELED]: string
  [OrderStatusEnum.STATUS_UTILIZED]: string
  [OrderStatusEnum.STATUS_FAILED]: string
}

const getIconForStockType = (stockType: StockType) => {
  const IconEnvelope = resolveComponent('IconEnvelope')
  const IconPackageBox = resolveComponent('IconPackageBox')
  const IconFishingRod = resolveComponent('IconFishingRod')
  const IconContainer = resolveComponent('IconContainer')
  const IconSmallPackage = resolveComponent('IconSmallPackage')

  const definitionIcons: DefinitionIcons = {
    letters: IconEnvelope,
    big_stuff: IconPackageBox,
    long_stuff: IconFishingRod,
    container: IconContainer,
    common: IconSmallPackage
  }

  return definitionIcons[stockType]
}

export enum OrderPlatformEnum {
  YAHOO_SHOPPING = 0,
  YAHOO_AUCTION = 1,
  RAKUTEN = 2,
  MERCARI = 4,
  RAKUMA = 5
}

export const PlatformNames = {
  [OrderPlatformEnum.MERCARI]: 'Mercari',
  [OrderPlatformEnum.RAKUMA]: 'Rakuma',
  [OrderPlatformEnum.RAKUTEN]: 'Rakuten',
  [OrderPlatformEnum.YAHOO_SHOPPING]: 'JDirectItems Shopping',
  [OrderPlatformEnum.YAHOO_AUCTION]: 'JDirectItems Auction'
}

export enum OrderStatusEnum {
  STATUS_PENDING = 1,
  STATUS_AWAITING_PAYMENT = 2,
  STATUS_NEGOTIATION = 3,
  STATUS_PURCHASE = 4,
  STATUS_PAID_TO_SELLER = 5,
  STATUS_WAREHOUSE = 6,
  STATUS_DISPATCHED = 7,
  STATUS_RECEIVED = 8,
  STATUS_CANCELED = 9,
  STATUS_UTILIZED = 10,
  STATUS_FAILED = 11
}

export enum ContentsCheckStatus {
  CHECK_NOT_REQUIRED = 0,
  CHECK_REQUIRED = 1,
  CONTENTS_MATCH = 2,
  CONTENTS_HAS_PROBLEM = 3,
  SECRET_CHECK = 4
}

export enum ContentCheckDecision {
  CONTENTS_CHECK_DECISION_ACCEPTED = 1,
  CONTENTS_CHECK_DECISION_CANCELED = 0
}

export interface ItemDate {
  arrived_to_stock?: string | null
  shipped?: string | null
}

export interface Item {
  id: number
  shipment_id: number
  commission: number
  number: string
  cancel_reason: string
  code: string
  url: string
  name: string | null
  short_name: string | null
  original_name: string | null
  total_qty: number | null
  weight: number | null
  price?: number | null
  price_with_tax: number | null
  extra: number | null
  shipping: number | null
  split_cost: number | null
  total_price: number | null
  payment_date?: string | null
  comment?: string | null
  images: string[]
  img: string
  is_splitted?: boolean
  is_hs_code_not_trusted?: boolean
  created_at: string
  contents_check_images: string[]
  platform: OrderPlatformEnum | null
  status: OrderStatusEnum
  contents_check: ContentsCheckStatus
  files: File[]
  dates?: ItemDate | null
  hs_codes: HsCode[]
  links: ItemLink[]
  content_check: ContentCheck | null
  cancelable: boolean
  is_shop: boolean
  show_contents_check_section: boolean
  can_be_packaged?: boolean
  can_confirm_contents_check: boolean
  split_item_request: SplitItemRequest
}

export type DeclarationItem = Item & {
  hs_name: string
  h_s_code_id: number
}

const getContentCheckStatusLabel = (contentCheckStatus: ContentsCheckStatus): string => {
  const { t } = useI18n()
  switch (contentCheckStatus) {
    case ContentsCheckStatus.CHECK_NOT_REQUIRED:
      return t('pages/items_status.not_required')
    case ContentsCheckStatus.CHECK_REQUIRED:
      return t('pages/items_status.check_required')
    case ContentsCheckStatus.CONTENTS_MATCH:
      return t('pages/items_status.contents_match')
    case ContentsCheckStatus.CONTENTS_HAS_PROBLEM:
      return t('pages/items_status.has_problem')
    case ContentsCheckStatus.SECRET_CHECK:
      return t('pages/items_status.not_required')
  }
}

const getStatusIcon = (status: keyof StatusDefinition) => {
  let iconName = ''

  switch (status) {
    case OrderStatusEnum.STATUS_PENDING:
      iconName = 'i-lucide-clipboard-list'
      break
    case OrderStatusEnum.STATUS_NEGOTIATION:
      iconName = 'i-lucide-message-circle-more'
      break
    case OrderStatusEnum.STATUS_PURCHASE:
      iconName = 'i-lucide-shopping-cart'
      break
    case OrderStatusEnum.STATUS_PAID_TO_SELLER:
      iconName = 'i-lucide-circle-dollar-sign'
      break
    case OrderStatusEnum.STATUS_AWAITING_PAYMENT:
      iconName = 'i-lucide-timer'
      break
    case OrderStatusEnum.STATUS_WAREHOUSE:
      iconName = 'i-lucide-warehouse'
      break
    case OrderStatusEnum.STATUS_DISPATCHED:
      iconName = 'i-lucide-plane-takeoff'
      break
    case OrderStatusEnum.STATUS_RECEIVED:
      iconName = 'i-lucide-check-check'
      break
    case OrderStatusEnum.STATUS_CANCELED:
      iconName = 'i-lucide-circle-x'
      break
    case OrderStatusEnum.STATUS_UTILIZED:
      iconName = 'i-lucide-trash-2'
      break
    case OrderStatusEnum.STATUS_FAILED:
      iconName = 'i-lucide-triangle-alert'
      break
  }
  return iconName
}

const getStatusLabel = (status: keyof StatusDefinition) => {
  const { t } = useI18n()

  const definitions: StatusDefinition = {
    [OrderStatusEnum.STATUS_PENDING]: t('pages/items_status.pending'),
    [OrderStatusEnum.STATUS_NEGOTIATION]: t('pages/items_status.negotiation'),
    [OrderStatusEnum.STATUS_PURCHASE]: t('pages/items_status.purchase'),
    [OrderStatusEnum.STATUS_PAID_TO_SELLER]: t('pages/items_status.paid'),
    [OrderStatusEnum.STATUS_AWAITING_PAYMENT]: t('pages/items_status.awaiting_payment'),
    [OrderStatusEnum.STATUS_WAREHOUSE]: t('pages/items_status.warehouse'),
    [OrderStatusEnum.STATUS_DISPATCHED]: t('pages/items_status.dispatched'),
    [OrderStatusEnum.STATUS_RECEIVED]: t('pages/items_status.received'),
    [OrderStatusEnum.STATUS_CANCELED]: t('pages/items_status.canceled'),
    [OrderStatusEnum.STATUS_UTILIZED]: t('pages/items_status.utilized'),
    [OrderStatusEnum.STATUS_FAILED]: t('pages/items_status.failed')
  }

  return definitions[status]
}

const getStatusDescription = (status: keyof StatusDefinition) => {
  const { t } = useI18n()
  const definitions: StatusDefinition = {
    [OrderStatusEnum.STATUS_PENDING]: t('pages/usage_guide.status_pending'),
    [OrderStatusEnum.STATUS_NEGOTIATION]: t('pages/usage_guide.status_negotiation'),
    [OrderStatusEnum.STATUS_PURCHASE]: t('pages/usage_guide.status_purchase'),
    [OrderStatusEnum.STATUS_PAID_TO_SELLER]: t('pages/usage_guide.status_paid'),
    [OrderStatusEnum.STATUS_AWAITING_PAYMENT]: t('pages/usage_guide.status_awaiting_payment'),
    [OrderStatusEnum.STATUS_WAREHOUSE]: t('pages/usage_guide.status_warehouse'),
    [OrderStatusEnum.STATUS_DISPATCHED]: t('pages/usage_guide.status_dispatched'),
    [OrderStatusEnum.STATUS_RECEIVED]: t('pages/usage_guide.status_received'),
    [OrderStatusEnum.STATUS_CANCELED]: t('pages/usage_guide.status_canceled'),
    [OrderStatusEnum.STATUS_UTILIZED]: t('pages/usage_guide.status_utilized'),
    [OrderStatusEnum.STATUS_FAILED]: t('pages/usage_guide.status_failed')
  }

  return definitions[status]
}

const getItemStatusLabel = (status: OrderStatusEnum) => {
  const definitions = {
    [OrderStatusEnum.STATUS_PENDING]: 'pages/items_status.pending',
    [OrderStatusEnum.STATUS_NEGOTIATION]: 'pages/items_status.negotiation',
    [OrderStatusEnum.STATUS_PURCHASE]: 'pages/items_status.purchase',
    [OrderStatusEnum.STATUS_PAID_TO_SELLER]: 'pages/items_status.paid',
    [OrderStatusEnum.STATUS_AWAITING_PAYMENT]: 'pages/items_status.awaiting_payment',
    [OrderStatusEnum.STATUS_WAREHOUSE]: 'pages/items_status.warehouse',
    [OrderStatusEnum.STATUS_DISPATCHED]: 'pages/items_status.dispatched',
    [OrderStatusEnum.STATUS_RECEIVED]: 'pages/items_status.received',
    [OrderStatusEnum.STATUS_CANCELED]: 'pages/items_status.canceled',
    [OrderStatusEnum.STATUS_UTILIZED]: 'pages/items_status.utilized',
    [OrderStatusEnum.STATUS_FAILED]: 'pages/items_status.failed'
  }

  return definitions[status]
}

const getItemStatusDescription = (status: OrderStatusEnum) => {
  const definitions = {
    [OrderStatusEnum.STATUS_PENDING]: 'pages/usage_guide.status_pending',
    [OrderStatusEnum.STATUS_NEGOTIATION]: 'pages/usage_guide.status_negotiation',
    [OrderStatusEnum.STATUS_PURCHASE]: 'pages/usage_guide.status_purchase',
    [OrderStatusEnum.STATUS_PAID_TO_SELLER]: 'pages/usage_guide.status_paid',
    [OrderStatusEnum.STATUS_AWAITING_PAYMENT]: 'pages/usage_guide.status_awaiting_payment',
    [OrderStatusEnum.STATUS_WAREHOUSE]: 'pages/usage_guide.status_warehouse',
    [OrderStatusEnum.STATUS_DISPATCHED]: 'pages/usage_guide.status_dispatched',
    [OrderStatusEnum.STATUS_RECEIVED]: 'pages/usage_guide.status_received',
    [OrderStatusEnum.STATUS_CANCELED]: 'pages/usage_guide.status_canceled',
    [OrderStatusEnum.STATUS_UTILIZED]: 'pages/usage_guide.status_utilized',
    [OrderStatusEnum.STATUS_FAILED]: 'pages/usage_guide.status_failed'
  }

  return definitions[status]
}

export enum OrderStatusFilter {
  required_actions = 'required_actions',
  actual = 'actual',
  in_stock = 'in_stock',
  in_parcel = 'in_parcel',
  not_in_parcel = 'not_in_parcel',
  completed = 'completed'
}

export type PossibleOrderFilterStatus = 'all' | OrderStatusFilter

export const DIVISION_ITEMS_QUANTITY = 10

export {
  getIconForStockType,
  getStatusIcon,
  getStatusLabel,
  getStatusDescription,
  getContentCheckStatusLabel,
  getItemStatusLabel,
  getItemStatusDescription
}
