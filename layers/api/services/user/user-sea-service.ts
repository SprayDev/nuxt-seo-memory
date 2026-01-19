import { ApiBaseService } from '#layers/api/services/api-base-service'
import type { Ship } from '#layers/api/models/ship'

export class UserSeaService extends ApiBaseService {
  async getDispatchedShips() {
    return await this.call<Ship[]>('/sea/dispatched/ships')
  }

  async setTrackingNumber(shipment: number, trackNumber: string) {
    return await this.call(`/sea/dispatched/ships/${shipment}/tracking`, {
      method: 'post',
      body: {
        track_number: trackNumber
      }
    })
  }

  async getShip(shipId: number) {
    return await this.call<Ship>(`/sea/dispatched/ships/${shipId}`)
  }

  async getShipPieces(shipId: number) {
    return await this.call(`/sea/dispatched/ships/${shipId}/pieces`)
  }
}
