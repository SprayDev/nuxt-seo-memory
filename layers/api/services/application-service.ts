import type { $Fetch } from 'ofetch'
import type { LocationQueryRaw } from 'vue-router'
import { ApiBaseService } from '#layers/api/services/api-base-service'
import { buildRequestObject } from '#layers/api/shared/utils/request-data'
import type { Country } from '#layers/api/models/country'

export default class ApplicationService extends ApiBaseService {
  async contactUs(fullName: string, email: string, message: string, captcha: string) {
    return await this.call('/contact-us', {
      method: 'post',
      body: {
        full_name: fullName,
        email,
        message,
        'g-recaptcha-response': captcha
      }
    })
  }

  async pageTitles() {
    return await this.call('page-titles')
  }

  async rates(currency: string) {
    return await this.call<number>(`rate/${currency}`)
  }

  async translate(string: string, to = 'ja', from = 'auto') {
    return await this.call('translate', {
      method: 'post',
      body: {
        string,
        to,
        from
      }
    })
  }

  async searchCountry(search: string, additionalParams?: Record<string, unknown>) {
    return await this.call<Country[]>('countries', {
      query: {
        search,
        ...additionalParams
      }
    })
  }

  async getFaq(): Promise<$Fetch> {
    return await this.call('faq')
  }

  async getFile(path: string) {
    return await this.call(path, {
      responseType: 'blob',
      credentials: 'omit'
    })
  }

  async searchHsCodes(query?: LocationQueryRaw) {
    return await this.call('hs_codes/search', {
      query: buildRequestObject(query as Record<string, unknown>)
    })
  }

  async saveFrontStatistics(type: string, metaData: Record<string, unknown>) {
    return await this.call('event/statistic', {
      body: {
        type,
        meta: metaData
      }
    })
  }

  /**
    Chinese site should change location value
    We can use .env for it
   */
  async banners() {
    return await this.call('banners', {
      query: {
        banners_location: 'main'
      }
    })
  }
}
