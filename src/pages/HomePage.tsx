import { Link } from 'react-router-dom'
import BlogLayout from '@/components/BlogLayout'
import PostCard from '@/components/PostCard'
import { categories } from '@/data/categories'
import { getFeaturedPosts, getSortedPosts } from '@/lib/content'

export default function HomePage() {
  const featuredPosts = getFeaturedPosts()
  const latestPosts = getSortedPosts().slice(0, 3)

  return (
    <BlogLayout>
      <section className="grid gap-8 rounded-3xl border border-ink/10 bg-gradient-to-br from-paper to-ivory p-10 shadow-soft md:grid-cols-[1.3fr_1fr]">
        <div className="space-y-6">
          <p className="text-xs tracking-[0.2em] text-bronze">EDITORIAL BLOG</p>
          <h1 className="font-display text-5xl leading-tight text-ink md:text-6xl">
            用设计感阅读体验，承载长期主义写作
          </h1>
          <p className="max-w-xl text-sm text-ink/70">
            这是一个关于创作、设计与前端实践的内容空间。每篇文章都围绕真实工作流展开，帮助你把零散灵感变成可复用的方法论。
          </p>
          <Link
            className="inline-flex rounded-full bg-ink px-6 py-3 text-sm text-ivory transition hover:bg-ocean"
            to="/archive"
          >
            浏览全部文章
          </Link>
        </div>
        <div className="rounded-2xl border border-ink/10 bg-paper p-6">
          <p className="mb-4 text-xs tracking-[0.15em] text-ink/50">内容分类</p>
          <ul className="space-y-3 text-sm">
            {categories.map((category) => (
              <li className="flex items-center justify-between border-b border-ink/5 pb-2" key={category.id}>
                <span>{category.name}</span>
                <span className="text-ink/50">{category.slug}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-14">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-3xl text-ink">推荐阅读</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featuredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-3xl text-ink">最新发布</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {latestPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </BlogLayout>
  )
}
