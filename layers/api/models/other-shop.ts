export interface OtherShopType {
  id: number
  category_id: number
  slug: string
  body: {
    [key: string]: string
  }
  description: {
    [key: string]: string
  }
  image: string
  link: string
  title: string
}

export interface OtherShopCategoryType {
  id: number
  title: string
  shops: OtherShopType[]
}
