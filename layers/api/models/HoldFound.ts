export interface HoldFound {
  id: number
  item?: {
    id: number
  } | null
  parcel?: {
    id: number
  } | null
  amount: number
  bid_id: number
  item_id: number
  created_at: string
}
