import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ThumbsUp, ChevronRight } from 'lucide-react';
import { Article } from '../types';
import { useStore } from '../store/useStore';

interface Props {
  article: Article;
  index: number;
}

export const ArticleCard: React.FC<Props> = ({ article, index }) => {
  const { setSelectedTag } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-xl overflow-hidden glass-panel border border-white/5 hover:border-neon-blue/50 transition-all duration-500 hover:shadow-neon-blue bg-dark-800/40"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-xs text-gray-400 font-mono">
            <Calendar className="w-4 h-4 text-neon-purple" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-400">
            <ThumbsUp className="w-4 h-4 text-neon-green" />
            <span>{article.likes}</span>
          </div>
        </div>

        <Link to={`/article/${article.id}`}>
          <h3 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-neon-blue transition-colors line-clamp-2">
            {article.title}
          </h3>
        </Link>
        
        <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
          {article.summary}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className="text-xs px-2 py-1 rounded border border-white/10 bg-white/5 hover:bg-neon-blue/20 hover:text-neon-blue hover:border-neon-blue/50 transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>
          
          <Link 
            to={`/article/${article.id}`}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 group-hover:bg-neon-blue group-hover:text-dark-900 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
