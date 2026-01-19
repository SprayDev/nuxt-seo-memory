import { BidStatus } from '#layers/api/models/bid'

export enum SniperBidStatus {
  STATE_AWAITING_FOR_PLACE = 1,
  STATE_PENDING = 2,
  STATE_PLACED = 3,
  STATE_AWAITING_FOR_CHANGE_PRICE = 4,
  STATE_AWAITING_FOR_CONFIRM_CHANGE_DATE = 5,
  STATE_FAILED = 6
}

export interface SniperBid {
  id: number
  code: string
  img: string
  short_name: string
  closing_time: string
  name: string
  bid: number
  price: number
  seconds_left: number
  shop: string
  state: SniperBidStatus
  is_sniper: 1 | 0
}

const getStatusLabel = (status: SniperBidStatus) => {
  switch (status) {
    case SniperBidStatus.STATE_AWAITING_FOR_PLACE:
    case SniperBidStatus.STATE_PENDING:
      return 'Pending'
    case SniperBidStatus.STATE_PLACED:
      return 'Placed'
    case SniperBidStatus.STATE_FAILED:
      return 'Failed'
    default:
      return ''
  }
}

export { getStatusLabel }
