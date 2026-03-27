import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, User } from 'lucide-react';
import { Article } from '../types';
import { Tag } from './Tag';
import { cn } from './Button';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  featured = false,
  className 
}) => {
  return (
    <div className={cn(
      "glass-panel rounded-lg overflow-hidden group glass-panel-hover flex flex-col h-full relative",
      featured ? "md:flex-row md:col-span-2 border-primary/30" : "",
      className
    )}>
      {featured && (
        <div className="absolute top-0 right-0 bg-primary text-background text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
          FEATURED // TOP LIKED
        </div>
      )}
      
      {article.coverImage && (
        <div className={cn(
          "overflow-hidden relative",
          featured ? "md:w-1/2" : "h-48 w-full"
        )}>
          <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-all duration-500"></div>
          <img 
            src={article.coverImage} 
            alt={article.title} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
          />
        </div>
      )}
      
      <div className={cn(
        "p-6 flex flex-col flex-grow",
        featured ? "md:w-1/2 justify-center" : ""
      )}>
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.map(tag => (
            <Tag key={tag} name={tag} />
          ))}
        </div>
        
        <Link to={`/article/${article.id}`} className="block group-hover:text-glow transition-all">
          <h2 className={cn(
            "font-bold text-gray-100 mb-3",
            featured ? "text-3xl" : "text-xl"
          )}>
            {article.title}
          </h2>
        </Link>
        
        <p className="text-gray-400 mb-6 flex-grow line-clamp-3">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 font-mono mt-auto pt-4 border-t border-muted/50">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {article.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {article.createdAt}
            </span>
          </div>
          <span className="flex items-center gap-1 text-secondary group-hover:text-glow-secondary transition-all">
            <Heart className="w-4 h-4" />
            {article.likes}
          </span>
        </div>
      </div>
    </div>
  );
};
