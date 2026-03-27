import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { HeroArticle } from '../components/HeroArticle';
import { ArticleCard } from '../components/ArticleCard';
import { TagFilter } from '../components/TagFilter';

export const Home: React.FC = () => {
  const { articles, searchQuery, selectedTag } = useStore();

  const topArticle = useMemo(() => {
    return [...articles].sort((a, b) => b.likes - a.likes)[0];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            article.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag ? article.tags.includes(selectedTag) : true;
      return matchesSearch && matchesTag && article.id !== topArticle?.id; // Exclude top article from list
    });
  }, [articles, searchQuery, selectedTag, topArticle]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      {!searchQuery && !selectedTag && topArticle && (
        <section className="mb-16">
          <HeroArticle article={topArticle} />
        </section>
      )}

      <section>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold font-mono text-white">LATEST_TRANSMISSIONS</h2>
          <div className="h-px bg-white/10 flex-grow" />
        </div>
        
        <TagFilter />

        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass-panel rounded-xl border border-white/5">
            <p className="text-gray-500 font-mono">NO_DATA_FOUND</p>
          </div>
        )}
      </section>
    </motion.div>
  );
};
