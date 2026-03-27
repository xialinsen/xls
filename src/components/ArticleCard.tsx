import { Link } from 'react-router-dom';
import { Heart, Calendar, ChevronRight } from 'lucide-react';
import { Article } from '../types';
import { motion } from 'framer-motion';

interface ArticleCardProps {
  article: Article;
  isFeatured?: boolean;
}

export default function ArticleCard({ article, isFeatured = false }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`group relative overflow-hidden glass-panel transition-all duration-300 hover:border-cyan/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] ${
        isFeatured ? 'col-span-1 md:col-span-2 lg:col-span-3' : ''
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className={`flex flex-col ${isFeatured ? 'md:flex-row' : ''} h-full`}>
        {article.coverImage && (
          <div className={`relative overflow-hidden ${isFeatured ? 'md:w-1/2 h-64 md:h-auto' : 'h-48'}`}>
            <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {isFeatured && (
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1 bg-cyan/20 border border-cyan/50 text-cyan text-xs font-mono tracking-wider backdrop-blur-md">
                  HOT_TOPIC
                </span>
              </div>
            )}
          </div>
        )}

        <div className={`p-6 flex flex-col flex-1 ${isFeatured ? 'md:w-1/2 justify-center' : ''} relative z-20`}>
          <div className="flex items-center gap-4 text-xs font-mono text-gray-400 mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {article.date}
            </span>
            <span className="flex items-center gap-1 text-purple">
              <Heart className="w-3 h-3" />
              {article.likes}
            </span>
          </div>

          <Link to={`/post/${article.id}`} className="block group/title">
            <h2 className={`font-bold text-gray-100 mb-3 group-hover/title:text-cyan transition-colors ${
              isFeatured ? 'text-2xl md:text-3xl' : 'text-xl'
            }`}>
              {article.title}
            </h2>
          </Link>

          <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <span key={tag} className="text-xs font-mono text-gray-500 before:content-['#']">
                  {tag}
                </span>
              ))}
            </div>
            
            <Link 
              to={`/post/${article.id}`}
              className="flex items-center gap-1 text-sm font-mono text-cyan opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
            >
              READ_MORE <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
