import { ArrowRight, Clock3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getCategoryName } from '@/lib/content'
import type { Post } from '@/types/content'

type PostCardProps = {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-ink/10 bg-paper shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
      <img alt={post.title} className="h-48 w-full object-cover" src={post.coverImage} />
      <div className="space-y-3 p-6">
        <p className="text-xs tracking-[0.16em] text-bronze">{getCategoryName(post.categoryId)}</p>
        <h3 className="font-display text-2xl leading-tight text-ink">{post.title}</h3>
        <p className="text-sm text-ink/70">{post.summary}</p>
        <div className="flex items-center justify-between text-xs text-ink/60">
          <span>{post.publishedAt}</span>
          <span className="flex items-center gap-1">
            <Clock3 className="h-3.5 w-3.5" />
            {post.readingTime} 分钟
          </span>
        </div>
        <Link
          className="inline-flex items-center gap-2 text-sm font-medium text-ocean transition group-hover:gap-3"
          to={`/post/${post.slug}`}
        >
          阅读全文
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}
