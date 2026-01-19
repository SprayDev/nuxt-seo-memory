export interface Banner {
  id: number
  redirect_path: string
  desktop_banner: string
  mobile_banner: string
  alt_text: {
    [key: string]: string
  }
}
