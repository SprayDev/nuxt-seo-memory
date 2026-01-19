import { ApiBaseService } from '#layers/api/services/api-base-service'
import type { StoreMultipleContentCheckData } from '#layers/api/models/content-check'
import type { SplitItemRequestLineFormType } from '#layers/api/models/split-item-request'
import type { Item } from '#layers/api/models/item'
import type { PaginatedResponse } from '#layers/api/models/sendico-base'

type OrderListMeta = {
  awaiting_action: number
  awaiting_respond: number
  in_stock: number
  completed: number
  actual: number
  in_parcel: number
  not_in_parcel: number
  all: number
  ready_to_package_total_price: number
  ready_to_package_prices: Record<number, number>
}

type OrderListResponse = PaginatedResponse<Item, OrderListMeta>

export default class UserOrderService extends ApiBaseService {
  async getOrderList(filters: Record<string, unknown>) {
    return await this.call<OrderListResponse>('/orders', {
      query: buildRequestObject({ ...filters }, ['statuses'])
    })
  }

  async getOrder(id: number) {
    return await this.call<Item>(`/orders/${id}`)
  }

  async requestContentCheck(id: number, details: string) {
    return await this.call(`/orders/${id}/contentsCheck`, {
      method: 'post',
      body: {
        details
      }
    })
  }

  async requestMultipleContentCheck(contentCheckData: StoreMultipleContentCheckData) {
    return await this.call('/orders/contentsCheck', {
      method: 'post',
      body: {
        content_check: contentCheckData
      }
    })
  }

  async cancelOrder(id: number) {
    return await this.call(`/orders/${id}/cancel`, {
      method: 'post'
    })
  }

  async makeContentCheckDecision(id: number, accept: boolean, reason?: string) {
    return await this.call(`/orders/${id}/confirmContent`, {
      method: 'post',
      body: {
        decision: accept,
        reason
      }
    })
  }

  async payOrder(id: number) {
    return await this.call(`/orders/${id}/pay`, {
      method: 'post'
    })
  }

  async fetchOrders(ids: number[]) {
    return await this.call<Item[]>('/orders/chunk', {
      method: 'post',
      body: {
        ids
      }
    })
  }

  async getReadyForShipmentOrders() {
    return await this.call<Item[]>('/orders/ready-to-ship')
  }

  async updateItemContentCheckComment(id: number, itemId: number, comment: string) {
    return await this.call(`/orders/${itemId}/contentsCheck/${id}`, {
      method: 'post',
      body: {
        comment
      }
    })
  }

  async splitItem(id: number, splitLines: SplitItemRequestLineFormType[], comment: string) {
    return await this.call(`/orders/${id}/split`, {
      method: 'post',
      body: {
        lines: splitLines,
        comment
      }
    })
  }
}
