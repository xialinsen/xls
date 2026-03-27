import { useParams, Navigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, User, ThumbsUp, Tag } from 'lucide-react';
import { useBlogStore } from '../store/useBlogStore';
import Navbar from '../components/Navbar';
import CommentSection from '../components/CommentSection';

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const article = useBlogStore(state => state.getArticleById(id || ''));

  if (!article) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-[#00F0FF] transition-colors font-mono">
            <ArrowLeft size={16} />
            [ RETURN_TO_BASE ]
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-10 pb-8 border-b border-slate-800">
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 text-xs font-mono px-2 py-1 rounded bg-[#8A2BE2]/10 text-[#8A2BE2] border border-[#8A2BE2]/30">
                <Tag size={12} /> {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-slate-100 neon-text leading-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 font-mono">
            <span className="flex items-center gap-2">
              <User size={16} className="text-[#00F0FF]" />
              {article.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={16} className="text-[#8A2BE2]" />
              {article.date}
            </span>
            <span className="flex items-center gap-2 text-[#00F0FF]">
              <ThumbsUp size={16} />
              {article.likes} LIKES
            </span>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-invert max-w-none prose-headings:text-slate-100 prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h2:border-b prose-h2:border-slate-800 prose-h2:pb-2 prose-a:text-[#00F0FF] hover:prose-a:text-[#8A2BE2] prose-strong:text-[#00F0FF] prose-code:text-[#8A2BE2] prose-code:bg-slate-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </article>

        {/* Comments Section */}
        <CommentSection articleId={article.id} />
        
      </main>
    </div>
  );
}
