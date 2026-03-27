import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Clock, Calendar, ArrowRight } from 'lucide-react';
import { useStore } from '../store';
import clsx from 'clsx';
import { format } from 'date-fns';

const Home: React.FC = () => {
  const { articles, searchQuery, selectedTag, setSelectedTag, getAllTags } = useStore();
  const allTags = getAllTags();

  // Find most liked article
  const featuredArticle = useMemo(() => {
    if (articles.length === 0) return null;
    return [...articles].sort((a, b) => b.likes - a.likes)[0];
  }, [articles]);

  // Filter articles based on search and tags
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            article.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag ? article.tags.includes(selectedTag) : true;
      // Don't exclude featured from list, or maybe exclude it? Better to keep it if it matches filters
      return matchesSearch && matchesTag;
    });
  }, [articles, searchQuery, selectedTag]);

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Featured Article Section */}
      {!searchQuery && !selectedTag && featuredArticle && (
        <section className="relative w-full rounded-3xl overflow-hidden glass-card group">
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 via-dark-800/80 to-transparent z-10" />
          {featuredArticle.imageUrl && (
            <img 
              src={featuredArticle.imageUrl} 
              alt={featuredArticle.title} 
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
            />
          )}
          
          <div className="relative z-20 p-8 md:p-12 lg:w-2/3 flex flex-col justify-center min-h-[400px]">
            <div className="flex items-center gap-2 text-neon-blue mb-4">
              <Flame className="w-5 h-5 animate-pulse" />
              <span className="text-sm font-semibold tracking-wider uppercase tracking-widest">Top Rated</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
              {featuredArticle.title}
            </h1>
            
            <p className="text-lg text-slate-300 mb-8 line-clamp-3 max-w-2xl">
              {featuredArticle.summary}
            </p>
            
            <div className="flex items-center gap-6">
              <Link 
                to={`/article/${featuredArticle.id}`}
                className="btn-neon inline-flex items-center gap-2"
              >
                阅读全文 <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {featuredArticle.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {featuredArticle.readTime}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content: Article List */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="w-2 h-8 bg-neon-purple rounded-full inline-block"></span>
              最新文章
            </h2>
            <span className="text-slate-400 text-sm">{filteredArticles.length} 篇文章</span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="py-20 text-center text-slate-400 glass-card">
              未找到匹配的文章
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map(article => (
                <Link 
                  key={article.id} 
                  to={`/article/${article.id}`}
                  className="glass-card flex flex-col h-full overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
                >
                  {article.imageUrl && (
                    <div className="h-48 overflow-hidden relative">
                      <div className="absolute inset-0 bg-dark-900/20 group-hover:bg-transparent transition-colors z-10" />
                      <img 
                        src={article.imageUrl} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex gap-2 flex-wrap mb-3">
                      {article.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 rounded-md bg-white/5 text-neon-blue border border-white/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-neon-blue transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-1">
                      {article.summary}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-white/5 mt-auto">
                      <span>{article.date}</span>
                      <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-neon-purple" /> {article.likes}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar: Tags */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 glass-card p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-neon-green rounded-full inline-block"></span>
              标签探索
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={clsx(
                  "px-3 py-1.5 text-sm rounded-full border transition-all duration-300",
                  selectedTag === null 
                    ? "bg-white/10 border-white/20 text-white shadow-[0_0_10px_rgba(255,255,255,0.2)]" 
                    : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                全部
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={clsx(
                    "px-3 py-1.5 text-sm rounded-full border transition-all duration-300",
                    selectedTag === tag
                      ? "bg-neon-blue/20 border-neon-blue/50 text-neon-blue shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                      : "bg-dark-700/50 border-white/5 text-slate-300 hover:border-white/20 hover:text-white"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;
