import type { Country } from '#layers/api/models/country'
import type { State } from '#layers/api/models/state'

export interface Destination {
  id: number
  person: string
  phone: string
  email: string | null
  billing: boolean
  country_id: number
  country: string
  city: string
  state: string | null
  zip: string
  street: string
  country_foreign?: Country | null
  state_foreign?: State | null
  apartment: string | null
}
