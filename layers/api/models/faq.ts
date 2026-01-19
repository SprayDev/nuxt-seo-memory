export interface FaqType {
  id: number
  question: {
    [key: string]: string
  }
  answer: {
    [key: string]: string
  }
}
