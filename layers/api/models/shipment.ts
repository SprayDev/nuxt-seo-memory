import type { File } from '#layers/api/models/file'
import type { HsCode } from '#layers/api/models/hs-code'

export enum ShipmentStatusEnum {
  AWAITING_FOR_PACKAGING = 1,
  AWAITING_FOR_PAYMENT = 2,
  AWAITING_DISPATCH = 3,
  SEND = 4,
  RECEIVED = 5,
  RETURNED = 7,
  DISBANDED = 8,
  ON_HOLD = 9
}

export enum ShipmentTypeEnum {
  TYPE_SEA = 1,
  TYPE_AIR = 2
}

export enum ShipmentSuspendReasonEnum {
  MAXIMUM_DIMENSIONS_EXCEEDED = 1,
  LITHIUM_LONS = 2,
  PROHIBITED_ITEMS_FOR_COURIER = 3,
  ITEM_DOESNT_MATCH_LISTING = 4,
  PACKAGE_REQUEST_UNCLEAR = 5,
  PROHIBITED_ITEM_INCLUDED = 6,
  TOO_MANY_FRAGILE_ITEMS = 7,
  ORIGINAL_BOX_NEEDED = 8
}

export enum ShipmentCourierEnum {
  COURIER_EMS = 0,
  COURIER_AIR = 1,
  COURIER_AIR_SMALL = 2,
  COURIER_SAL = 3,
  COURIER_SAL_SMALL = 4,
  COURIER_SURFACE = 5,
  COURIER_E_PACKET = 6,
  COURIER_E_PACKET_LIGHT = 7,
  COURIER_VLADIVOSTOK = 8,
  COURIER_VLADIVOSTOK_RAIL = 9,
  COURIER_VLADIVOSTOK_BUSINESS_LINES = 10,
  COURIER_FEDEX = 11,
  COURIER_DHL = 12,
  COURIER_UPS = 13,
  COURIER_PONY_EXPRESS = 14,
  COURIER_JOOM_LOGISTICS = 15,
  COURIER_AIR_SMALL_REGISTERED = 16,
  COURIER_ECMS = 18
}

export const getSuspendReasonDescription = (reason: ShipmentSuspendReasonEnum): string => {
  switch (reason) {
    case ShipmentSuspendReasonEnum.MAXIMUM_DIMENSIONS_EXCEEDED:
      return 'pages/shipment/suspended.reasons.descriptions.maximum_dimensions_exceeded'
    case ShipmentSuspendReasonEnum.LITHIUM_LONS:
      return 'pages/shipment/suspended.reasons.descriptions.lithium_lons'
    case ShipmentSuspendReasonEnum.PROHIBITED_ITEMS_FOR_COURIER:
      return 'pages/shipment/suspended.reasons.descriptions.prohibited_items_for_courier'
    case ShipmentSuspendReasonEnum.ITEM_DOESNT_MATCH_LISTING:
      return 'pages/shipment/suspended.reasons.descriptions.item_doesnt_match_listing'
    case ShipmentSuspendReasonEnum.PACKAGE_REQUEST_UNCLEAR:
      return 'pages/shipment/suspended.reasons.descriptions.package_request_unclear'
    case ShipmentSuspendReasonEnum.PROHIBITED_ITEM_INCLUDED:
      return 'pages/shipment/suspended.reasons.descriptions.prohibited_item_included'
    case ShipmentSuspendReasonEnum.TOO_MANY_FRAGILE_ITEMS:
      return 'pages/shipment/suspended.reasons.descriptions.too_many_fragile_items'
    case ShipmentSuspendReasonEnum.ORIGINAL_BOX_NEEDED:
      return 'pages/shipment/suspended.reasons.descriptions.original_box_needed'
  }
}

export const getShipmentStatusLabel = (status: ShipmentStatusEnum): string => {
  const definitions = {
    [ShipmentStatusEnum.AWAITING_FOR_PACKAGING]: 'pages/shipments_status.awaiting_packaging',
    [ShipmentStatusEnum.AWAITING_FOR_PAYMENT]: 'pages/shipments_status.awaiting_payment',
    [ShipmentStatusEnum.AWAITING_DISPATCH]: 'pages/shipments_status.awaiting_dispatch',
    [ShipmentStatusEnum.SEND]: 'pages/shipments_status.dispatch',
    [ShipmentStatusEnum.RECEIVED]: 'pages/shipments_status.received',
    [ShipmentStatusEnum.RETURNED]: 'pages/shipments_status.returned',
    [ShipmentStatusEnum.DISBANDED]: 'pages/shipments_status.disbanded',
    [ShipmentStatusEnum.ON_HOLD]: 'pages/shipments_status.on_hold'
  }

  return definitions[status]
}

