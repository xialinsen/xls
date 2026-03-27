import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Calendar, User, ArrowLeft, MessageSquare } from 'lucide-react';
import { useBlogStore } from '../store/useBlogStore';
import { Tag } from '../components/Tag';
import { Button } from '../components/Button';

export const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { articles, comments, likeArticle, addComment } = useBlogStore();

  const [authorName, setAuthorName] = useState('');
  const [commentContent, setCommentContent] = useState('');

  const article = articles.find(a => a.id === id);
  const articleComments = comments.filter(c => c.articleId === id);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl text-primary font-bold mb-4">&gt; 404_NOT_FOUND</h1>
        <p className="text-gray-400 mb-8">The requested data module could not be located in the grid.</p>
        <Button onClick={() => navigate('/')}>RETURN_TO_BASE</Button>
      </div>
    );
  }

  const handleLike = () => {
    likeArticle(article.id);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentContent.trim()) return;

    addComment({
      articleId: article.id,
      authorName: authorName.trim(),
      content: commentContent.trim(),
    });

    setAuthorName('');
    setCommentContent('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-6 pb-20"
    >
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-mono text-sm uppercase tracking-wider">Back_to_grid</span>
      </button>

      <article className="glass-panel p-8 md:p-12 rounded-lg mb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
        
        <header className="mb-10">
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map(tag => (
              <Tag key={tag} name={tag} />
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-100 mb-6 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-mono border-y border-muted/50 py-4">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              {article.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-secondary" />
              {article.createdAt}
            </span>
            <button 
              onClick={handleLike}
              className="flex items-center gap-2 hover:text-accent transition-colors ml-auto group"
            >
              <Heart className="w-4 h-4 group-hover:fill-accent" />
              {article.likes} LIKES
            </button>
          </div>
        </header>

        {article.coverImage && (
          <div className="mb-10 rounded-lg overflow-hidden border border-muted/50">
            <img src={article.coverImage} alt={article.title} className="w-full h-auto object-cover" />
          </div>
        )}

        {/* Note: In a real app, use a Markdown parser like react-markdown. For this demo, we'll render text with basic whitespace preservation. */}
        <div className="prose prose-invert prose-cyan max-w-none font-sans text-gray-300 leading-relaxed whitespace-pre-wrap">
          {article.content}
        </div>
      </article>

      {/* Comments Section */}
      <section className="glass-panel p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-100 mb-8 flex items-center gap-3">
          <MessageSquare className="text-primary" />
          USER_COMMENTS <span className="text-sm font-normal text-gray-500 font-mono">[{articleComments.length}]</span>
        </h2>

        <div className="space-y-6 mb-10">
          {articleComments.length > 0 ? (
            articleComments.map(comment => (
              <div key={comment.id} className="border-l-2 border-muted pl-4 py-2 hover:border-secondary transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-bold text-gray-200">{comment.authorName}</span>
                  <span className="text-xs text-gray-500 font-mono">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-400">{comment.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 font-mono italic">No communication logs found.</p>
          )}
        </div>

        <form onSubmit={handleCommentSubmit} className="space-y-4 border-t border-muted/50 pt-8">
          <h3 className="text-lg font-bold text-gray-200 mb-4">TRANSMIT_MESSAGE</h3>
          <div>
            <input
              type="text"
              placeholder="Your ID / Name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full bg-surface border border-muted rounded-md px-4 py-2 text-gray-200 focus:outline-none focus:border-primary focus:shadow-neon-primary transition-all font-mono text-sm"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Enter message content..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              className="w-full bg-surface border border-muted rounded-md px-4 py-3 text-gray-200 focus:outline-none focus:border-primary focus:shadow-neon-primary transition-all h-32 resize-none"
              required
            />
          </div>
          <Button type="submit" variant="primary">
            EXECUTE_TRANSMISSION
          </Button>
        </form>
      </section>
    </motion.div>
  );
};
