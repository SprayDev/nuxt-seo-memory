export interface File {
  id: number
  name: string
  link: string
  is_image?: boolean
}

export const enum FileType {
  FILE_TYPE_SHIPMENT_CLAIM_BOX = 1,
  FILE_TYPE_SHIPMENT_CLAIM_TROUBLE = 2,
  FILE_TYPE_SHIPMENT_CLAIM_NUMBER = 3,
  FILE_TYPE_SHIPMENT_CLAIM_INVOICE = 4
}
