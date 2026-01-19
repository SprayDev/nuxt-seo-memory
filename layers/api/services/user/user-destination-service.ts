import { ApiBaseService } from '#layers/api/services/api-base-service'
import type { Destination } from '#layers/api/models/destination'

export type UpdateDestinationData = {
  first_name: string
  last_name: string
  email: string
  phone: string
  country_id: number
  state_id?: number
  state?: string | null
  city: string
  zip: string
  street: string
  apartment?: string | null
}

export default class UserDestinationService extends ApiBaseService {
  async getDestinations() {
    return await this.call<Destination[]>('destinations')
  }

  async getDestinationsById(id: number) {
    return await this.call<Destination>(`profile/destinations/${id}`)
  }

  async updateDestination(id: number, data: UpdateDestinationData) {
    return await this.call(`destinations/${id}`, {
      method: 'post',
      body: data
    })
  }

  async addNewDestination(data: UpdateDestinationData) {
    return await this.call('destinations', {
      method: 'post',
      body: data
    })
  }

  async deleteDestination(id: number) {
    return await this.call(`destinations/${id}`, {
      method: 'delete'
    })
  }

  async setBilling(id: number) {
    return await this.call(`destinations/${id}/billing`, {
      method: 'post'
    })
  }
}
