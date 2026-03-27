import React, { useMemo } from 'react';
import { Flame } from 'lucide-react';
import { useBlogStore } from '../store';
import { ArticleCard } from '../components/ArticleCard';
import { TagFilter } from '../components/TagFilter';

const HomePage: React.FC = () => {
  const { articles, searchQuery, activeTag } = useBlogStore();

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            article.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = activeTag ? article.tags.includes(activeTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [articles, searchQuery, activeTag]);

  const topArticles = useMemo(() => {
    return [...articles].sort((a, b) => b.likes - a.likes).slice(0, 2);
  }, [articles]);

  const showFeatured = !searchQuery && !activeTag;

  return (
    <div className="animate-fade-in space-y-12 pb-12">
      {/* Featured Section */}
      {showFeatured && (
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Flame className="w-6 h-6 text-secondary animate-pulse" />
            <h2 className="text-2xl font-display font-bold">热门文章 / TRENDING</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {topArticles.map(article => (
              <ArticleCard key={`featured-${article.id}`} article={article} featured />
            ))}
          </div>
        </section>
      )}

      {/* Main Content */}
      <section>
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="text-2xl font-display font-bold text-text-main">
            发现探索 / EXPLORE
          </h2>
        </div>
        
        <TagFilter />

        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center glass-panel rounded-2xl">
            <p className="text-text-muted font-mono">
              &gt; No articles found matching your criteria.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
