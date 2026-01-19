import { ApiBaseService } from '#layers/api/services/api-base-service'
import type { News } from '#layers/api/models/news'
import type { BlogPostCategory, Post } from '#layers/api/models/post'
import type { PaginatedResponse } from '#layers/api/models/sendico-base'

export default class BlogService extends ApiBaseService {
  async getBlogPosts() {
    return await this.call<Post[]>('blog/posts/last')
  }

  async getBlogNews() {
    return await this.call<News[]>('blog/news/last')
  }

  async getArticles(query: { page: number; category_slug?: string }) {
    return await this.call<PaginatedResponse<Post>>('blog/posts', {
      query: query
    })
  }

  async getBlogPost(slug: string) {
    return await this.call<Post>(`blog/posts/${slug}`)
  }

  async getSimilarArticles(slug: string) {
    return await this.call<Post[]>(`blog/posts/${slug}/similar`)
  }

  async getNews(page: number) {
    return await this.call<PaginatedResponse<News>>('blog/news', {
      query: {
        page
      }
    })
  }

  async getNewsArticle(slug: string) {
    return await this.call(`blog/news/${slug}`)
  }

  async getCategories() {
    return await this.call<BlogPostCategory[]>('blog/posts/categories')
  }
}
