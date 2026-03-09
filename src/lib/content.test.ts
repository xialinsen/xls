import { describe, expect, it } from 'vitest'
import {
  getArchiveGroups,
  getCategoryName,
  getFeaturedPosts,
  getPostBySlug,
  getRelatedPosts,
  getSortedPosts,
} from '@/lib/content'

describe('content utilities', () => {
  it('按发布时间倒序返回文章', () => {
    const sorted = getSortedPosts()
    expect(sorted[0].publishedAt >= sorted[1].publishedAt).toBe(true)
  })

  it('返回精选文章列表', () => {
    const featured = getFeaturedPosts()
    expect(featured.length).toBeGreaterThan(0)
    expect(featured.every((post) => post.featured)).toBe(true)
  })

  it('根据 slug 查找文章', () => {
    const post = getPostBySlug('react-content-architecture')
    expect(post?.title).toContain('React')
  })

  it('根据分类返回相关文章', () => {
    const source = getPostBySlug('rituals-of-readable-writing')
    if (!source) {
      throw new Error('测试数据不存在')
    }
    const related = getRelatedPosts(source)
    expect(related.every((post) => post.categoryId === source.categoryId)).toBe(true)
  })

  it('构建按月归档数据', () => {
    const groups = getArchiveGroups()
    expect(groups.length).toBeGreaterThan(0)
    expect(groups[0].month.includes('年')).toBe(true)
  })

  it('返回分类名称', () => {
    expect(getCategoryName('c1')).toBe('设计观察')
    expect(getCategoryName('unknown')).toBe('未分类')
  })
})
