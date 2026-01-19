export type CurrencyPosition = 'left' | 'right'

export type Currency = {
  name: string
  value: string
  icon?: string
  symbol?: string
  position: CurrencyPosition
}

const DEFAULT_CURRENCY = 'USD'

export const useCurrency = () => {
  const api = useApi()
  const rate = useState<number>('currency-rate', () => 0)
  const loading = ref<boolean>(false)

  const currencyCookie = useCookie('currency', {
    maxAge: 60 * 60 * 24 * 7
  })

  const currencies: Currency[] = [
    {
      name: 'JPY',
      value: 'JPY',
      icon: 'mdi-currency-jpy',
      position: 'left'
    },
    {
      name: 'USD',
      value: 'USD',
      icon: 'mdi-currency-usd',
      position: 'left'
    },
    {
      name: 'EUR',
      value: 'EUR',
      icon: 'mdi-currency-eur',
      position: 'right'
    },
    {
      name: 'CAD',
      value: 'CAD',
      icon: 'mdi-currency-usd',
      position: 'left'
    },
    {
      name: 'GBP',
      value: 'GBP',
      icon: 'mdi-currency-gbp',
      position: 'left'
    },
    {
      name: 'AUD',
      value: 'AUD',
      icon: 'mdi-currency-usd',
      position: 'left'
    },
    {
      name: 'MYR',
      value: 'MYR',
      icon: '',
      symbol: 'RM',
      position: 'right'
    },
    {
      name: 'SGD',
      value: 'SGD',
      icon: 'mdi-currency-usd',
      position: 'left'
    },
    {
      name: 'KRW',
      value: 'KRW',
      icon: 'mdi-currency-krw',
      position: 'left'
    },
    {
      name: 'PLN',
      value: 'PLN',
      icon: 'tabler-currency-zloty',
      position: 'right'
    },
    {
      name: 'INR',
      value: 'INR',
      icon: 'mdi-currency-inr',
      position: 'left'
    },
    {
      name: 'CZK',
      value: 'CZK',
      icon: 'tabler-currency-krone-czech',
      position: 'right'
    },
    {
      name: 'CHF',
      value: 'CHF',
      icon: 'mdi-currency-fra',
      position: 'left'
    },
    {
      name: 'NZD',
      value: 'NZD',
      icon: 'mdi-currency-usd',
      position: 'left'
    },
    {
      name: 'ZAR',
      value: 'ZAR',
      symbol: 'R',
      position: 'left'
    },
    {
      name: 'IDR',
      value: 'IDR',
      icon: 'fa6-solid-rupiah-sign',
      position: 'left'
    }
  ]

  const currency = computed({
    get: () => {

      if (currencyCookie.value) {
        return currencyCookie.value
      }

      return DEFAULT_CURRENCY
    },
    set: async (value: string) => {
      currencyCookie.value = value

    }
  })

  const getRateData = async () => {
    const { data } = await processFetch(() => api.application.rates(currency.value || 'USD'))
    if (!data) {
      return
    }
    rate.value = data
  }

  const changeCurrency = async (newCurrency: string) => {
    currency.value = newCurrency
    loading.value = true
    try {
      await Promise.all([getRateData(), setCurrencyToUser(newCurrency)])
    } catch (error) {
      console.warn('Currency update failed', error)
    }
    loading.value = false
  }

  const setCurrencyToUser = async (currency: string) => {
    // update authed profile

    await processFetch(() => api.profile.updateCurrency(currency))

    return Promise.resolve(1)
  }

  const getCurrencyPosition = (currency: string): CurrencyPosition => {
    const currencyData = currencies.find((c) => c.value === currency)
    return currencyData?.position ?? 'right'
  }

  return {
    currencies,
    currency,
    rate,
    loading,
    getRateData,
    changeCurrency,
    getCurrencyPosition
  }
}
