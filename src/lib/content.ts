import { categories } from '@/data/categories'
import { posts } from '@/data/posts'
import type { Post } from '@/types/content'

export function getCategoryName(categoryId: string) {
  return categories.find((category) => category.id === categoryId)?.name ?? '未分类'
}

export function getSortedPosts() {
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
}

export function getFeaturedPosts() {
  return getSortedPosts().filter((post) => post.featured)
}

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug)
}

export function getRelatedPosts(post: Post, count = 2) {
  return getSortedPosts()
    .filter((item) => item.id !== post.id && item.categoryId === post.categoryId)
    .slice(0, count)
}

export function getArchiveGroups() {
  const grouped = getSortedPosts().reduce<Record<string, Post[]>>((acc, post) => {
    const date = new Date(post.publishedAt)
    const key = `${date.getFullYear()}年${String(date.getMonth() + 1).padStart(2, '0')}月`
    acc[key] = acc[key] ? [...acc[key], post] : [post]
    return acc
  }, {})

  return Object.entries(grouped).map(([month, items]) => ({
    month,
    items,
  }))
}
