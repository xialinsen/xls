export type Category = {
  id: string
  name: string
  slug: string
}

export type Post = {
  id: string
  slug: string
  title: string
  summary: string
  content: string[]
  coverImage: string
  categoryId: string
  publishedAt: string
  readingTime: number
  featured: boolean
}
