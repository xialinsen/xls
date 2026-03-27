import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThumbsUp, ArrowUpRight } from 'lucide-react';
import { Article } from '../types';

interface Props {
  article: Article;
}

export const HeroArticle: React.FC<Props> = ({ article }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      className="relative rounded-2xl overflow-hidden mb-12 border border-white/10 group"
    >
      <div className="absolute inset-0">
        <img 
          src={article.cover} 
          alt={article.title} 
          className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/50 to-transparent" />
      </div>

      <div className="relative z-10 p-8 md:p-12 lg:p-16 h-full flex flex-col justify-end min-h-[400px]">
        <div className="inline-flex items-center space-x-2 bg-neon-purple/20 border border-neon-purple/50 text-neon-purple px-3 py-1 rounded-full text-xs font-mono mb-6 w-max">
          <span className="w-2 h-2 rounded-full bg-neon-purple animate-pulse" />
          <span>TOP_RATED // {article.likes} LIKES</span>
        </div>

        <Link to={`/article/${article.id}`}>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-3xl leading-tight group-hover:text-neon-blue transition-colors duration-300">
            {article.title}
          </h1>
        </Link>
        
        <p className="text-gray-300 text-lg max-w-2xl mb-8 line-clamp-2">
          {article.summary}
        </p>

        <div className="flex items-center gap-4">
          <Link 
            to={`/article/${article.id}`}
            className="inline-flex items-center justify-center space-x-2 bg-neon-blue text-dark-900 px-6 py-3 rounded font-medium hover:bg-white hover:shadow-neon-blue transition-all duration-300"
          >
            <span>READ_ARTICLE</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          
          <div className="flex gap-2">
            {article.tags.map(tag => (
              <span key={tag} className="text-sm text-gray-400 font-mono bg-white/5 px-3 py-1 rounded border border-white/10">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
