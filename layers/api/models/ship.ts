export interface Ship {
  id: number
  pieces: ShipPiece[]
  etd: string
  name: string
}

export interface ShipPiece {
  id: number
  content: string
  number: string
  client_name: string
  weight: string
  shipment_id: number
  courier_label: string
  shipment_city: string
  shipment_comment: string
  shipment_number: string
  shipment_tracking: string | null
  shipment_person: string
  shipment_phone: string
  shipment_state: string
  shipment_zip: string
  shipment_address: string
}
