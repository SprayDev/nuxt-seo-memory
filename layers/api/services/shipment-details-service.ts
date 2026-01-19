import { ApiBaseService } from '#layers/api/services/api-base-service'

type FakeShipmentItemDetail = {
  id: number
  name: string
  description: string
  images: string[]
  total_price: number
  qty: number
  weight: number
}

export default class ShipmentDetailsService extends ApiBaseService {
  async getShipmentDetail(id: number) {
    return await this.call<FakeShipmentItemDetail>(`/shipment-details/${id}`)
  }
}
