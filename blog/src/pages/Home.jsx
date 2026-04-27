import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Tag, ThumbsUp, ArrowRight } from 'lucide-react';
import { articles } from '../data/mockData';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Find the top-liked article
  const topArticle = useMemo(() => {
    return [...articles].sort((a, b) => b.likes - a.likes)[0];
  }, []);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set();
    articles.forEach(article => article.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, []);

  // Filter articles based on search and tags
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            article.summary.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag ? article.tags.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag]);

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Top Liked Article Section */}
      {!searchTerm && !selectedTag && (
        <section className="cyber-border bg-[#111]/80 backdrop-blur rounded-lg p-6 md:p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#0ff]/10 blur-3xl rounded-full"></div>
          <div className="flex items-center gap-2 text-[#0ff] mb-4 text-sm font-semibold tracking-wider">
            <ThumbsUp className="w-5 h-5" />
            <span>最高赞誉协议 // TOP LIKED</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:cyber-glow transition-all duration-300">
            <Link to={`/article/${topArticle.id}`}>{topArticle.title}</Link>
          </h2>
          <p className="text-gray-400 text-lg mb-6 leading-relaxed">
            {topArticle.summary}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {topArticle.tags.map(tag => (
                <span key={tag} className="px-2 py-1 text-xs text-[#0ff] bg-[#0ff]/10 border border-[#0ff]/30 rounded">
                  {tag}
                </span>
              ))}
            </div>
            <Link to={`/article/${topArticle.id}`} className="flex items-center gap-1 text-[#0ff] hover:text-white transition-colors">
              读取数据 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Search and Filter Section */}
      <section className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[#0ff]/60" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-[#0ff]/30 rounded-md bg-[#111] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#0ff] focus:border-[#0ff] sm:text-sm transition-all"
            placeholder="输入关键字搜索数据核心..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* Tags Filter */}
      <section className="flex flex-wrap gap-2 items-center">
        <Tag className="w-4 h-4 text-gray-500 mr-2" />
        <button
          onClick={() => setSelectedTag('')}
          className={`px-3 py-1 text-sm rounded-full transition-all ${
            selectedTag === '' 
              ? 'bg-[#0ff] text-black font-semibold shadow-[0_0_10px_rgba(0,255,255,0.5)]' 
              : 'bg-[#111] text-gray-400 border border-gray-700 hover:border-[#0ff]/50'
          }`}
        >
          全部模块
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 text-sm rounded-full transition-all ${
              selectedTag === tag 
                ? 'bg-[#0ff] text-black font-semibold shadow-[0_0_10px_rgba(0,255,255,0.5)]' 
                : 'bg-[#111] text-gray-400 border border-gray-700 hover:border-[#0ff]/50'
            }`}
          >
            {tag}
          </button>
        ))}
      </section>

      {/* Articles List */}
      <section className="grid gap-6 md:grid-cols-2">
        {filteredArticles.length > 0 ? (
          filteredArticles.map(article => (
            <div key={article.id} className="bg-[#111] border border-gray-800 hover:border-[#0ff]/50 rounded-lg p-6 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.15)] flex flex-col h-full">
              <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 hover:text-[#0ff] transition-colors">
                <Link to={`/article/${article.id}`}>{article.title}</Link>
              </h3>
              <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
                {article.summary}
              </p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{article.date}</span>
                  <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> {article.likes}</span>
                </div>
                <div className="flex gap-1">
                  {article.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="px-2 py-0.5 text-[10px] text-gray-400 bg-gray-800 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-gray-500 border border-dashed border-gray-700 rounded-lg">
            <p>未找到匹配的数据记录。请尝试其他搜索参数。</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
