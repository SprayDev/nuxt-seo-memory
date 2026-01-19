// import User from "../models/User";
import { ApiBaseService } from './api-base-service'
import type { User } from '#layers/api/models/user'

export type LoginResponse = {
  token: string
}

export default class AuthenticationService extends ApiBaseService {
  async login(email: string, password: string, remember = true): Promise<LoginResponse> {
    return await this.call('/login', {
      method: 'post',
      body: { login: email, password, remember }
    })
  }

  async logout(): Promise<unknown> {
    return await this.call('/logout', { method: 'post' })
  }

  async register(
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
    referralCode?: string,
    captcha?: string
  ): Promise<LoginResponse> {
    return await this.call('register', {
      method: 'post',
      body: {
        email,
        password,
        full_name: name,
        password_confirmation,
        referral: referralCode ?? '',
        'g-recaptcha-response': captcha
      }
    })
  }

  async passwordForgot(email: string): Promise<{
    message: string
  }> {
    return await this.call('/email/forgot-password', {
      method: 'post',
      body: { email }
    })
  }

  async passwordReset(token: string, email: string, password: string, password_confirmation: string) {
    return await this.call<{
      message: string
    }>('reset-password', {
      method: 'post',
      body: { email, token, password, password_confirmation }
    })
  }

  async emailSendVerification(): Promise<number> {
    return await this.call('/email/verification-notification', {
      method: 'post'
    })
  }

  async socialLogin(provider: string, data: Record<string, unknown>) {
    return await this.call(`auth/${provider}/login`, {
      method: 'post',
      body: data
    })
  }

  async user(): Promise<User> {
    return await this.call('/profile')
  }
}
