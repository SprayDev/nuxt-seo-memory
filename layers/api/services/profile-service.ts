import { ApiBaseService } from '#layers/api/services/api-base-service'
import type { UserAgreementType } from '#layers/api/models/user-agreement'
import type { SendicoShop } from '#layers/api/models/shop'

export type UpdateProfileData = {
  first_name: string
  last_name: string
  email?: string
  language?: string
  timezone?: string
  is_business?: boolean
  company_address?: string
  business_id?: string
  tax_id?: string
  vat_number?: string
  EORI?: string
}

export default class ProfileService extends ApiBaseService {
  async updateCurrency(currency: string) {
    return await this.call(`currency/${currency}`, {
      method: 'PUT'
    })
  }

  async addAgreement(shop: SendicoShop, code: string, agreementType: UserAgreementType, agreed: boolean) {
    return await this.call(`agreement/${agreementType}`, {
      method: 'post',
      body: {
        agreed,
        code,
        shop
      }
    })
  }

  async updateProfile(data: UpdateProfileData) {
    return await this.call('profile', {
      method: 'put',
      body: data
    })
  }

  async updatePassword(currentPassword: string, newPassword: string, confirmPassword: string) {
    return await this.call('profile/password', {
      method: 'put',
      body: {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword
      }
    })
  }

  async updateNotifications(notificationType: string, value: boolean) {
    return await this.call('profile/notifications', {
      method: 'PUT',
      body: {
        field: notificationType,
        value
      }
    })
  }

  async changeLocale(locale: string) {
    return await this.call(`profile/locale/${locale}`, {
      method: 'PUT'
    })
  }

  async requestOTP(phone: string) {
    return await this.call('profile/phone/send-otp', {
      body: {
        phone
      },
      method: 'POST'
    })
  }

  async submitOTP(code: string) {
    return await this.call('profile/phone/submit-otp', {
      body: {
        code
      },
      method: 'POST'
    })
  }
}
