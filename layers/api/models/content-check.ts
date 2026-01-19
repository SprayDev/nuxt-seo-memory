import type { File } from '#layers/api/models/file'

export enum ContentCheckStatus {
  CONTENT_CHECK_STATUS_REQUESTED = 1,
  CONTENT_CHECK_STATUS_MATCHED = 2,
  CONTENT_CHECK_STATUS_NOT_MATCHED = 3
}

export enum ContentCheckType {
  CONTENT_CHECK_TYPE_COMMON = 1,
  CONTENT_CHECK_TYPE_SECRET = 2
}

export enum ContentsCheckClientResponse {
  CONTENT_CHECK_CLIENT_RESPONSE_AGREE = 1,
  CONTENT_CHECK_CLIENT_RESPONSE_DISAGREE = 2
}

export const CONTENT_CHECK_PRICE = 500
export const CONTENT_CHECK_FREE_LIMIT = 50_000

export type StoreMultipleContentCheckData = {
  id: number
  comment?: string
}[]

export const getContentCheckStatusLabel = (contentCheckStatus: ContentCheckStatus | undefined): string => {
  const { t } = useI18n()
  if (!contentCheckStatus) {
    return ''
  }
  switch (contentCheckStatus) {
    case ContentCheckStatus.CONTENT_CHECK_STATUS_REQUESTED:
      return t('pages/items_status.check_required')
    case ContentCheckStatus.CONTENT_CHECK_STATUS_MATCHED:
      return t('pages/items_status.contents_match')
    case ContentCheckStatus.CONTENT_CHECK_STATUS_NOT_MATCHED:
      return t('pages/items_status.has_problem')
  }
}

export default interface ContentCheck {
  id: number
  comment?: string
  status: ContentCheckStatus
  images: File[]
  type: ContentCheckType
  client_response: ContentsCheckClientResponse | null
  item_id: number
}
