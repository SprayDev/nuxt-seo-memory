export enum SplitOrderStatusEnum {
  PROCESSING = 1,
  ACCEPTED = 10,
  CANCELED = 20
}

export enum SplitOrderCancelReasonEnum {
  UNRECOGNIZABLE = 1,
  TIME_CONSUMING = 2,
  RETURNABLE = 3,
  OTHER = 999
}

export const getSplitOrderReasonLabel = (reason: SplitOrderCancelReasonEnum): string => {
  const { t } = useI18n()
  const definitions = {
    [SplitOrderCancelReasonEnum.UNRECOGNIZABLE]: t('pages/warehouse/accepting.split_unrecognizable'),
    [SplitOrderCancelReasonEnum.TIME_CONSUMING]: t('pages/warehouse/accepting.split_time_consuming'),
    [SplitOrderCancelReasonEnum.RETURNABLE]: t('pages/warehouse/accepting.split_returnable'),
    [SplitOrderCancelReasonEnum.OTHER]: t('pages/warehouse/accepting.split_other')
  }

  return definitions[reason]
}

export interface SplitItemRequest {
  id: number
  status: SplitOrderStatusEnum
  cancel_reason: SplitOrderCancelReasonEnum
}

export interface SplitItemRequestLineType {
  id: number
  price: number | ''
  name: string
  is_main: boolean
}

export type SplitItemRequestLineFormType = {
  price: number | ''
  name: string
  image_id?: number
  is_main: boolean
}
