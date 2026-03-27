import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { mockArticles } from '../data/mock';
import { TechCard } from '../components/TechCard';
import { Clock, Calendar, ThumbsUp, Tag as TagIcon, ArrowRight } from 'lucide-react';
import { Navbar } from '../components/Navbar';

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('search') || '';
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    mockArticles.forEach(article => article.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, []);

  // Most liked article
  const topArticle = useMemo(() => {
    return [...mockArticles].sort((a, b) => b.likes - a.likes)[0];
  }, []);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return mockArticles.filter(article => {
      const matchesSearch = query === '' || 
        article.title.toLowerCase().includes(query.toLowerCase()) || 
        article.abstract.toLowerCase().includes(query.toLowerCase());
      
      const matchesTag = selectedTag === null || article.tags.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });
  }, [query, selectedTag]);

  return (
    <div className="min-h-screen pt-20 pb-12">
      <Navbar onSearch={(q) => setSearchParams(q ? { search: q } : {})} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Top Liked Article Hero Section */}
        {!query && !selectedTag && topArticle && (
          <section className="mb-16">
            <h2 className="text-xl font-mono text-primary mb-6 flex items-center">
              <span className="w-2 h-2 bg-primary inline-block mr-3 animate-pulse"></span>
              HOTTEST_TRANSMISSION
            </h2>
            <Link to={`/article/${topArticle.id}`} className="block group">
              <div className="relative border border-primary/30 bg-surface/50 p-8 md:p-12 overflow-hidden hover:border-primary transition-colors duration-500">
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none group-hover:bg-primary/20 transition-all duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-4 text-sm font-mono text-gray-400">
                    <span className="flex items-center text-secondary"><ThumbsUp className="w-4 h-4 mr-1" /> {topArticle.likes}</span>
                    <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {topArticle.date}</span>
                    <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {topArticle.readTime} min read</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 group-hover:text-primary transition-colors duration-300 glitch-text" data-text={topArticle.title}>
                    {topArticle.title}
                  </h1>
                  
                  <p className="text-lg text-gray-300 max-w-3xl mb-8 leading-relaxed">
                    {topArticle.abstract}
                  </p>
                  
                  <div className="flex items-center text-primary font-mono font-bold tracking-widest">
                    READ_MORE <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Filters and List Section */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <h2 className="text-2xl font-mono text-white flex items-center">
              <span className="w-2 h-2 bg-secondary inline-block mr-3"></span>
              DATA_STREAMS
              {query && <span className="ml-3 text-sm text-primary">/ SEARCH: "{query}"</span>}
            </h2>
            
            {/* Tag Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-1.5 font-mono text-sm border transition-all duration-300 ${
                  selectedTag === null 
                    ? 'border-secondary bg-secondary/20 text-secondary shadow-neon-secondary' 
                    : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'
                }`}
              >
                ALL
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-1.5 font-mono text-sm border transition-all duration-300 flex items-center ${
                    selectedTag === tag
                      ? 'border-primary bg-primary/20 text-primary shadow-neon-primary'
                      : 'border-gray-700 text-gray-400 hover:border-primary/50 hover:text-primary/80'
                  }`}
                >
                  <TagIcon className="w-3 h-3 mr-1.5" />
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Link key={article.id} to={`/article/${article.id}`}>
                  <TechCard className="h-full flex flex-col justify-between group">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-mono text-primary/80">{article.date}</span>
                        <span className="flex items-center text-xs font-mono text-secondary"><ThumbsUp className="w-3 h-3 mr-1" /> {article.likes}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-6 line-clamp-3">
                        {article.abstract}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {article.tags.map(tag => (
                        <span key={tag} className="text-xs font-mono px-2 py-1 bg-background border border-gray-800 text-gray-500 group-hover:border-primary/30 group-hover:text-primary/80 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </TechCard>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border border-dashed border-gray-800">
              <p className="text-gray-500 font-mono text-lg">NO_DATA_FOUND</p>
              <button 
                onClick={() => {
                  setSearchParams({});
                  setSelectedTag(null);
                }}
                className="mt-4 text-primary hover:underline font-mono text-sm"
              >
                RESET_FILTERS
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
