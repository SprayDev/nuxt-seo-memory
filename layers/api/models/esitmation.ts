export interface EstimationDelivery {
  id: number
  img: string
  title: string
  price: number
  available: boolean
  service: string
  description: string
  delivery: string
  total_size: number
  max_size: number
  box_quantity: number
  max_weight: number
  doubled_perimeter: number
  max_length: number
  max_length_perimeter: number
  max_weight_box: number
  show_service?: boolean
  insurance_available?: boolean
  insurance_cost?: number
  insurance_free?: boolean
}
