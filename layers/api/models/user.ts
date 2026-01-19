export interface UserState {
  name: string
  code: string
  type: string
  country_id: number
}

export interface User {
  id: number
  email: string
  role: string
  roles: string[]
  permissions: string[]
  name: string
  balance: number
  locale: string | null
  verified: boolean
  phone_verified: boolean
  verified_at: string | null // TZ
  full_name: string
  first_name: string
  last_name: string
  phone: string | null
  language: string | null
  state: UserState | null
  state_id: string | null
  city: string | null
  country_id: string | null
  country: string | null
  zip: string | null
  address: string | null
  trusted: number | null
  declaration_trusted: number | null
  shipping_trusted: number | null
  super_client: number | null
  as_sender: number
  allow_blocked_items: number | null
  favorites_notificate_disabled: number | null
  sea_shipping_cost: number | null
  hold: number
  required: number
  loan: number | null
  banned: number | null
  timezone: string | null
  currency: string
  links_limit: number | null
  is_business: boolean
  company_address: string | null
  business_id: string | null
  tax_id: string | null
  vat_number: string | null
  EORI: string | null
  subscriptions?: Record<string, boolean>
}
