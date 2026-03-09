import { Clock3 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import BlogLayout from '@/components/BlogLayout'
import PostCard from '@/components/PostCard'
import { getCategoryName, getPostBySlug, getRelatedPosts } from '@/lib/content'

export default function PostPage() {
  const { slug } = useParams()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return (
      <BlogLayout>
        <div className="rounded-2xl border border-ink/10 bg-paper p-10 text-center">
          <p className="text-sm text-ink/70">文章不存在，可能已被移除。</p>
          <Link className="mt-4 inline-block text-sm text-ocean underline" to="/">
            返回首页
          </Link>
        </div>
      </BlogLayout>
    )
  }

  const relatedPosts = getRelatedPosts(post)

  return (
    <BlogLayout>
      <article className="grid gap-10 lg:grid-cols-[1fr_260px]">
        <div className="rounded-3xl border border-ink/10 bg-paper p-8 md:p-12">
          <p className="text-xs tracking-[0.16em] text-bronze">{getCategoryName(post.categoryId)}</p>
          <h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl">{post.title}</h1>
          <div className="mt-5 flex items-center gap-4 text-xs text-ink/60">
            <span>{post.publishedAt}</span>
            <span className="flex items-center gap-1">
              <Clock3 className="h-3.5 w-3.5" />
              {post.readingTime} 分钟
            </span>
          </div>
          <img alt={post.title} className="mt-8 h-72 w-full rounded-2xl object-cover" src={post.coverImage} />
          <div className="mt-8 space-y-5 text-base leading-8 text-ink/85">
            {post.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <aside className="space-y-6">
          <div className="rounded-2xl border border-ink/10 bg-paper p-6">
            <p className="mb-3 text-xs tracking-[0.16em] text-ink/50">目录</p>
            <ul className="space-y-2 text-sm text-ink/70">
              <li>开篇背景</li>
              <li>方法拆解</li>
              <li>实践建议</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-paper p-6">
            <p className="mb-4 text-xs tracking-[0.16em] text-ink/50">相关推荐</p>
            <div className="space-y-4">
              {relatedPosts.map((relatedPost) => (
                <Link className="block text-sm text-ocean hover:underline" key={relatedPost.id} to={`/post/${relatedPost.slug}`}>
                  {relatedPost.title}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </article>

      <section className="mt-14">
        <h2 className="mb-6 font-display text-3xl">继续阅读</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {relatedPosts.map((relatedPost) => (
            <PostCard key={relatedPost.id} post={relatedPost} />
          ))}
        </div>
      </section>
    </BlogLayout>
  )
}
