import { Link } from 'react-router-dom';
import { Calendar, ThumbsUp, ArrowRight } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  isFeatured?: boolean;
}

export default function ArticleCard({ article, isFeatured = false }: ArticleCardProps) {
  return (
    <div className={`group relative glass-panel rounded-lg overflow-hidden transition-all duration-500 hover:-translate-y-1 ${isFeatured ? 'neon-border md:col-span-2' : 'border border-slate-700 hover:border-[#8A2BE2]/50'}`}>
      {/* Decorative top bar */}
      <div className={`absolute top-0 left-0 w-full h-1 ${isFeatured ? 'bg-[#00F0FF]' : 'bg-[#8A2BE2] opacity-0 group-hover:opacity-100 transition-opacity'}`}></div>
      
      <div className="p-6 sm:p-8 flex flex-col h-full">
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.map(tag => (
            <span key={tag} className="text-xs font-mono px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 group-hover:border-[#00F0FF]/30 transition-colors">
              #{tag}
            </span>
          ))}
        </div>
        
        <Link to={`/article/${article.id}`} className="block group-hover:text-[#00F0FF] transition-colors">
          <h2 className={`font-bold text-slate-100 mb-3 ${isFeatured ? 'text-2xl sm:text-3xl neon-text' : 'text-xl'}`}>
            {article.title}
          </h2>
        </Link>
        
        <p className="text-slate-400 mb-6 flex-grow leading-relaxed">
          {article.summary}
        </p>
        
        <div className="flex items-center justify-between text-sm text-slate-500 font-mono mt-auto pt-4 border-t border-slate-800">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar size={14} className="text-[#8A2BE2]" />
              {article.date}
            </span>
            <span className="flex items-center gap-1 text-[#00F0FF]">
              <ThumbsUp size={14} />
              {article.likes}
            </span>
          </div>
          
          <Link to={`/article/${article.id}`} className="flex items-center gap-1 text-[#00F0FF] opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
            阅读执行 <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
