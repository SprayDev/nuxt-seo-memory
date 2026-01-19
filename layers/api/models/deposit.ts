export interface Deposit {
  id: number
  created_at: string
  method_label: string
  value: number
  balance: number
  type: 1 | 0
  transaction_id: string | null
  links: {
    type: string
    id: string
    text: string
  } | null
}
