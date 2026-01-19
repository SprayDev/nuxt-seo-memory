import type { User } from '#layers/api/models/user'
import type { File } from '#layers/api/models/file'

export enum MessageTypeEnum {
  COMMON_MESSAGE_TYPE = 1,
  REFUND_MESSAGE_TYPE = 2,
  UNBLOCK_MESSAGE_TYPE = 3,
  YAHOO_QUESTIONS_TYPE = 4,
  MERCARI_QUESTIONS_TYPE = 5,
  SHIPMENT_ISSUES_TYPE = 6,
  OTHER_SHOP_QUESTIONS_TYPE = 7,
  LOGISTIC_QUESTIONS_TYPE = 8,
  RAKUMA_QUESTIONS_TYPE = 10
}

export type MessageTypeWithAll = MessageTypeEnum | 'all'

export interface Message {
  id: number
  host_id: number
  sender_id: number
  host: Partial<User>
  created_at: string
  body: string
  files: File[]
}

const getMessageTypeLabel = (messageType: MessageTypeEnum | null) => {
  if (!messageType) {
    return ''
  }
  const { t } = useI18n()

  const possibleTranslations = {
    [MessageTypeEnum.COMMON_MESSAGE_TYPE]: 'pages/messages/index.common',
    [MessageTypeEnum.REFUND_MESSAGE_TYPE]: 'pages/messages/index.refund',
    [MessageTypeEnum.UNBLOCK_MESSAGE_TYPE]: 'pages/messages/index.unblock',
    [MessageTypeEnum.YAHOO_QUESTIONS_TYPE]: 'pages/messages/index.yahoo_questions',
    [MessageTypeEnum.MERCARI_QUESTIONS_TYPE]: 'pages/messages/index.mercari_questions',
    [MessageTypeEnum.SHIPMENT_ISSUES_TYPE]: 'pages/messages/index.shipment_issue_questions',
    [MessageTypeEnum.OTHER_SHOP_QUESTIONS_TYPE]: 'pages/messages/index.other_shops_questions',
    [MessageTypeEnum.LOGISTIC_QUESTIONS_TYPE]: 'pages/messages/index.',
    [MessageTypeEnum.RAKUMA_QUESTIONS_TYPE]: 'pages/messages/index.rakuma_questions'
  }

  return t(possibleTranslations[messageType])
}

const messageTypesOrder = [
  MessageTypeEnum.COMMON_MESSAGE_TYPE,
  MessageTypeEnum.REFUND_MESSAGE_TYPE,
  // MessageTypeEnum.UNBLOCK_MESSAGE_TYPE,
  MessageTypeEnum.YAHOO_QUESTIONS_TYPE,
  MessageTypeEnum.MERCARI_QUESTIONS_TYPE,
  MessageTypeEnum.SHIPMENT_ISSUES_TYPE,
  MessageTypeEnum.OTHER_SHOP_QUESTIONS_TYPE,
  MessageTypeEnum.RAKUMA_QUESTIONS_TYPE
]

export { getMessageTypeLabel, messageTypesOrder }
