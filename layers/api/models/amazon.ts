export type AmazonCategory = {
  displayName: string
  id: string
}

export type AmazonSubCategory = {
  displayName: string
  id: number
}

export enum RefinementSelectionType {
  MULTI_SELECTOR = 'MultiSelectOR',
  INSTEAD_SELECT = 'InsteadSelect'
}

export type RefinementValue = {
  displayName: string
  searchRefinementValue: string
  cleanRefinementValue: string
}

export type SearchRefinement = {
  displayValue: string
  refinementValues: RefinementValue[]
  refinementKey: string
  selectionType: RefinementSelectionType
}

export type DimensionValue = {
  index: number
  title: string
  item_code: string | null
  image: {
    thumbnail: string
    large: string
  }
}

export type OfferData = {
  id: string
  availability: string
  list_price: number | null
  price: number
  price_type: string
  price_without_tax: number
  condition: string
  condition_note: string
  quantity_limits: {
    min: number
    max: number
  }
  delivery_information: string
  discount_data?: {
    value: number
    percent: number
  }
}

export type Dimension = {
  index: number
  title: string
  is_color: boolean
  values: DimensionValue[]
}

export type CurrentItemVariation = {
  asin: string
  variationValues: {
    index: number
    value: number
  }[]
}

export type ItemVariation = {
  code: string
  values: {
    index: number
    value: number
  }[]
}

export type ItemOverviewLine = {
  value: string
  label: string
}
