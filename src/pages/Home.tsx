import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import ArticleCard from '../components/ArticleCard';
import { mockArticles } from '../data/mockData';
import { motion } from 'framer-motion';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    mockArticles.forEach(article => article.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, []);

  // Find most liked article
  const topArticle = useMemo(() => {
    return [...mockArticles].sort((a, b) => b.likes - a.likes)[0];
  }, []);

  // Filter articles based on search and tags
  const filteredArticles = useMemo(() => {
    return mockArticles.filter(article => {
      // Exclude top article from the regular list if no filters are active
      if (!searchQuery && !selectedTag && article.id === topArticle.id) {
        return false;
      }
      
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag ? article.tags.includes(selectedTag) : true;
      
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag, topArticle.id]);

  return (
    <div className="min-h-screen relative selection:bg-cyan selection:text-dark">
      {/* Background grid effect */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        backgroundPosition: 'center center',
      }}>
        <div className="absolute inset-0 bg-dark/80" />
      </div>

      <div className="relative z-10">
        <Navbar onSearch={setSearchQuery} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Tag Filter Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 flex flex-wrap gap-3"
          >
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-1.5 font-mono text-sm border transition-all duration-300 ${
                selectedTag === null 
                  ? 'border-cyan bg-cyan/10 text-cyan shadow-[0_0_15px_rgba(0,240,255,0.3)]' 
                  : 'border-glass-border text-gray-500 hover:border-gray-500 hover:text-gray-300'
              }`}
            >
              [ALL_MODULES]
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-4 py-1.5 font-mono text-sm border transition-all duration-300 ${
                  tag === selectedTag 
                    ? 'border-purple bg-purple/10 text-purple shadow-[0_0_15px_rgba(138,43,226,0.3)]' 
                    : 'border-glass-border text-gray-500 hover:border-gray-500 hover:text-gray-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </motion.div>

          {/* Top Article - Only show when no filters are active */}
          {!searchQuery && !selectedTag && (
            <div className="mb-16">
              <ArticleCard article={topArticle} isFeatured={true} />
            </div>
          )}

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.length > 0 ? (
              filteredArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center font-mono text-gray-500">
                <p className="text-xl mb-2">404_NOT_FOUND</p>
                <p className="text-sm">NO_MATCHING_RECORDS_IN_DATABASE</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
