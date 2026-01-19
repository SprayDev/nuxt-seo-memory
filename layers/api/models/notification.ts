export interface NotificationData {
  shop?: string
}
interface LinkData {
  link_type: string
  link_value: string
}

export interface Update {
  id: number
  title: Record<string, unknown>
  slug: string
  created_at: string
  published_at: string
}

export interface Notification {
  id: string
  title: string
  type: string
  notify_at: string
  data: NotificationData
  link_data: LinkData
}

const getRouteForNotification = (
  linkData: Partial<LinkData>,
  notificationData: NotificationData
):
  | {
      name: string
      params?: Record<string, unknown>
    }
  | string
  | null => {
  const { link_type, link_value } = linkData
  if (link_type === 'item') {
    return {
      name: 'dashboard-orders-id',
      params: {
        id: link_value
      }
    }
  }

  if (link_type === 'lot') {
    return {
      name: 'shop-shop-catalog-item',
      params: {
        item: link_value,
        shop: notificationData?.shop
      }
    }
  }

  if (link_type === 'bids') {
    return {
      name: 'dashboard-bids'
    }
  }

  if (link_type === 'parcel') {
    return {
      name: 'dashboard-parcels-id',
      params: {
        id: link_value
      }
    }
  }

  if (link_type === 'messages') {
    return 'messages'
  }

  if (link_type === 'news') {
    return {
      name: 'blog-news-slug',
      params: {
        slug: link_value
      }
    }
  }

  return null
}

export { getRouteForNotification }
