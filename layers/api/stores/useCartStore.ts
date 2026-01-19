import { SendicoShop } from '#layers/api/models/shop'
import type { Cart } from '#layers/api/models/cart'
import { DIVISION_ITEMS_QUANTITY } from '#layers/api/models/item'

type GroupedCartItems = Record<string, Cart[]>

export const useCartState = () => {
  const cart = useState<Cart[]>('user-shopping-cart', () => [])
  const api = useApi()

  const initCartState = async () => {
    const { data, error } = await processFetch(() => api.shopCart.getCartData())
    if (error) {
      return
    }
    cart.value = data || []
  }

  return {
    cart,
    initCartState
  }
}

export const useCartStore = () => {
  const api = useApi()
  const { cart, initCartState } = useCartState()

  const { t } = useI18n()
  const toast = useSendicoToast()

  const skipEstimation = ref(false)
  const isLoading = ref(false)
  const actionsLoading = ref(false)

  const itemQuantity = computed<number>(() => {
    if (!cart.value) {
      return 0
    }
    return Object.keys(cart.value).length
  })

  const totalSellers = computed(() => {
    if (!cart.value) {
      return 0
    }

    const sellerGroups = itemsGroupedBySeller.value

    // count of unique seller items
    let feeMultiplier = 0
    for (const sellerGroupsKey in sellerGroups) {
      if (sellerGroupsKey === null) {
        continue
      }

      feeMultiplier += 1
    }

    return feeMultiplier
  })

  const totalServiceFee = computed(() => {
    if (!cart.value) {
      return 0
    }

    return 500 * totalSellers.value
  })

  const totalQty = computed<number>(() => {
    if (!cart.value) {
      return 0
    }

    return cart.value?.reduce((prevState, currentValue) => prevState + currentValue.quantity, 0)
  })

  const totalPrice = computed<number>(() => {
    if (!cart.value) {
      return 0
    }

    return cart.value?.reduce((prevState, currentValue) => prevState + currentValue.price * currentValue.quantity, 0)
  })

  const itemsGroupedBySeller = computed(() => {
    return cart.value?.reduce((group: GroupedCartItems, item) => {
      let { seller } = item
      if (item.shop === SendicoShop.AMAZON_SHOP) {
        seller = 'Amazon'
      }

      const sellerItems = group[seller] || []

      group[seller] = [...sellerItems, item]

      return group
    }, {})
  })

  const hasOverflowItems = computed(() => {
    let overflowItems = false
    for (const seller in itemsGroupedBySeller.value) {
      if (!itemsGroupedBySeller.value[seller]) {
        continue
      }
      if (itemsGroupedBySeller.value[seller]?.length > DIVISION_ITEMS_QUANTITY) {
        overflowItems = true
      }
    }

    return overflowItems
  })

  const addItem = async (
    shop: SendicoShop,
    code: string,
    quantity: number,
    comment: string = '',
    options: unknown = {}
  ) => {
    const { data, error } = await processFetch(() => api.shopCart.addItem(shop, code, quantity, comment, options))
    if (!error) {
      await initCart()
    }

    return { data, error }
  }

  const initCart = async () => {
    isLoading.value = true
    await initCartState()
    isLoading.value = false
  }

  const removeItem = async (id: number) => {
    actionsLoading.value = true
    const { data, error } = await processFetch(() => api.shopCart.removeItem(id))
    actionsLoading.value = false

    if (error) {
      toast.error(t('pages/cart.remove_error'))
      return { data, error }
    }

    toast.success(t('pages/cart.item_removed'))

    initCart()

    return { data, error }
  }

  const changeQty = async (id: number, increase: boolean) => {
    // check for quantity limits
    const cartItemData = cart.value.find((item) => item.id === id)
    const maxQuantity = cartItemData?.max_quantity
    const minQuantity = cartItemData?.min_quantity
    const currentQuantity = cartItemData?.quantity ?? 0
    if (increase && maxQuantity && maxQuantity <= currentQuantity) {
      return {
        error: true // means that dont show toast
      }
    }
    if (!increase && minQuantity && minQuantity >= currentQuantity) {
      return {
        error: true // means that dont show toast
      }
    }

    // todo rework
    // toast.info(t('pages/cart.quantity_change'))

    actionsLoading.value = true
    const { data, error } = await processFetch(() => api.shopCart.updateCartQty(id, increase))
    actionsLoading.value = false
    if (error) {
      toast.error(t('pages/cart.qty_error'))
      return { data, error }
    }

    toast.success(t('pages/cart.qty_changed'))
    initCart()

    return { data, error }
  }

  const confirm = async () => {
    actionsLoading.value = true
    const { error, data } = await processFetch(() => api.shopCart.confirmCart(!!skipEstimation.value))
    actionsLoading.value = false
    if (error) {
      toast.error(t(error.message))
      return { error, data }
    }

    cart.value = []
    return { error, data }
  }

  const removeAll = async () => {
    actionsLoading.value = true
    const { data, error } = await processFetch(() => api.shopCart.clearCart())
    actionsLoading.value = false
    if (error) {
      toast.error(t('pages/cart.remove_error'))
      return { data, error }
    }

    toast.success(t('pages/cart.item_removed'))

    cart.value = []

    return { data, error }
  }

  return {
    cart,
    skipEstimation,
    itemQuantity,
    isLoading,
    totalPrice,
    totalServiceFee,
    totalSellers,
    totalQty,
    itemsGroupedBySeller,
    hasOverflowItems,
    actionsLoading,
    addItem,
    initCart,
    removeItem,
    changeQty,
    confirm,
    removeAll
  }
}
