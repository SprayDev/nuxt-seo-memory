import type { User } from '#layers/api/models/user'
import { getLanguageByValue } from '#layers/api/models/languages'

export const useUser = () => {
  const config = useRuntimeConfig()
  const user = useState<User | null>(config.public.api.userKey, () => null)
  const api = useApi()

  const balance = computed<number>({
    get: () => {
      if (!user.value?.balance) {
        return 0
      }

      return user.value.balance
    },
    set: (value) => {
      if (!user.value) {
        return
      }

      user.value.balance = Number(value)
    }
  })

  const language = computed<string>({
    get: () => {
      if (!user.value?.language) {
        return 'English'
      }

      return user.value?.language
    },
    set: (value: string) => {
      if (!user.value) {
        return
      }

      user.value.language = getLanguageByValue(value)
      api.profile.changeLocale(value).then(() => true)
    }
  })

  const loan = computed<number>(() => {
    if (!user.value?.loan) {
      return 0
    }

    return user.value.loan
  })

  const hold = computed<number>(() => {
    if (!user.value?.hold) {
      return 0
    }

    return user.value.hold
  })

  const required = computed<number>(() => {
    if (!user.value?.required) {
      return 0
    }

    return user.value?.required
  })

  const availableBalance = computed<number>(() => {
    if (!user.value) {
      return 0
    }

    return Number(user.value?.loan) + user.value?.balance
  })

  const linksLimit = computed<number>(() => {
    if (!user.value?.links_limit) {
      return 10
    }

    return user.value?.links_limit
  })

  return { user, balance, loan, required, hold, language, availableBalance, linksLimit }
}
