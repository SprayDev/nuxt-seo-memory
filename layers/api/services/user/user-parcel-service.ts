import { ApiBaseService } from '#layers/api/services/api-base-service'
import type { FileType } from '#layers/api/models/file'
import type { PaginatedResponse } from '#layers/api/models/sendico-base'
import type { AdditionalService, Shipment, ShipmentDetail } from '#layers/api/models/shipment'
import type { DeclarationItem, Item } from '#layers/api/models/item'
import type { EstimationDelivery } from '#layers/api/models/esitmation'
import type { StoreDeclarationItem } from '~/composables/useCreateParcelStore'
import type { DeclarationUpdateData } from '~/composables/actions/shipmentActions'

type ParcelListMeta = {
  awaiting_action: number
  awaiting_respond: number
  in_stock: number
  completed: number
  all: number
}

type ShipmentDeliveriesResponse = {
  estimations: EstimationDelivery[]
  total_weight: number
}

type PreparedDeclarationData = {
  items: DeclarationItem[]
  total_price: number
  hs_sign: true
  group_able: boolean
  resend_shipment: {
    discount: number
    grouped: 1 | 0
  }
  show_declaration_undervalue: boolean
  max_undervalue: number
  country_id: number
  show_usd: boolean
  usd_rate: string
}

type PossibleDeliveriesResponse = {
  estimations: EstimationDelivery[]
  jp_estimations: EstimationDelivery[]
  others_estimations: EstimationDelivery[]
  total_weight: number
  dhl_removed: boolean
  ecms_estimation: EstimationDelivery | []
}

type ParcelConfirmationData = {
  total_weight: number
  total_items: number
  courier_name: string
  address_line: string
  destination_email: string
  resend_shipment: null | Shipment
  duties: null | number
  country: string
}

type ParcelListResponse = PaginatedResponse<Shipment, ParcelListMeta>

export default class UserParcelService extends ApiBaseService {
  async payParcel(id: number, companyId?: number | null, price?: number | null) {
    // !IMPORTANT!
    // company id and price only if you are paying from choose delivery page (OLD: dashboard.parcels.pay)
    return await this.call(`/parcels/${id}/pay`, {
      method: 'post',
      body: {
        company: companyId,
        price
      }
    })
  }

  async getParcels(query: Record<string, unknown>) {
    return await this.call<ParcelListResponse>('/parcels', {
      query: buildRequestObjectV2(query)
    })
  }

  async getParcel(parcelId: number) {
    return await this.call<Shipment>(`/parcels/${parcelId}`)
  }

  async getParcelItems(parcelId: number) {
    return await this.call<Item[]>(`/parcels/${parcelId}/items`)
  }

  async getParcelDeclaration(parcelId: number) {
    return await this.call<ShipmentDetail[]>(`/parcels/${parcelId}/declaration`)
  }

  async updateParcelDeclaration(parcelId: number, data: DeclarationUpdateData[]) {
    return await this.call(`/parcels/${parcelId}/declaration/update`, {
      method: 'PUT',
      body: data
    })
  }

  async receiveParcel(parcelId: number) {
    return await this.call(`/parcels/${parcelId}/receive`, {
      method: 'POST'
    })
  }

  async getPreparedDeclaration(
    items: number[],
    grouped: boolean,
    resendShipmentId?: number | null,
    destinationId?: number | null
  ) {
    return await this.call<PreparedDeclarationData>('/parcels/declaration', {
      query: buildRequestObjectV2({
        items,
        grouped,
        resend_shipment_id: resendShipmentId,
        destination_id: destinationId
      })
    })
  }

  async getPossibleDeliveries(
    destinationId: number,
    items: number[],
    needToInsurance: boolean,
    declarationValue: number | null = null,
    declarationDiscount: number | null = 0
  ) {
    return await this.call<PossibleDeliveriesResponse>('/parcels/deliveries', {
      query: buildRequestObjectV2({
        destination_id: destinationId,
        declaration_value: declarationValue,
        need_to_insurance: +needToInsurance,
        declaration_discount: declarationDiscount,
        items
      })
    })
  }

  async getDeliveriesForShipment(shipmentId: number) {
    return await this.call<ShipmentDeliveriesResponse>(`/parcels/${shipmentId}/deliveries`)
  }

  async getConfirmationData(
    itemIds: number[],
    deliveryId: number | null,
    destinationId: number | null,
    resendShipmentId: number | null = null
  ) {
    return await this.call<ParcelConfirmationData>('/parcels/confirmation/data', {
      query: buildRequestObjectV2({
        items: itemIds,
        delivery_id: deliveryId,
        destination_id: destinationId,
        resend_from_id: resendShipmentId
      })
    })
  }

  async confirmParcel(
    destinationId: number,
    deliveryId: number,
    itemIds: number[],
    declarationItems: StoreDeclarationItem[],
    isAutoPay: number | boolean,
    addCostInvoice: number | boolean,
    additionalServices: AdditionalService[],
    comment: string,
    grouped: boolean,
    discount: number,
    resendShipmentId: number | null = null,
    cheaperAgree = false,
    checkAgreement = false,
    service: string | null = null
  ) {
    return await this.call('/parcels/confirm', {
      method: 'POST',
      body: {
        item_ids: itemIds,
        delivery_id: deliveryId,
        destination_id: destinationId,
        declaration_items: declarationItems,
        is_auto_pay: isAutoPay,
        add_cost_invoice: addCostInvoice,
        additional_services: additionalServices,
        resend_shipment_id: resendShipmentId,
        cheaper_agree: cheaperAgree,
        comment,
        grouped,
        discount,
        check_agreement: checkAgreement,
        delivery_service: service
      }
    })
  }

  async cancelShipment(id: number) {
    return await this.call(`parcels/${id}/cancel`, { method: 'POST' })
  }

  async submitClaim(id: number, comment: string, itemsIds: number[]) {
    return await this.call(`parcels/${id}/claim`, {
      method: 'POST',
      body: {
        comment,
        items_ids: itemsIds
      }
    })
  }

  async uploadClaimImages(shipmentId: number, claimId: number, type: FileType, files: any) {
    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      formData.append(`images[${i}]`, file, `${i}-${type}-${file.name}`)
    }
    return await this.call(`parcels/${shipmentId}/claim/${claimId}/files/${type}`, {
      method: 'POST',
      body: formData
    })
  }
}
