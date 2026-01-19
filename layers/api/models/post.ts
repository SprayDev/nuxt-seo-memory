export interface Post {
  id: number
  front_image: string | null
  small_front_image: string | null
  source_image: string | null
  title: Record<string, string>
  slug: string
  description: Record<string, string>
  body: Record<string, string>
  topics: string[]
  published_at: string | null
  published_at_datetime: string | null
  created_at: string
  categories: BlogPostCategory[]
}

export interface BlogPostCategory {
  id: number
  title: Record<string, string>
  slug: string
  description: Record<string, string>
}
