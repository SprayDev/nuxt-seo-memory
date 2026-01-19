import { ApiBaseService } from '#layers/api/services/api-base-service'
import type { WalletInvoice } from '#layers/api/models/wallet-invoice'
import type { PaginatedResponse } from '#layers/api/models/sendico-base'
import type { Deposit } from '#layers/api/models/deposit'
import type { HoldFound } from '#layers/api/models/HoldFound'

export type LastWalletInvoiceData = {
  id: number
  name: string
  company: string
  tax_id_number: string | null
  business_id: string | null
  vat_number: string | null
  eori: string | null
  street: string
  house_number: string
  city: string
  zip: string
  user_id: number
  start_at: string
  end_at: string
}

export default class UserDepositService extends ApiBaseService {
  async sendRefundRequest(amount: number, comment: string, method: string, email: string) {
    return await this.call('messages/refund', {
      method: 'post',
      body: {
        amount,
        comment,
        method,
        email
      }
    })
  }

  async getDeposits(filters: Record<string, unknown>) {
    return await this.call<PaginatedResponse<Deposit>>('deposits', {
      query: filters
    })
  }

  async getHolds(filters: Record<string, unknown>) {
    return await this.call<PaginatedResponse<HoldFound>>('holds', {
      query: filters
    })
  }

  async getRequired(filters: Record<string, unknown>) {
    return await this.call('required', {
      query: filters
    })
  }

  async initPayment(service: string, data: Record<string, unknown>) {
    return await this.call(`/wallet/deposit-${service}`, {
      method: 'post',
      body: data
    })
  }

  async initPaymentV2(service: 'paypal', data: Record<string, unknown>) {
    return await this.call(`/wallet/deposit/v2/${service}`, {
      method: 'post',
      body: data
    })
  }

  async approvePayment(service: string, orderId: string) {
    return await this.call(`/wallet/deposit/${service}/${orderId}/approve`, {
      method: 'post'
    })
  }

  async addDepositAvailability(service: string) {
    return await this.call('/wallet/top-up/availability', {
      query: {
        method: 'veritrans'
      }
    })
  }

  async generateWalletInvoice(walletInvoiceData: Omit<WalletInvoice, 'user_id'>) {
    return await this.call<{
      id: number
    }>('/wallet/deposit-invoice', {
      method: 'post',
      body: walletInvoiceData
    })
  }

  async getLastWalletInvoiceData() {
    return await this.call<LastWalletInvoiceData>('/wallet/deposit-invoice/last')
  }

  async getWiseQr() {
    return await this.call('/wallet/deposit/transferwise/qr')
  }

  async makeStripePaymentIntent(amount: number, requested_amount: number, save_card: boolean) {
    return await this.call('/wallet/deposit/stripe/payment-intent', {
      method: 'post',
      body: { amount, requested_amount, save_card }
    })
  }

  async getStripePaymentCards() {
    return await this.call('/wallet/deposit/stripe/payment-methods')
  }

  async makeStripeIntentWithCard(amount: number, requested_amount: number, payment_method_id: string) {
    return await this.call('/wallet/deposit/stripe/intent-with-card', {
      method: 'post',
      body: { amount, requested_amount, payment_method_id }
    })
  }

  async deleteStripeCard(payment_method_id: string) {
    return await this.call('/wallet/deposit/stripe/delete-card', {
      method: 'post',
      body: { payment_method_id }
    })
  }
}
