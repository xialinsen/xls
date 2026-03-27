import React from 'react';
import { motion } from 'framer-motion';
import { ArticleCard } from '../components/ArticleCard';
import { TagFilter } from '../components/TagFilter';
import { useBlogStore } from '../store/useBlogStore';
import { Terminal } from 'lucide-react';

export const Home: React.FC = () => {
  const { getFilteredArticles, getTopArticle, searchQuery, selectedTag } = useBlogStore();
  
  const filteredArticles = getFilteredArticles();
  const topArticle = getTopArticle();
  
  // 只有在没有搜索和标签过滤时，才将 topArticle 从列表中排除，避免重复展示
  const displayArticles = (searchQuery || selectedTag) 
    ? filteredArticles 
    : filteredArticles.filter(a => a.id !== topArticle?.id);

  return (
    <div className="container mx-auto py-8">
      <header className="mb-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 mb-4"
        >
          <Terminal className="w-8 h-8 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
            SYSTEM.<span className="neon-text">INITIALIZE</span>
          </h1>
        </motion.div>
        <p className="text-text-muted text-lg max-w-2xl font-mono">
          &gt; ACCESSING MAINFRAME DATABANKS... SUCCESS.<br/>
          &gt; RETRIEVING LATEST LOGS...
        </p>
      </header>

      <TagFilter />

      {/* 如果没有搜索条件且没有选择标签，展示置顶文章 */}
      {!searchQuery && !selectedTag && topArticle && (
        <div className="mb-12">
          <ArticleCard article={topArticle} isTop={true} />
        </div>
      )}

      {displayArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 text-center">
          <Terminal className="w-12 h-12 text-text-muted mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-mono text-text-muted">NO_DATA_FOUND</h3>
          <p className="text-text-muted mt-2">Try adjusting your search parameters.</p>
        </div>
      )}
    </div>
  );
};
