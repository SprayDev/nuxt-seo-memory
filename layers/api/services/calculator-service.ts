import { ApiBaseService } from '#layers/api/services/api-base-service'
import type { EstimationDelivery } from '#layers/api/models/esitmation'
import type { DeliveryExample } from '#layers/api/models/delivery-example'

interface CalculateBody {
  country_id: number
  zip: string
  city: string
  weight: number
  length: number
  width: number
  height: number
  price?: number
}

export default class CalculatorService extends ApiBaseService {
  async calculate(input: CalculateBody) {
    return await this.call<EstimationDelivery[]>('calculate', {
      method: 'POST',
      body: input
    })
  }

  async getExamples() {
    return await this.call<DeliveryExample[]>('calculator/examples')
  }
}
