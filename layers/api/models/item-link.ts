export interface ItemLink {
  id: number
  name: string
  url: string
  comment: string
  price: number | null
  inland_shipping: number | null
  manager_comment: string | null
  out_of_stock: boolean
  quantity?: number
  name_en?: string
}
