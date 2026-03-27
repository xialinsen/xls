import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useBlogStore } from '../store/useBlogStore';
import { ArticleCard } from '../components/ArticleCard';
import { Tag } from '../components/Tag';

export const Home: React.FC = () => {
  const { articles, searchQuery, selectedTag, setSelectedTag } = useBlogStore();

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    articles.forEach(article => article.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag ? article.tags.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [articles, searchQuery, selectedTag]);

  const topLikedArticle = useMemo(() => {
    if (articles.length === 0) return null;
    return [...articles].sort((a, b) => b.likes - a.likes)[0];
  }, [articles]);

  const listArticles = useMemo(() => {
    if (!topLikedArticle) return filteredArticles;
    // If not searching or filtering, exclude the top liked from the main list to avoid duplication
    if (!searchQuery && !selectedTag) {
      return filteredArticles.filter(a => a.id !== topLikedArticle.id);
    }
    return filteredArticles;
  }, [filteredArticles, topLikedArticle, searchQuery, selectedTag]);

  return (
    <div className="max-w-6xl mx-auto px-6 pb-12">
      <header className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-glow tracking-wider uppercase">
          SYSTEM_LOG <span className="text-secondary text-glow-secondary">v2.0</span>
        </h1>
        <p className="text-gray-400 font-mono max-w-2xl">
          &gt; INITIALIZING DATA STREAM... <br />
          &gt; DECODING CYBERSPACE SIGNALS... <br />
          &gt; WELCOME TO THE NEON GRID.
        </p>
      </header>

      {/* Tags Filter */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-px bg-muted flex-grow"></div>
          <span className="text-xs font-mono text-primary uppercase tracking-widest px-4 border border-primary/30 rounded-full py-1 bg-primary/5">
            FILTER_BY_TAG
          </span>
          <div className="h-px bg-muted flex-grow"></div>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <Tag 
            name="ALL" 
            active={selectedTag === null} 
            onClick={() => setSelectedTag(null)} 
          />
          {allTags.map(tag => (
            <Tag 
              key={tag} 
              name={tag} 
              active={selectedTag === tag} 
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)} 
            />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Featured Article - Only show when no search/filter is active */}
        {!searchQuery && !selectedTag && topLikedArticle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2"
          >
            <ArticleCard article={topLikedArticle} featured />
          </motion.div>
        )}

        {/* Article List */}
        {listArticles.length > 0 ? (
          listArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ArticleCard article={article} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center glass-panel rounded-lg border-dashed">
            <p className="text-gray-500 font-mono text-lg">
              &gt; ERR 404: NO_DATA_FOUND <br />
              &gt; TRY_DIFFERENT_PARAMETERS
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
