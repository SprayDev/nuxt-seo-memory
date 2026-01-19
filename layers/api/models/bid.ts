export interface Bid {
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
  status: BidStatus
  is_sniper: 1 | 0
}

export enum BidStatus {
  STATUS_PENDING = 1,
  STATUS_PROCESSING = 2,
  STATUS_ACCEPTED = 3,
  STATUS_FAILED = 4,
  STATUS_WON = 5,
  STATUS_LOST = 6,
  STATUS_LOSING = 7,
  STATUS_CANCELED = 8
}

const getStatusLabel = (status: BidStatus) => {
  switch (status) {
    case BidStatus.STATUS_PENDING:
      return 'Pending'
    case BidStatus.STATUS_PROCESSING:
      return 'Processing'
    case BidStatus.STATUS_ACCEPTED:
      return 'Accepted'
    case BidStatus.STATUS_FAILED:
      return 'Failed'
    case BidStatus.STATUS_WON:
      return 'Won'
    case BidStatus.STATUS_LOST:
      return 'Lost'
    case BidStatus.STATUS_LOSING:
      return 'Bid Losing'
    case BidStatus.STATUS_CANCELED:
      return 'Bid Canceled'
  }
}

const checkCanDeleteBid = (status: BidStatus, secondsLeft: number) => {
  if (secondsLeft <= 0) {
    return true
  }
  return ![
    BidStatus.STATUS_LOSING,
    BidStatus.STATUS_ACCEPTED,
    BidStatus.STATUS_PENDING,
    BidStatus.STATUS_PROCESSING,
    BidStatus.STATUS_FAILED
  ].includes(status)
}

enum BidType {
  default = 'default',
  sniper = 'sniper'
}

export { getStatusLabel, checkCanDeleteBid, BidType }
