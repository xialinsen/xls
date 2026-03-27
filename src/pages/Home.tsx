import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { ThumbsUp, Calendar, ChevronRight, Hash, Flame } from 'lucide-react';
import { Article } from '../types';

export const Home = () => {
  const { articles, searchQuery, selectedTag, setSelectedTag } = useStore();

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    articles.forEach(a => a.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, [articles]);

  // Find most liked article
  const topArticle = useMemo(() => {
    return [...articles].sort((a, b) => b.likes - a.likes)[0];
  }, [articles]);

  // Filter articles based on search and tag
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            article.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag ? article.tags.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [articles, searchQuery, selectedTag]);

  return (
    <div className="space-y-12">
      {/* Hero Section - Top Article */}
      {!searchQuery && !selectedTag && topArticle && (
        <section>
          <div className="flex items-center space-x-2 mb-6">
            <Flame className="w-5 h-5 text-cyber-purple animate-pulse" />
            <h2 className="text-xl font-mono font-bold text-white neon-text-purple tracking-widest uppercase">
              Trending_Now
            </h2>
          </div>
          
          <Link to={`/article/${topArticle.id}`} className="block group">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="relative overflow-hidden rounded-xl glass-panel border-cyber-purple/30 group-hover:border-cyber-purple transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyber-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="p-8 sm:p-12 relative z-10">
                <div className="flex flex-wrap gap-2 mb-4">
                  {topArticle.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono px-2 py-1 bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/30 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 group-hover:text-cyber-cyan transition-colors">
                  {topArticle.title}
                </h1>
                
                <p className="text-gray-400 text-lg mb-8 max-w-3xl">
                  {topArticle.summary}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-gray-500 font-mono">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{topArticle.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-cyber-cyan">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{topArticle.likes}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-cyber-purple group-hover:translate-x-2 transition-transform font-mono">
                    <span>READ_MORE</span>
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        </section>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column: Tags Filter */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 glass-panel p-6 rounded-xl">
            <div className="flex items-center space-x-2 mb-6">
              <Hash className="w-5 h-5 text-cyber-cyan" />
              <h3 className="text-lg font-mono font-bold text-white">SYSTEM_TAGS</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`text-sm font-mono px-3 py-1.5 rounded transition-all ${
                  selectedTag === null 
                    ? 'bg-cyber-cyan text-cyber-black shadow-neon-cyan' 
                    : 'text-gray-400 hover:text-white border border-gray-700 hover:border-cyber-cyan'
                }`}
              >
                ALL
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`text-sm font-mono px-3 py-1.5 rounded transition-all ${
                    selectedTag === tag 
                      ? 'bg-cyber-cyan text-cyber-black shadow-neon-cyan' 
                      : 'text-gray-400 hover:text-white border border-gray-700 hover:border-cyber-cyan'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Article List */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <h3 className="text-lg font-mono font-bold text-white neon-text-cyan">
              {searchQuery ? `SEARCH_RESULTS: ${searchQuery}` : 'DATA_STREAMS'}
            </h3>
            <span className="text-sm font-mono text-gray-500">
              {filteredArticles.length} RECORDS_FOUND
            </span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="glass-panel p-12 text-center rounded-xl border-dashed border-gray-700">
              <div className="font-mono text-gray-500">404 // NO_DATA_FOUND</div>
            </div>
          ) : (
            filteredArticles.map((article, index) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                key={article.id}
              >
                <Link to={`/article/${article.id}`} className="block group">
                  <div className="glass-panel p-6 rounded-xl border-l-4 border-l-transparent group-hover:border-l-cyber-cyan group-hover:shadow-neon-cyan transition-all duration-300">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.tags.map(tag => (
                        <span key={tag} className="text-xs font-mono text-cyber-cyan">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-cyber-cyan transition-colors">
                      {article.title}
                    </h4>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {article.summary}
                    </p>
                    
                    <div className="flex items-center space-x-6 text-xs text-gray-500 font-mono">
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-cyber-purple">
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{article.likes}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
        
      </div>
    </div>
  );
};
