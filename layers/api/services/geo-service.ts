import { ApiBaseService } from '#layers/api/services/api-base-service'

export default class GeoService extends ApiBaseService {
  async getCountries(search: string, additionalParams: Record<string, unknown> = {}) {
    return await this.call('countries', {
      query: {
        search,
        ...additionalParams
      }
    })
  }

  async getStates(search: string, additionalParams: Record<string, unknown> = {}) {
    return await this.call('states', {
      query: {
        name: search,
        ...additionalParams
      }
    })
  }

  async getAddressData(postalCode: string, countryId: number) {
    return await this.call('address/data', {
      query: {
        postal_code: postalCode,
        country_id: countryId
      }
    })
  }
}
