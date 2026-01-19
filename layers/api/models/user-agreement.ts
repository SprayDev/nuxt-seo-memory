export enum UserAgreementType {
  MERCARI_POKEMON_CARD_AGREEMENT = 1,
  TRADING_CARD_AGREEMENT = 2
}

export type AgreementData = {
  show: boolean
  text?: string
  title?: string
  yes?: string
  no?: string
  type?: UserAgreementType
}
