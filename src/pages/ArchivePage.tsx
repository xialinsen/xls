import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import BlogLayout from '@/components/BlogLayout'
import { categories } from '@/data/categories'
import { getArchiveGroups, getCategoryName, getSortedPosts } from '@/lib/content'

export default function ArchivePage() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const archiveGroups = getArchiveGroups()

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') {
      return getSortedPosts()
    }
    return getSortedPosts().filter((post) => post.categoryId === activeCategory)
  }, [activeCategory])

  return (
    <BlogLayout>
      <section className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border border-ink/10 bg-paper p-6">
          <h1 className="font-display text-3xl">归档与分类</h1>
          <p className="mt-3 text-sm text-ink/65">按主题筛选文章，并按时间线快速回溯内容。</p>
          <div className="mt-6 space-y-2">
            <button
              className={buttonClassName(activeCategory === 'all')}
              onClick={() => setActiveCategory('all')}
              type="button"
            >
              全部文章
            </button>
            {categories.map((category) => (
              <button
                className={buttonClassName(activeCategory === category.id)}
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                type="button"
              >
                {category.name}
              </button>
            ))}
          </div>
        </aside>

        <div className="space-y-8">
          <div className="rounded-2xl border border-ink/10 bg-paper p-6">
            <p className="text-xs tracking-[0.16em] text-ink/50">分类结果</p>
            <ul className="mt-4 space-y-3">
              {filteredPosts.map((post) => (
                <li className="border-b border-ink/10 pb-3" key={post.id}>
                  <Link className="font-medium text-ink hover:text-ocean" to={`/post/${post.slug}`}>
                    {post.title}
                  </Link>
                  <div className="mt-1 flex items-center gap-3 text-xs text-ink/50">
                    <span>{post.publishedAt}</span>
                    <span>{getCategoryName(post.categoryId)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-ink/10 bg-paper p-6">
            <p className="text-xs tracking-[0.16em] text-ink/50">时间归档</p>
            <div className="mt-4 space-y-6">
              {archiveGroups.map((group) => (
                <section key={group.month}>
                  <h3 className="font-display text-xl">{group.month}</h3>
                  <ul className="mt-2 space-y-2 text-sm">
                    {group.items.map((item) => (
                      <li key={item.id}>
                        <Link className="text-ink/75 hover:text-ocean" to={`/post/${item.slug}`}>
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </BlogLayout>
  )
}

function buttonClassName(active: boolean) {
  return active
    ? 'w-full rounded-xl border border-bronze bg-bronze px-4 py-2 text-left text-sm text-paper'
    : 'w-full rounded-xl border border-ink/10 bg-ivory px-4 py-2 text-left text-sm text-ink/70 transition hover:border-ink/30 hover:text-ink'
}
