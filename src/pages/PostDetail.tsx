import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, ThumbsUp, Send, User } from 'lucide-react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useBlogStore } from '../store/useBlogStore';

export const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { articles, comments, addComment } = useBlogStore();
  
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');

  const article = articles.find(a => a.id === id);
  const articleComments = comments.filter(c => c.articleId === id).sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (!article) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-mono text-secondary mb-4">ERROR_404: RECORD_NOT_FOUND</h2>
        <button onClick={() => navigate('/')} className="text-primary hover:underline">
          &lt; RETURN_TO_BASE
        </button>
      </div>
    );
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) return;

    addComment({
      articleId: article.id,
      author: authorName,
      content: newComment,
    });

    setNewComment('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto py-8 max-w-4xl"
    >
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8 group font-mono text-sm"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        RETURN_TO_MAIN_SEQUENCE
      </button>

      <article className="glass-panel p-8 md:p-12 mb-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-secondary to-transparent opacity-50"></div>
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <svg width="100" height="100" viewBox="0 0 100 100" className="animate-spin-slow">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="5 5" />
            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="10 10" />
          </svg>
        </div>

        <header className="mb-10 relative z-10">
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs font-mono rounded bg-primary/10 border border-primary/30 text-primary">
                #{tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex items-center gap-6 text-sm text-text-muted font-mono border-y border-border/50 py-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{format(new Date(article.createdAt), 'yyyy-MM-dd HH:mm')}</span>
            </div>
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-4 h-4 text-secondary" />
              <span>{article.likes.toLocaleString()} LIKES</span>
            </div>
          </div>
        </header>

        <div className="prose prose-invert prose-lg max-w-none 
          prose-headings:text-text-main prose-headings:font-bold prose-headings:tracking-tight
          prose-h1:text-3xl prose-h1:border-b prose-h1:border-border/50 prose-h1:pb-2
          prose-h2:text-2xl prose-h2:mt-10
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline hover:prose-a:text-secondary
          prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-surfaceHover prose-pre:border prose-pre:border-border prose-pre:rounded-xl
          prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:font-normal prose-blockquote:not-italic
          relative z-10"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* Comments Section */}
      <section className="mt-16">
        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <span className="neon-text">COMM_LINK</span>
          <span className="text-sm font-mono text-text-muted font-normal">[{articleComments.length} MESSAGES]</span>
        </h3>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="glass-panel p-6 mb-10 neon-border">
          <div className="mb-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-text-muted" />
            </div>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="ENTER_IDENTIFIER"
              className="block w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-surface/50 text-text-main placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all font-mono"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="TRANSMIT_DATA..."
              rows={4}
              className="block w-full p-4 border border-border rounded-lg bg-surface/50 text-text-main placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none"
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!newComment.trim() || !authorName.trim()}
              className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/50 px-6 py-2 rounded-lg font-mono font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]"
            >
              <Send className="w-4 h-4" />
              TRANSMIT
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-4">
          {articleComments.map((comment, index) => (
            <motion.div 
              key={comment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-6 border-l-2 border-l-secondary"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-secondary font-mono">{comment.author}</span>
                <span className="text-xs text-text-muted font-mono">
                  {format(new Date(comment.createdAt), 'yyyy-MM-dd HH:mm')}
                </span>
              </div>
              <p className="text-text-main leading-relaxed">{comment.content}</p>
            </motion.div>
          ))}
          {articleComments.length === 0 && (
            <div className="text-center py-8 text-text-muted font-mono">
              NO_COMMUNICATIONS_DETECTED. BE_THE_FIRST_TO_TRANSMIT.
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
};