export const getShipmentStatusDescription = (status: ShipmentStatusEnum) => {
  const definitions = {
    [ShipmentStatusEnum.AWAITING_FOR_PACKAGING]: 'pages/usage_guide.parcel_status_awaiting_packaging',
    [ShipmentStatusEnum.AWAITING_FOR_PAYMENT]: 'pages/usage_guide.parcel_status_awaiting_payment',
    [ShipmentStatusEnum.AWAITING_DISPATCH]: 'pages/usage_guide.parcel_status_awaiting_dispatch',
    [ShipmentStatusEnum.SEND]: 'pages/usage_guide.parcel_status_sent',
    [ShipmentStatusEnum.RECEIVED]: 'pages/usage_guide.parcel_status_received',
    [ShipmentStatusEnum.RETURNED]: 'pages/usage_guide.parcel_status_returned',
    [ShipmentStatusEnum.DISBANDED]: 'pages/usage_guide.parcel_status_disbanded',
    [ShipmentStatusEnum.ON_HOLD]: 'pages/usage_guide.parcel_status_on_hold'
  }

  return definitions[status]
}

export const convertToShipmentStatusEnum = (str: string): ShipmentStatusEnum | undefined => {
  return ShipmentStatusEnum[str as keyof typeof ShipmentStatusEnum]
}

export const calcDeclarationFee = (declarationValue: number, company: number) => {
  if (declarationValue < 200000) {
    return 0
  }
  if (company === ShipmentCourierEnum.COURIER_DHL) {
    return 1800
  }

  if (
    [
      ShipmentCourierEnum.COURIER_AIR,
      ShipmentCourierEnum.COURIER_SURFACE,
      ShipmentCourierEnum.COURIER_EMS,
      ShipmentCourierEnum.COURIER_E_PACKET,
      ShipmentCourierEnum.COURIER_AIR_SMALL
    ].includes(company)
  ) {
    return 2800
  }

  return 0
}

export enum ParcelStatusFilter {
  required_actions = 'required_actions',
  in_stock = 'in_stock',
  completed = 'completed'
}

export type PossibleParcelFilterStatus = 'all' | ParcelStatusFilter

export type ShipmentDate = {
  packing_date: string | null
  payment_date: string | null
  dispatch_date: string | null
}

export type ShipmentPiece = {
  weight: number
  width: number
  length: number
  height: number
}

export type ShipmentDetail = {
  id: number
  used: boolean
  name: string
  junk: boolean
  price: number
  discount_price?: number
  qty: number
  hs_code: HsCode | null
  h_s_code_id: number
}

export interface Shipment {
  id: number
  number: string
  client_result_price: number | null
  delivery_company: string
  country: string
  state: string
  comment: string | null
  city: string
  files: File[]
  zip: string
  street: string
  apartment: string
  person: string
  phone: string
  client_price: number | null
  consolidation_fee: number | null
  extra_declaration_price: number | null
  protective_packaging_fee: number | null
  wrapping_fee: number | null
  insurance_fee: number | null
  vacuum_packing_fee: number | null
  total_cost: number | null
  email: string
  tracking_url: string | null
  tracking: string | null
  status: ShipmentStatusEnum
  dates: ShipmentDate | null
  pieces: ShipmentPiece[]
  items: number
  weight: number | null
  suspend_reason: ShipmentSuspendReasonEnum | null
  cancelable: boolean
  billed: boolean | null
  has_cheaper_offer: boolean | null
  has_review: boolean | null
  has_shipment_claim: boolean
  insurance: 1 | 0
  auto_pay: 1 | 0
  can_edit_declaration: boolean
  cheaper_agree: boolean
  created_at: string
  consolidation: 1 | 0 | null
  need_to_top_up: 1 | 0 | null
  wrapping: 1 | 0 | null
  protective: 1 | 0 | null
  vacuum_packing: 1 | 0 | null
}

export enum AdditionalService {
  CONSOLIDATION = 'consolidation',
  PROTECT_PACKAGE = 'protect_package',
  STRETCH = 'stretch',
  VACUUM_PACKING = 'vacuum_packing',
  INSURANCE = 'insurance'
}
