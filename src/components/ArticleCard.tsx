import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, Hash } from 'lucide-react';
import { Article } from '../types';

interface Props {
  article: Article;
  featured?: boolean;
}

export const ArticleCard: React.FC<Props> = ({ article, featured = false }) => {
  return (
    <Link to={`/post/${article.id}`} className="block h-full">
      <article 
        className={`glass-panel rounded-2xl overflow-hidden h-full flex flex-col group glow-hover animate-slide-up`}
      >
        {article.coverImage && (
          <div className={`relative overflow-hidden ${featured ? 'h-64' : 'h-48'}`}>
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-all duration-500"></div>
            <img 
              src={article.coverImage} 
              alt={article.title} 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        
        <div className="p-6 flex flex-col flex-1">
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map(tag => (
              <span key={tag} className="flex items-center text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                <Hash className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
          
          <h3 className={`font-display font-bold mb-3 group-hover:neon-text transition-all ${featured ? 'text-2xl' : 'text-xl'}`}>
            {article.title}
          </h3>
          
          <p className="text-text-muted text-sm mb-6 line-clamp-3 flex-1">
            {article.summary}
          </p>
          
          <div className="flex items-center justify-between text-xs font-mono text-text-muted mt-auto pt-4 border-t border-white/5">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {article.date}
            </div>
            <div className="flex items-center text-secondary">
              <Heart className="w-4 h-4 mr-1 fill-secondary/20" />
              {article.likes}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
