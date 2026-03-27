import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThumbsUp, Calendar, ArrowRight, Zap } from 'lucide-react';
import { Article } from '../types';
import { format } from 'date-fns';

interface ArticleCardProps {
  article: Article;
  isTop?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, isTop = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className={`glass-panel p-6 flex flex-col h-full relative overflow-hidden group ${
        isTop ? 'neon-border md:col-span-2 lg:col-span-3 min-h-[300px] justify-center' : ''
      }`}
    >
      {isTop && (
        <div className="absolute top-0 right-0 p-4">
          <div className="flex items-center gap-1 text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            <Zap className="w-4 h-4" />
            <span className="text-xs font-bold tracking-wider">TOP RATED</span>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-4 relative z-10">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs font-mono rounded bg-surfaceHover border border-border text-text-muted"
          >
            #{tag}
          </span>
        ))}
      </div>

      <Link to={`/post/${article.id}`} className="group-hover:text-primary transition-colors relative z-10">
        <h2 className={`font-bold mb-3 ${isTop ? 'text-3xl md:text-4xl neon-text' : 'text-xl'}`}>
          {article.title}
        </h2>
      </Link>

      <p className={`text-text-muted mb-6 flex-grow relative z-10 ${isTop ? 'text-lg max-w-3xl' : 'text-sm line-clamp-3'}`}>
        {article.summary}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50 relative z-10">
        <div className="flex items-center gap-4 text-xs text-text-muted font-mono">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{format(new Date(article.createdAt), 'yyyy-MM-dd')}</span>
          </div>
          <div className="flex items-center gap-1 text-secondary">
            <ThumbsUp className="w-4 h-4" />
            <span>{article.likes.toLocaleString()}</span>
          </div>
        </div>
        
        <Link
          to={`/post/${article.id}`}
          className="flex items-center gap-1 text-sm font-bold text-primary hover:text-secondary transition-colors"
        >
          <span>READ</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Decorative background element */}
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
    </motion.div>
  );
};
