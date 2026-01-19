enum NotificationSubscriptionGroup {
  BID_NOTIFICATION_GROUP = 1,
  ITEM_NOTIFICATION_GROUP = 2,
  SHIPMENT_NOTIFICATION_GROUP = 3,
  NEWSLETTER_NOTIFICATION_GROUP = 4,
  MARKETING_NOTIFICATION_GROUP = 5,
  FAVORITE_NOTIFICATION_GROUP = 6,
  UTILIZE_NOTIFICATION_GROUP = 7
}

const getSubscriptionGroups = () => {
  const notificationGroupKeys = Object.keys(NotificationSubscriptionGroup).filter((key) => isNaN(Number(key)))
  const notificationGroupValues = Object.values(NotificationSubscriptionGroup).filter((key) => !isNaN(Number(key)))
  return notificationGroupKeys.map((key: string, index: number) => {
    return {
      key,
      value: notificationGroupValues[index],
      label: `pages/notification/subscription.${key.toLowerCase()}`
    }
  })
}

export { NotificationSubscriptionGroup, getSubscriptionGroups }
