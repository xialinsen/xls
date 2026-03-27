import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, ThumbsUp, Tag } from 'lucide-react';
import { useStore } from '../store/useStore';
import { CommentSection } from '../components/CommentSection';

export const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { articles } = useStore();

  const article = useMemo(() => {
    return articles.find(a => a.id === id);
  }, [articles, id]);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-mono text-neon-blue mb-4">404 // NOT_FOUND</h2>
        <p className="text-gray-400 mb-8">The requested transmission could not be located.</p>
        <Link to="/" className="inline-flex items-center gap-2 text-gray-300 hover:text-neon-blue transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN_TO_BASE</span>
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto px-4 py-8 max-w-4xl"
    >
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-blue transition-colors mb-8 font-mono text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK</span>
      </Link>

      <article className="glass-panel rounded-2xl overflow-hidden border border-white/10">
        <div className="h-64 md:h-96 relative">
          <div className="absolute inset-0 bg-dark-900/60 z-10" />
          <img 
            src={article.cover} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent z-10" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm font-mono text-gray-300">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-neon-purple" />
                {article.date}
              </span>
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4 text-neon-green" />
                {article.likes} LIKES
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 text-xs font-mono bg-white/10 px-2 py-1 rounded border border-white/10 text-gray-300">
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12">
          {/* Use standard CSS for markdown content rendering simulation */}
          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-gray-100 prose-headings:font-bold prose-a:text-neon-blue hover:prose-a:text-neon-purple prose-code:text-neon-green prose-code:bg-dark-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-dark-900 prose-pre:border prose-pre:border-white/10">
            {article.content.split('\n').map((paragraph, idx) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={idx} className="text-2xl font-bold mt-8 mb-4 text-white border-b border-white/10 pb-2">{paragraph.replace('## ', '')}</h2>;
              } else if (paragraph.startsWith('### ')) {
                return <h3 key={idx} className="text-xl font-bold mt-6 mb-3 text-gray-200">{paragraph.replace('### ', '')}</h3>;
              } else if (paragraph.startsWith('```')) {
                return null; // Simplified code block rendering for mock
              } else if (paragraph.trim() !== '') {
                // Handling bold text rudimentarily
                const parts = paragraph.split('**');
                return (
                  <p key={idx} className="text-gray-300 leading-relaxed mb-4">
                    {parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="text-white">{part}</strong> : part)}
                  </p>
                );
              }
              return null;
            })}
            
            {/* Adding a mocked code block specifically for demonstration */}
            {article.content.includes('```') && (
              <pre className="bg-dark-900 p-4 rounded-lg border border-white/10 overflow-x-auto mt-6 mb-6">
                <code className="text-sm font-mono text-neon-green">
                  {article.content.split('```')[1]?.replace(/^python\n|^css\n/, '')}
                </code>
              </pre>
            )}
          </div>

          <CommentSection articleId={article.id} />
        </div>
      </article>
    </motion.div>
  );
};
