import { ApiBaseService } from '#layers/api/services/api-base-service'
import type { Notification, Update } from '#layers/api/models/notification'
import type { Message, MessageTypeWithAll } from '#layers/api/models/message'
import type { PaginatedResponse } from '#layers/api/models/sendico-base'

export default class MessengerService extends ApiBaseService {
  async getUpdates() {
    return await this.call<Update[]>('updates')
  }

  async getNotifications() {
    return await this.call<Notification[]>('notifications')
  }

  async readNotification(id: string) {
    return await this.call(`notifications/${id}/read`, {
      method: 'put'
    })
  }

  async readAll() {
    return await this.call('notifications/read/all', {
      method: 'post'
    })
  }

  async sendMessage(formData: FormData) {
    return await this.call<
      | 1
      | {
          message: string
        }
    >('messages', {
      method: 'post',
      body: formData
    })
  }

  async getMessages(page: number, search: string | undefined, type?: MessageTypeWithAll) {
    return await this.call<PaginatedResponse<Message>>('messages', {
      query: {
        page,
        search,
        type
      }
    })
  }

  async getUnreadNotificationsCount() {
    return await this.call('notifications/count')
  }
}
