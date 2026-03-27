import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ArrowLeft, Calendar, Heart, Hash } from 'lucide-react';
import { useBlogStore } from '../store';
import { CommentSection } from '../components/CommentSection';

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { articles } = useBlogStore();

  const article = useMemo(() => articles.find(a => a.id === id), [articles, id]);

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <h2 className="text-4xl font-display font-bold neon-text mb-4">404</h2>
        <p className="text-text-muted font-mono mb-8">&gt; Article not found in database.</p>
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-primary hover:text-secondary transition-colors font-mono"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-16">
      {/* Navigation */}
      <div className="mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors font-mono text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          &lt; BACK_TO_HOME
        </Link>
      </div>

      {/* Article Header */}
      <header className="mb-12">
        <div className="flex flex-wrap gap-2 mb-6">
          {article.tags.map(tag => (
            <span key={tag} className="flex items-center text-sm font-mono text-secondary bg-secondary/10 border border-secondary/20 px-3 py-1 rounded-full">
              <Hash className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
          {article.title}
        </h1>
        
        <div className="flex items-center gap-6 text-sm font-mono text-text-muted border-b border-white/10 pb-8">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {article.date}
          </div>
          <div className="flex items-center text-primary">
            <Heart className="w-4 h-4 mr-2 fill-primary/20" />
            {article.likes} LIKES
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {article.coverImage && (
        <div className="mb-12 rounded-2xl overflow-hidden glass-panel border border-white/10 relative">
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
          <img 
            src={article.coverImage} 
            alt={article.title} 
            className="w-full h-auto max-h-[400px] object-cover"
          />
        </div>
      )}

      {/* Article Content */}
      <article className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-primary hover:prose-a:text-secondary prose-a:transition-colors prose-img:rounded-xl">
        <ReactMarkdown
          components={{
            code({node, inline, className, children, ...props}: any) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <div className="rounded-xl overflow-hidden border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] my-6">
                  <div className="bg-[#1e1e1e] px-4 py-2 flex items-center border-b border-white/10">
                    <span className="text-xs font-mono text-text-muted">{match[1]}</span>
                  </div>
                  <SyntaxHighlighter
                    style={vscDarkPlus as any}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{ margin: 0, background: '#1e1e1e' }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code className="bg-primary/10 text-primary font-mono px-1.5 py-0.5 rounded text-sm" {...props}>
                  {children}
                </code>
              )
            },
            blockquote: ({node, ...props}) => (
              <blockquote className="border-l-4 border-primary bg-primary/5 py-1 px-4 my-6 rounded-r-lg not-italic" {...props} />
            )
          }}
        >
          {article.content}
        </ReactMarkdown>
      </article>

      {/* Comments Section */}
      <CommentSection articleId={article.id} />
    </div>
  );
};

export default PostPage;
